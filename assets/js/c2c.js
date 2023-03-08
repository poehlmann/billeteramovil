'use strict';

/*
   Click to Call Widget for SDK 1.13.0

   Added:
     optional test call quality score (SBC or browser) and connection speed information.
     optional URL arguments - call, delay, dtmf.
     audio or video call (according "type" variable in config.js)
   
   Can be used only in HTTPS server (or in secure environement from local file)
   
   Igor Kolosov AudioCodes Ltd 2020

 */
const c2c_userAgent = 'AudioCodes Click-to-Call';
const c2c_sbcDisconnectCounterMax = 5;
const c2c_sbcDisconnectDelay = 60;   // After call termination keep SBC connection the time interval (seconds)
let c2c_phone = new AudioCodesUA(); // phone API
let c2c_audioPlayer = new AudioPlayer();
let c2c_activeCall = null; // not null, if exists active call
let c2c_restoreCall = null;
let c2c_sbcDisconnectCounter = 0;
let c2c_sbcDisconnectTimer = null;
let c2c_messageId = 0;
let c2c_streamDest = null;      // Audio player stream destination (to play recorded sound during test call)
let c2c_usedTurnServer = false; // If TURN server set in configuration ?
let c2c_isRegularCall = true;   // Regular or test call ?
let c2c_isWsConnected = false;  // Is websocket connected to SBC ? 
let c2c_isStartCall = false;    // start call after SBC connection.
let c2c_dtmfSequence = null;    // send DTMF sequence after connection.
let c2c_dtmfDelay = 2000;       // delay (milliseconds) before DTMF sending.
let c2c_callButtonHandler = function () {};
let c2c_testButtonHandler = function () {};


// Start click to call c2c_phone.
async function c2c_init() {
    c2c_phone.setAcLogger(c2c_ac_log);
    c2c_phone.setJsSipLogger(c2c_js_log);
    c2c_ac_log('------ Date: %s -------', new Date().toDateString());
    c2c_ac_log('Browser: ' + c2c_phone.getBrowserName() + ' Internal name: ' + c2c_phone.getBrowser());
    c2c_ac_log('SIP: %s', JsSIP.C.USER_AGENT);
    c2c_ac_log('AudioCodes API: %s', c2c_phone.version());

    c2c_phone.setUserAgent(c2c_userAgent + ' ' + c2c_phone.version());

    // Optional url parameters: user to call or DTMF sequence
    let call = c2c_getStrUrlParameter('call');
    if (call) {
        c2c_config.call = c2c_stringDropCharacters(call, ' -');
    }
    let dtmf = c2c_getStrUrlParameter('dtmf');
    if (dtmf) {
        c2c_dtmfSequence = c2c_stringDropCharacters(dtmf, ' -');
    }
    c2c_dtmfDelay = c2c_getIntUrlParameter('delay', c2c_dtmfDelay);
    if (call || dtmf) {
        c2c_ac_log(`URL parameters: call=${call} dtmf=${dtmf} delay=${c2c_dtmfDelay}`
            + `\nAfter filtering: call=${c2c_config.call}  dtmf=${c2c_dtmfSequence}`);
    }

    // In iMAC and iOS Safari getStats() missed "remote-inbound-rtp".
    let browser = c2c_phone.getBrowser();
    let isSafari = browser === 'safari' || browser === 'ios_safari';
    //if (c2c_config.testCallEnabled && !c2c_config.testCallSBCScore && isSafari) {
    //    c2c_ac_log('Disable test call for iMac/iOS Safari browser, because getStats() implementation missed remote-inbound-rtp report');
    //    c2c_config.testCallEnabled = false;
    //}

    // Set buttons handlers
    document.getElementById('c2c_call_btn').onclick = async function () {
        try {
            c2c_ac_log('phone>> call button onclick event');
            await c2c_enableSound()
            c2c_callButtonHandler();
        } catch (e) {
            c2c_ac_log('call_btn handler exception', e);
        }
    }

    // Check WebRTC support    
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        c2c_info('No WebRTC');
        c2c_guiState_WidgetDisabled('WebRTC API is not supported in this browser !');
        return;
    }

    // Check supported browsers.
    // We can check that used known browser or try use all.
    /*
    let browser = c2c_phone.getBrowser();
    if (browser !== 'chrome' && browser !== 'firefox' && browser !== 'safari' && browser !== 'ios_safari') {
        c2c_info('Unsupported browser');
        c2c_guiState_WidgetDisabled(bd.browser + ' is not supported. Please use Chrome, Firefox or Safari');
        return;
    }
    */

    if (location.protocol !== 'https:' && location.protocol !== 'file:') {
        c2c_ac_log('Warning: for the URL used "' + location.protocol + '" protocol');
    }

    // simple symmetric letter substitution cipher
    const rot13 = s => s.replace(/[a-z]/gi, c => String.fromCharCode(c.charCodeAt() + 13 - 26 * /[n-z]/i.test(c)));

    // Check if used TURN
    for (let server of c2c_serverConfig.iceServers) {
        if (typeof server === 'string')
            continue;
        let url = Array.isArray(server.urls) ? server.urls[0] : server.urls;
        if (url.startsWith('turn:')) {
            c2c_usedTurnServer = true;
            // It's better than set username and credential in config.js, but still unsecure.
            // Please replace user name and credential to yours TURN server settings.
            // Think about better TURN server authorization: e.g.configure TURN security rule that one connection leg must be used SBC IP, and other any IP.
            if (server.username === undefined) { // Don't override value if already set in config.js
                server.username = 'some-username';
            }
            if (server.credential === undefined) {  // Don't override value if already set in config.js
                server.credential = rot13('nhgu-gbxra'); // rot13 of 'nhgu-gbxra' returns 'auth-token'
            }
        }
    }

    // Prepare restore call data c2c_restoreCall
    let data = localStorage.getItem('c2c_restoreCall');
    if (data !== null) {
        localStorage.removeItem('c2c_restoreCall');

        c2c_restoreCall = JSON.parse(data);
        let delay = Math.ceil(Math.abs(c2c_restoreCall.time - new Date().getTime()) / 1000);
        if (delay > c2c_config.c2c_restoreCallMaxDelay) {
            c2c_ac_log('No restore call, delay is too long (' + delay + ' seconds)');
            c2c_restoreCall = null;
        }
    }

    // Gui initialization
    window.addEventListener('beforeunload', c2c_onBeforeUnload);
    
    c2c_guiState_Ready();

    // Prepare audio player
    c2c_audioPlayer.init(c2c_ac_log);

    // Download sounds if need.
    if (c2c_soundConfig.downloadSounds) {
        await c2c_audioPlayer.downloadSounds('../sounds/', c2c_soundConfig.downloadSounds)
    }

    // Generate tones.
    await c2c_audioPlayer.generateTonesSuite(c2c_soundConfig.generateTones);

    c2c_ac_log('audioPlayer: sounds are ready:', c2c_audioPlayer.sounds);
    

    if (c2c_restoreCall === null) {
        /* Try start test call automatically */
        let callAutoStart = !!c2c_config.callAutoStart ? c2c_config.callAutoStart.toLowerCase() : 'no';
        if ((callAutoStart === 'yes force') || (callAutoStart === 'yes' && !c2c_audioPlayer.isDisabled())) {
            if (c2c_audioPlayer.isDisabled()) {
                c2c_ac_log('Start call automatically. Warning: audio player is disabled. So you cannot hear beeps!');
            } else {
                c2c_ac_log('Start call automatically');
            }
            c2c_call(true);
        }
    }

    // Restore call after page reload
    if (c2c_restoreCall !== null) {
        c2c_ac_log('Trying to restore call', c2c_restoreCall);
        c2c_call(true);
    }
}

// Get URL parameters
function c2c_getStrUrlParameter(name, defValue = null) {
    let s = window.location.search.split('&' + name + '=')[1];
    if (!s) s = window.location.search.split('?' + name + '=')[1];
    return s !== undefined ? decodeURIComponent(s.split('&')[0]) : defValue;
}

function c2c_getIntUrlParameter(name, defValue = null) {
    let s = window.location.search.split('&' + name + '=')[1];
    if (!s) s = window.location.search.split('?' + name + '=')[1];
    return s !== undefined ? parseInt(decodeURIComponent(s.split('&')[0])) : defValue;
}

// Filter for URL parameters values (e.g. to remove '-' characters)
function c2c_stringDropCharacters(text, removeChars) {
    let result = '';
    for (let c of text) {
        if (!removeChars.includes(c))
            result += c;
    }
    return result;
}

function c2c_delay(ms) { return new Promise((r) => { setTimeout(() => r(), ms); }); }

function c2c_timestamp() {
    let date = new Date();
    let h = date.getHours();
    let m = date.getMinutes();
    let s = date.getSeconds();
    let ms = date.getMilliseconds();
    return ((h < 10) ? '0' + h : h) + ':' + ((m < 10) ? '0' + m : m) + ':' + ((s < 10) ? '0' + s : s) + '.' + ('00' + ms).slice(-3) + ' ';
}

function c2c_ac_log() {
    let args = [].slice.call(arguments);
    console.log.apply(console, [c2c_timestamp() + ' c2c: %c' + args[0]].concat(['color: BlueViolet;'], args.slice(1)));
}

function c2c_js_log() {
    let args = [].slice.call(arguments);
    console.log.apply(console, [c2c_timestamp() + ' jssip: ' + args[0]].concat(args.slice(1)));
}

// Search server address in array of addresses
function c2c_searchServerAddress(addresses, searchAddress) {
    searchAddress = searchAddress.toLowerCase();
    for (let ix = 0; ix < addresses.length; ix++) {
        let data = addresses[ix]; // can be address or [address, priority]
        let address = data instanceof Array ? data[0] : data;
        if (address.toLowerCase() === searchAddress)
            return ix;
    }
    return -1;
}

// Connect to SBC server, don't send REGISTER
function c2c_initStack(account) {
    // restore previosly connected SBC after page reloading.
    if (c2c_restoreCall !== null) {
        let ix = c2c_searchServerAddress(c2c_serverConfig.addresses, c2c_restoreCall.address);
        if (ix !== -1) {
            c2c_ac_log('Page reloading, raise priority of previously connected server: "' + c2c_restoreCall.address + '"');
            c2c_serverConfig.addresses[ix] = [c2c_restoreCall.address, 1000];
        } else {
            c2c_ac_log('Cannot find previously connected server: ' + c2c_restoreCall.address + ' in configuration');
        }
    }
    c2c_phone.setServerConfig(c2c_serverConfig.addresses, c2c_serverConfig.domain, c2c_serverConfig.iceServers);
    c2c_phone.setAccount(account.user, account.displayName, account.password);
    c2c_phone.setWebSocketKeepAlive(c2c_config.keepAlivePing, c2c_config.keepAlivePong, c2c_config.keepAliveStats, c2c_config.keepAliveDist);

    // Set c2c_phone API listeners
    c2c_phone.setListeners({
        loginStateChanged: function (isLogin, cause) {
            switch (cause) {
                case 'connected':
                    c2c_ac_log('phone>>> loginStateChanged: connected');
                    c2c_isWsConnected = true;
                    if (c2c_activeCall !== null) {
                        c2c_ac_log('phone: active call exists (SBC might have switched over to secondary)');
                        break;
                    }
                    if (c2c_restoreCall !== null) {
                        c2c_ac_log('send INVITE with Replaces to restore call');
                        c2c_makeCall(c2c_restoreCall.callTo,
                            c2c_restoreCall.video === 'sendrecv' || c2c_restoreCall.video === 'sendonly' ? c2c_phone.VIDEO : c2c_phone.AUDIO
                            , ['Replaces: ' + c2c_restoreCall.replaces]);
                    } else if (c2c_isStartCall) {
                        c2c_startCall();
                    }
                    break;

                case 'disconnected':
                    c2c_ac_log('phone>>> loginStateChanged: disconnected');
                    c2c_isWsConnected = false;
                    if (c2c_phone.isInitialized()) {
                        if (c2c_sbcDisconnectCounter++ >= c2c_sbcDisconnectCounterMax && c2c_activeCall === null) {
                            c2c_ac_log('phone: too many disconnections.');
                            c2c_info('La conexi�n fall�', true);
                            c2c_phone.deinit();
                        }
                    }
                    break;

                case 'login failed':
                    c2c_ac_log('phone>>> loginStateChanged: login failed');
                    break;

                case 'login':
                    c2c_ac_log('phone>>> loginStateChanged: login');
                    break;

                case 'logout':
                    c2c_ac_log('phone>>> loginStateChanged: logout');
                    break;
            }
        },

        outgoingCallProgress: function (call, response) {
            c2c_ac_log('phone>>> outgoing call progress');
            if (c2c_isRegularCall) {
                c2c_guiState_HangupButton();
                c2c_info('Llamando', true);
                c2c_audioPlayer.play(c2c_soundConfig.play.outgoingCallProgress);
            }
        },

        callTerminated: function (call, message, cause, redirectTo) {
            c2c_ac_log('phone>>> call terminated callback, cause=%o', cause);
            c2c_activeCall = null;
            if (cause === 'Redirected') {
                c2c_ac_log('Redirect call to %s', redirectTo);
                c2c_makeCall(redirectTo, c2c_config.type === 'video' ? c2c_phone.VIDEO : c2c_phone.AUDIO);
                return;
            }

            c2c_audioPlayer.stop();
            if (c2c_isRegularCall) {
                let terminatedInfo = cause;  // '<span style="font-weight:bold">' + c2c_config.call + '</span> ' + cause;
                c2c_info(terminatedInfo, true);
                if (call.isOutgoing() && !call.wasAccepted()) {
                    // Busy tone.
                    c2c_audioPlayer.play(c2c_soundConfig.play.busy);
                } else {
                    // Disconnect tone.
                    c2c_audioPlayer.play(c2c_soundConfig.play.disconnect);
                }

                c2c_guiState_StopCalling();
                c2c_guiState_Ready();
                c2c_guiState_WidgetInCall(false);
            } else {
                if (!call.wasAccepted()) { // sent or received SIP 2xx response
                    c2c_ac_log('Warning: Test call is failed !');
                    c2c_info('La l�nea de prueba fall�');
                } else if (c2c_config.testCallSBCScore) {
                    // Get BYE X-VoiceQuality header.
                    try {
                        if (!message)
                            throw 'No BYE message';
                        if (!message.hasHeader('X-VoiceQuality'))
                            throw 'BYE message does not contain header: "X-VoiceQuality"';
                        let voiceQuality = message.getHeader('X-VoiceQuality');

                        let vq = voiceQuality.trim().split(' ');
                        if (vq.length !== 2)
                            throw 'X-VoiceQuality should contain 2 tokens.';
                        let mosScore = parseFloat(vq[0]);
                        let mosColor = vq[1].trim().toLowerCase();
                        let mosText = c2c_config.testCallQualityText[mosColor];
                        c2c_ac_log(`X-VoiceQuality header: score="${mosScore}", color="${mosColor}", text="${mosText}"`);

                        let qualityElt = document.getElementById('c2c_quality_span');
                        qualityElt.innerHTML = '&nbsp;Quality test: <span style="color:' +
                            mosColor + ';font-weight:bold">' +
                            mosText + '</span>';
                        c2c_info('Test passed', true);
                    } catch (e) {
                        c2c_ac_log('Warning: cannot take SBC voice quality information', e)
                        c2c_info('Test failed', true);
                    }
                }
            }
            document.getElementById('c2c_call_btn').disabled = false;

            if (c2c_sbcDisconnectDelay === 0) {
                c2c_phone.deinit();
            } else {
                c2c_sbcDisconnectTimer = setTimeout(() => {
                    c2c_ac_log('The time interval between the end of the call and SBC disconnection is over');
                    c2c_phone.deinit();
                }, c2c_sbcDisconnectDelay * 1000);
            }
            // Hide black rectangle after video call
            c2c_setRemoteVideoVisibility(false);
            c2c_restoreCall = null;
        },

        callConfirmed: async function (call, message, cause) {
            c2c_ac_log('phone>>> callConfirmed');
            c2c_audioPlayer.stop();

            // Display or hide remote video element
            c2c_setRemoteVideoVisibility(c2c_activeCall.hasReceiveVideo());

            if (c2c_isRegularCall) {
                c2c_guiState_StopCalling();
                c2c_guiState_HangupButton();
                c2c_guiState_WidgetInCall(true);
                c2c_info('En caso de no escuchar la llamada, validar todos los ajustes de volumen en su dispositivo.', true);
                
                if (c2c_restoreCall !== null && c2c_restoreCall.hold.includes('remote')) {
                    c2c_ac_log('Restore remote hold');
                    c2c_info('Espera');
                    c2c_activeCall.setRemoteHoldState();
                }

                if (c2c_dtmfSequence !== null && c2c_restoreCall === null) {
                    if (c2c_dtmfDelay > 0) {
                        c2c_ac_log(`Wait ${c2c_dtmfDelay}ms before DTMF sending...`);
                        await c2c_delay(c2c_dtmfDelay);
                    }
                    
                    //c2c_phone.setDtmfOptions(true, 250, 250);
                    c2c_ac_log(`Send DTMF sequence: ${c2c_dtmfSequence}`);
                    for (let key of c2c_dtmfSequence) {
                        c2c_activeCall.sendDTMF(key);
                    }
                }
            } else {
                await c2c_voiceQualityTesting();
            }
        },

        callShowStreams: function (call, localStream, remoteStream) {
            c2c_ac_log('phone>>> callShowStreams');
            c2c_audioPlayer.stop();
            let remoteVideo = document.getElementById('c2c_remote_video');
            remoteVideo.srcObject = remoteStream;
            remoteVideo.volume = c2c_isRegularCall ? 1.0 : c2c_config.testCallVolume;
        },

        incomingCall: function (call, invite) {
            c2c_ac_log('phone>>> incomingCall');
            call.reject();
        },

        callHoldStateChanged: function (call, isHold, isRemote) {
            c2c_ac_log('phone>>> callHoldStateChanged');
            if (call.isRemoteHold()) {
                c2c_info('Espera');
            } else {
                c2c_info('Reanudar', true);
            }
        },

        callIncomingReinvite: function (call, start, request) {
            if (start)
                return;
            // Display or hide remote video element
            c2c_setRemoteVideoVisibility(call.hasReceiveVideo());
        },

        incomingNotify: function (call, eventName, from, contentType, body, request) {
            c2c_ac_log(`phone>>> incoming NOTIFY "${eventName}"`, call, from, contentType, body);
            /*
            if (call !== null)
                return false; // skip in of dialog NOTIFY.
            if (eventName !== 'call_quality')
                return false; // skip unsupported events
            */
            return true;
        }
    });

    c2c_sbcDisconnectCounter = 0;

    // Other side cannot switch audio call to video (for audio call)
    c2c_phone.setEnableAddVideo(c2c_config.type === 'video');

    c2c_phone.setModes(c2c_config.modes);
    c2c_phone.init(false);
}

// Prepare restore call after page reload.
function c2c_onBeforeUnload() {
    c2c_ac_log('phone>>> beforeunload event');
    if (c2c_phone === null || !c2c_phone.isInitialized())
        return;
    if (c2c_activeCall !== null && c2c_isRegularCall) {
        if (c2c_activeCall.isEstablished()) {
            let data = {
                callTo: c2c_activeCall.data['_user'],
                video: c2c_activeCall.getVideoState(), // sendrecv, sendonly, recvonly, inactive
                replaces: c2c_activeCall.getReplacesHeader(),
                time: new Date().getTime(),
                hold: `${c2c_activeCall.isLocalHold() ? 'local' : ''}${c2c_activeCall.isRemoteHold() ? 'remote' : ''}`,
                address: c2c_phone.getServerAddress()
            }
            localStorage.setItem('c2c_restoreCall', JSON.stringify(data));
        } else {
            c2c_activeCall.terminate(); // send BYE or CANCEL
        }
    }
}

// Set button look for call
function c2c_guiState_Ready() {
    let button = document.getElementById('c2c_call_btn');
    c2c_callButtonHandler = function () { c2c_call(true); }
    button.className = 'c2c_call_btn_ready';
    //button.querySelector('span').innerText = 'Call';
    button.querySelector('svg').setAttribute('class', 'c2c_call_svg_ready');
}

// Set button look for hangup
function c2c_guiState_HangupButton() {
    let button = document.getElementById('c2c_call_btn');
    c2c_callButtonHandler = c2c_hangupCall;
    button.className = 'c2c_call_btn_hangup';
    //button.querySelector('span').innerText = 'Hangup';
}

// Call is in progress. Ignore button click
function c2c_guiState_Calling() {
    let button = document.getElementById('c2c_call_btn');
    c2c_callButtonHandler = () => {
        c2c_ac_log('ignored [call already pressed]');
    };
    button.querySelector('svg').setAttribute('class', 'c2c_call_svg_calling');
}

function c2c_guiState_StopCalling() {
    document.querySelector('#c2c_call_btn svg').setAttribute('class', 'c2c_call_svg_hangup');
}

function c2c_guiState_WidgetInCall(isOpen) {
    document.getElementById('c2c_widget').className = isOpen ? 'c2c_widget_incall' : '';
}

function c2c_guiState_WidgetDisabled(logMsg) {
    c2c_ac_log(logMsg);
    document.getElementById('c2c_call_btn').disabled = true;
    document.getElementById('c2c_widget').className = 'c2c_widget_disabled';
    document.querySelector('#c2c_call_btn svg').setAttribute('class', 'c2c_call_svg_disabled')
}

// Display message, and optionally clean it after delay.
function c2c_info(text, clear = false) {
    let span = document.getElementById('c2c_message');
    span.innerHTML = text;
    span.dataset.id = ++c2c_messageId;
    if (clear) {
        (function (id) {
            setTimeout(() => {
                if (span.dataset.id === id) {
                    span.innerHTML = '';
                }
            }, c2c_config.messageDisplayTime * 1000);
        })(span.dataset.id);
    }
}

async function c2c_call(isRegular) {
    if (c2c_sbcDisconnectTimer !== null) {
        clearTimeout(c2c_sbcDisconnectTimer);
        c2c_sbcDisconnectTimer = null;
    }
    if (isRegular) {
        c2c_guiState_Calling();
    } else {
        document.getElementById('c2c_quality_span').innerHTML = '';
        document.getElementById('c2c_call_btn').disabled = true;
    }
    c2c_isRegularCall = isRegular;
    c2c_isStartCall = true;
    c2c_audioPlayer.stop();

    if (!c2c_phone.isInitialized()) {
        try {
            // the call will start when the sbc is connected
            await c2c_sbc_connect_sequence();
        } catch (e) {
            c2c_ac_log('Check available devices error:', e);
            c2c_info(e);
            if (isRegular) {
                c2c_guiState_Ready();
            }
            document.getElementById('c2c_call_btn').disabled = false;
        }
    } else if (c2c_isWsConnected) {
        c2c_startCall();
    } else {
        c2c_ac_log('SIP is already initialized. websocket is disconnected. Wait connection...');
    }
}

async function c2c_sbc_connect_sequence() {
    c2c_info('Conectando', true);
    await c2c_phone.checkAvailableDevices();
    c2c_initStack({ user: c2c_config.caller, displayName: c2c_config.callerDN, password: '' });
}

function c2c_startCall() {
    c2c_isStartCall = false;
    if (c2c_isRegularCall) {
        c2c_makeCall(c2c_config.call, c2c_config.type === 'video' ? c2c_phone.VIDEO : c2c_phone.AUDIO);
    } else {
        c2c_makeCall(c2c_config.testCallUser, c2c_phone.AUDIO);
    }
}

function c2c_makeCall(callTo, videoMode, extraHeaders = null) {
    if (c2c_activeCall !== null)
        throw 'Ya existe una llamada activa';
    c2c_info('Llamando', true);
    let extraOptions = null;
    if (c2c_serverConfig.iceTransportPolicyRelay && c2c_usedTurnServer) {
        c2c_ac_log("Used TURN debugging iceTransportPolicy: 'relay'");
        extraOptions = { pcConfig: { iceTransportPolicy: 'relay' } };
    }
    if (!c2c_isRegularCall && !c2c_config.testCallUseMicrophone) {
        // prepare media stream to play recorded sound.
        if (!extraOptions)
            extraOptions = {};
        c2c_streamDest = c2c_audioPlayer.audioCtx.createMediaStreamDestination();
        extraOptions.mediaStream = c2c_streamDest.stream;
    }
    if (!c2c_isRegularCall && c2c_config.testCallSBCScore) {
        if (extraHeaders === null) {
            extraHeaders = [];
        }
        extraHeaders.push('X-AC-Action: test-voice-quality');
        callTo = `${callTo}@${c2c_serverConfig.domain};duration=${c2c_config.testCallMinDuration * 1000}`;
    }
    c2c_activeCall = c2c_phone.call(videoMode, callTo, extraHeaders, extraOptions);
}

function c2c_hangupCall() {
    if (c2c_activeCall !== null) {
        c2c_activeCall.terminate();
        c2c_activeCall = null;
    }
}

function c2c_enableSound() {
    if (!c2c_audioPlayer.isDisabled())
        return Promise.resolve();
    c2c_ac_log('Let enable sound...');
    return c2c_audioPlayer.enable()
        .then(() => {
            c2c_ac_log('Sound is enabled')
        })
        .catch((e) => {
            c2c_ac_log('Cannot enable sound', e);
        });
}

// In most of browsers enough to set style.display='block' or 'none'
// In iMac Safari if set 'none' HTMLVideoElement stop playing audio.
// To bypass the issue we have instead change video element sizes (zero or not zero)
function c2c_setRemoteVideoVisibility(isVisible) {
    let video = document.getElementById('c2c_remote_video');
    let vs = video.style;
    vs.display = 'block';
    if(isVisible) {
        vs.width = c2c_config.videoSize.width;
        vs.height = c2c_config.videoSize.height;
    } else {
        vs.width = vs.height = 0;
    }
}

//---------------------------------------------------------------
//-------------- Test call. Voice quality testing ---------------
//---------------------------------------------------------------
async function c2c_voiceQualityTesting() {
    c2c_ac_log('Test call is established');
    if (c2c_config.testCallUseMicrophone) {
        c2c_ac_log('Test call plays microphone sound');
    } else {
        c2c_ac_log('Test call plays recorded sound');
        c2c_audioPlayer.play({
            name: 'test_call_sound',
            streamDestination: c2c_streamDest,
            volume: 1.0,
            loop: true
        });
    }

    c2c_info('Comprobaci�n de la calidad de la l�nea...');
    if (c2c_config.testCallSBCScore) {
        await c2c_sbcVoiceQualityTesting();
    } else {
        await c2c_browserVoiceQualityTesting();
    }
}

//--------------- Voice quality SBC test ----------------------
// SBC works with RTP/RTCP statistics and send report as special BYE header
async function c2c_sbcVoiceQualityTesting() {
    c2c_ac_log('Checking line quality (SBC test)...');
}

//--------------- Voice quality browser test ------------------
// RTP/RTCP statistics checked by browser getStats() method.
// Works in Chrome and Firefox. Don't work in Safari.
async function c2c_browserVoiceQualityTesting() {
    c2c_ac_log('Checking line quality (browser test)...');
    // Testing call quality.
    let qualityScore = undefined;
    try {
        qualityScore = await c2c_get_browser_voice_quality_score();
    } catch (e) {
        c2c_ac_log('call quality testing exception', e);
    }

    let qualityElt = document.getElementById('c2c_quality_span');

    if (qualityScore === undefined) {
        qualityElt.innerHTML = '&nbsp;Quality test:<span style="color: red;font-weight:bold">Failed</span>'
        c2c_info('Test failed');
    } else {
        c2c_info('Test passed', true);
        let scoreInterval = c2c_get_browser_score_interval(qualityScore);
        if (scoreInterval) {
            qualityElt.innerHTML = '&nbsp;Quality test: <span style="color:' +
                scoreInterval.color + ';font-weight:bold">' +
                scoreInterval.text + '</span>';
        } else {
            qualityElt.innerHTML = '&nbsp;Quality test:<span style="color: red;font-weight:bold">Cannot calculate interval</span>'
        }
    }
    // Hangup test call.
    c2c_ac_log('Testing RTP quality is finished');
    c2c_activeCall.terminate();
}

/* 
   Get getStats() reports every second.
   Stop after testCallMinDuration seconds if obtained score data.
   Stop after testCallMaxDuration seconds in any case. 
*/
async function c2c_get_browser_voice_quality_score() {
    let lastScore = undefined;
    let conn = c2c_activeCall.getRTCPeerConnection();
    let startTimeMs = Date.now();
    for (let i = 0; i < c2c_config.testCallMaxDuration; i++) {
        await c2c_delay(1000);
        let stats = await conn.getStats(null);
        let elapsedTime = (Date.now() - startTimeMs) / 1000;
        let reports = c2c_createReports(stats, ['inbound-rtp', 'remote-inbound-rtp', 'outbound-rtp', 'track', 'codec']);
        try {
            lastScore = c2c_calculateG711QualityScore(reports, elapsedTime);
        } catch (e) {
            c2c_ac_log(`time: ${Math.floor(elapsedTime)}s cannot calculate score: ` + e);
        }
        if (elapsedTime >= c2c_config.testCallMinDuration && lastScore !== undefined)
            break;
    }
    // Debugging. Print complete stats provided by the browser.
    let stats = await conn.getStats(null);
    let reports = c2c_createReports(stats);
    c2c_ac_log('Reports', reports);

    // Debugging. Print used audio codec if can be detected by stats.
    let audioCodecs = c2c_getAudioCodecString(reports);
    if (audioCodecs) {
        c2c_ac_log('Tested audio codecs=' + audioCodecs);
    }
    return lastScore;
}

// Working with RTCPeerConnection.getStats object.
function c2c_createReports(stats, typesList = undefined) {
    let reports = {};
    stats.forEach(entry => {
        let type = entry.type;
        if (typesList !== undefined && !typesList.includes(type))
            return;
        if (!reports[type])
            reports[type] = [];
        reports[type].push(Object.assign({}, entry));
    });
    return reports;
}

// Get codecs using RTCPeerConnection getStats report.
// Note: don't work in Firefox, because missed "codec" report
function c2c_getCodec(reports, isOut, isAudio) {
    // out or in ?
    let type = isOut ? 'outbound-rtp' : 'inbound-rtp';
    let rtps = reports[type];
    if (!rtps)
        throw `No "${type}" stats`;
    // audio or video ?
    let foundRtp = null;
    let mediaType = isAudio ? 'audio' : 'video';
    for (let rtp of rtps) {
        if (rtp.mediaType === mediaType) {
            foundRtp = rtp;
            break;
        }
    }
    if (!foundRtp) {
        return undefined;
    }
    let codecId = foundRtp.codecId;

    // search codec by codecId
    let codecs = reports['codec'];
    if (!codecs)
        throw 'No "codec" stats';
    for (let codec of codecs) {
        if (codec.id === codecId)
            return codec;
    }
    throw `No "codec" stats with id=="${codecId}"`;
}

// Get audio codec string if possible using getStats() reports.
function c2c_getAudioCodecString(reports) {
    let outAudio, inAudio;
    try {
        let outAudioCodec = c2c_getCodec(reports, true, true)
        let inAudioCodec = c2c_getCodec(reports, false, true);
        if (outAudioCodec === undefined)
            throw 'Stats: no outbound-rtp for audio';
        if (inAudioCodec === undefined)
            throw 'Stats: no inbound-rtp for audio';
        outAudio = outAudioCodec.mimeType.toUpperCase();
        inAudio = inAudioCodec.mimeType.toUpperCase();
        if (outAudio.startsWith('AUDIO/'))
            outAudio = outAudio.substring(6);
        if (inAudio.startsWith('AUDIO/'))
            inAudio = inAudio.substring(6);
    } catch (e) {
        c2c_ac_log('Exception during codecs detection', e);
        return undefined;
    }
    if (outAudio === inAudio)
        return outAudio;
    return 'out=' + outAudio + ' in=' + inAudio;
}

function c2c_getBoundRtp(reports, type, isAudio) {
    let kind = isAudio ? 'audio' : 'video';
    let rtps = reports[type];
    if (!rtps)
        throw `No "${type}" stats`;
    for (let rtp of rtps) {
        if (rtp.kind === kind)
            return rtp;
    }
    throw `No "${type}" with kind==${kind}`;
}

function c2c_getTrack(reports, boundRtp) {
    let id = boundRtp.trackId;
    let tracks = reports['track'];
    if (!tracks)
        throw 'No "track" stats';
    for (let track of tracks)
        if (track.id === id)
            return track;
    throw 'No track with id=' + id
}

function c2c_calculateG711QualityScore(reports, elapsedTime) {
    // get reports if exists (remote-inbound-rtp missed at start)
    let inboundRtp = c2c_getBoundRtp(reports, 'inbound-rtp', true);
    let remoteInboundRtp = c2c_getBoundRtp(reports, 'remote-inbound-rtp', true);

    let irPacketsReceived = inboundRtp.packetsReceived;
    let irPacketsLost = inboundRtp.packetsLost;
    let rirPacketsLost = remoteInboundRtp.packetsLost;
    let rirJitter = remoteInboundRtp.jitter;
    let rirRoundTripTime = remoteInboundRtp.roundTripTime;

    if (irPacketsReceived === undefined) throw 'packetsReceived is undefined';
    if (irPacketsLost === undefined) throw 'packetsLost is undefined';
    if (rirPacketsLost === undefined) throw 'packetsLost is undefined';
    if (rirJitter === undefined) throw 'jitter is undefined';
    if (rirRoundTripTime === undefined) throw 'roundTripTime is undefined';

    let track = undefined;
    let totalSamplesDuration;
    try {
        track = c2c_getTrack(reports, inboundRtp);
        totalSamplesDuration = track.totalSamplesDuration;
    } catch (e) {
        let packetDuration = elapsedTime / (irPacketsReceived + irPacketsLost);
        totalSamplesDuration = packetDuration * irPacketsReceived;
        //c2c_ac_log(`Warning: No "track" stats. Calculated packet duration= + ${packetDuration} totalSamplesDuration=${totalSamplesDuration}`);
    }
    if (totalSamplesDuration === undefined) throw 'totalSamplesDuration is undefined';
    let lossPercent = 100 * irPacketsLost / (irPacketsLost + irPacketsReceived);
    let delayMs = (rirJitter + rirRoundTripTime / 2 + totalSamplesDuration / irPacketsReceived) * 1000;
    let { score, info } = c2c_getG711QualityScore(lossPercent, delayMs);
    c2c_ac_log(`time: ${Math.floor(elapsedTime)}s inbound-rtp: packetsReceived=${irPacketsReceived} packetsLost=${irPacketsLost} remote-inbound-rtp: packetsLost=${rirPacketsLost} jitter=${rirJitter} roundTripTime=${rirRoundTripTime} ${track ? 'track:' : ' calculated:'} totalSamplesDuration=${totalSamplesDuration}\n${info}`);
    return score;
}

function c2c_get_browser_score_interval(score) {
    for (let scoreInterval of c2c_qualityScoreIntervals) {
        if (score < scoreInterval.score) {
            return scoreInterval;
        }
    }
    return undefined;
}

function c2c_getG711QualityScore(loss, delay) {
    let percentIndex = Math.floor(loss / 2)
    if (percentIndex >= c2c_qualityScoreMatrix.length) {
        percentIndex = c2c_qualityScoreMatrix.length - 1; // > 98% used the last line ==98%
    }
    let row = c2c_qualityScoreMatrix[percentIndex];
    let delayIndex = Math.floor(delay / 20);
    if (delayIndex >= row.length) {
        return { score: 0, info: `delay ${delay} is too big (out of matrix range 0..500ms), set score=0` };
    }
    let score = row[delayIndex];
    return { score: score, info: `qualityScore(loss=${loss.toFixed(1)}%, delay=${delay.toFixed(1)}ms) => scoreMatrix[${percentIndex},${delayIndex}] = ${score}` };
}

// Split quality scores to intervals.
const c2c_qualityScoreIntervals = [
    { score: 2.7,  color: 'Red', text: 'Poor' },
    { score: 3.2, color: 'Orange', text: 'Fair'},
    { score: 3.7, color: 'Lightgreen', text: 'Good'},
    { score: 5, color: 'DarkGreen', text: 'Excellent' }
];

// Quality score matrix for G711 codec. Horizontal delay 0, 20, 40... 500 ms  Vertical packet loss percent 0, 2, 4, ...98
// Result is quality score (3=fair, 2=poor, threshold at 2.7)
const c2c_qualityScoreMatrix = [
    [4.2, 4.2, 4.2, 4.2, 4.2, 4.2, 4.1, 4.1, 4.1, 4.1, 4, 3.9, 3.8, 3.7, 3.6, 3.5, 3.4, 3.3, 3.2, 3.2, 3.1, 3, 2.9, 2.8, 2.8, 2.7],
    [4.1, 4.1, 4.1, 4, 4, 4, 4, 4, 3.9, 3.9, 3.8, 3.7, 3.6, 3.5, 3.4, 3.3, 3.2, 3.1, 3, 2.9, 2.8, 2.7, 2.6, 2.6, 2.5, 2.4],
    [3.9, 3.9, 3.9, 3.9, 3.9, 3.9, 3.8, 3.8, 3.8, 3.7, 3.7, 3.5, 3.4, 3.3, 3.2, 3.1, 2.9, 2.8, 2.7, 2.7, 2.6, 2.5, 2.4, 2.3, 2.3, 2.2],
    [3.8, 3.8, 3.8, 3.7, 3.7, 3.7, 3.7, 3.7, 3.6, 3.6, 3.4, 3.3, 3.2, 3.1, 3, 2.8, 2.7, 2.6, 2.5, 2.4, 2.4, 2.3, 2.2, 2.1, 2, 2],
    [3.7, 3.6, 3.6, 3.6, 3.6, 3.6, 3.5, 3.5, 3.4, 3.4, 3.3, 3.2, 3, 2.9, 2.8, 2.6, 2.5, 2.4, 2.3, 2.2, 2.2, 2.1, 2, 1.9, 1.9, 1.8],
    [3.5, 3.5, 3.4, 3.4, 3.4, 3.4, 3.4, 3.3, 3.3, 3.3, 3.1, 3, 2.9, 2.7, 2.6, 2.5, 2.4, 2.3, 2.2, 2.1, 2, 1.9, 1.8, 1.8, 1.7, 1.7],
    [3.3, 3.3, 3.3, 3.3, 3.3, 3.3, 3.3, 3.2, 3.2, 3.1, 3, 2.8, 2.7, 2.6, 2.4, 2.3, 2.2, 2.1, 2, 1.9, 1.8, 1.8, 1.7, 1.6, 1.6, 1.5],
    [3.2, 3.2, 3.2, 3.2, 3.1, 3.1, 3.1, 3.1, 3, 2.9, 2.8, 2.7, 2.6, 2.4, 2.3, 2.2, 2, 2, 1.9, 1.8, 1.7, 1.6, 1.6, 1.5, 1.5, 1.4],
    [3.1, 3.1, 3.1, 3, 3, 3, 3, 3, 2.9, 2.8, 2.7, 2.6, 2.4, 2.3, 2.2, 2, 1.9, 1.8, 1.8, 1.7, 1.6, 1.5, 1.5, 1.4, 1.4, 1.3],
    [3, 2.9, 2.9, 2.9, 2.9, 2.9, 2.8, 2.8, 2.8, 2.7, 2.6, 2.4, 2.3, 2.2, 2, 1.9, 1.8, 1.7, 1.6, 1.6, 1.5, 1.4, 1.4, 1.3, 1.3, 1.2],
    [2.8, 2.8, 2.8, 2.8, 2.8, 2.8, 2.7, 2.7, 2.6, 2.6, 2.4, 2.3, 2.2, 2.1, 1.9, 1.8, 1.7, 1.6, 1.5, 1.5, 1.4, 1.4, 1.3, 1.3, 1.2, 1.2],
    [2.7, 2.7, 2.7, 2.7, 2.7, 2.6, 2.6, 2.6, 2.5, 2.5, 2.3, 2.2, 2.1, 2, 1.8, 1.7, 1.6, 1.5, 1.5, 1.4, 1.3, 1.3, 1.2, 1.2, 1.2, 1.1],
    [2.6, 2.6, 2.6, 2.6, 2.6, 2.5, 2.5, 2.5, 2.4, 2.4, 2.2, 2.1, 2, 1.9, 1.8, 1.6, 1.5, 1.5, 1.4, 1.3, 1.3, 1.2, 1.2, 1.2, 1.1, 1.1],
    [2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.4, 2.4, 2.3, 2.3, 2.1, 2, 1.9, 1.8, 1.7, 1.5, 1.5, 1.4, 1.3, 1.3, 1.2, 1.2, 1.1, 1.1, 1.1, 1.1],
    [2.5, 2.4, 2.4, 2.4, 2.4, 2.4, 2.3, 2.3, 2.3, 2.2, 2.1, 1.9, 1.8, 1.7, 1.6, 1.5, 1.4, 1.3, 1.3, 1.2, 1.2, 1.1, 1.1, 1.1, 1.1, 1],
    [2.4, 2.4, 2.3, 2.3, 2.3, 2.3, 2.3, 2.2, 2.2, 2.1, 2, 1.8, 1.8, 1.6, 1.5, 1.4, 1.4, 1.3, 1.2, 1.2, 1.1, 1.1, 1.1, 1.1, 1, 1],
    [2.3, 2.3, 2.3, 2.2, 2.2, 2.2, 2.2, 2.2, 2.1, 2, 1.9, 1.8, 1.7, 1.6, 1.5, 1.4, 1.3, 1.2, 1.2, 1.1, 1.1, 1.1, 1, 1, 1, 1],
    [2.2, 2.2, 2.2, 2.2, 2.1, 2.1, 2.1, 2.1, 2, 2, 1.8, 1.8, 1.6, 1.5, 1.4, 1.3, 1.3, 1.2, 1.2, 1.1, 1.1, 1, 1, 1, 1, 1],
    [2.2, 2.1, 2.1, 2.1, 2.1, 2.1, 2, 2, 2, 1.9, 1.8, 1.7, 1.6, 1.5, 1.4, 1.3, 1.2, 1.2, 1.1, 1.1, 1.1, 1, 1, 1, 1, 1],
    [2.1, 2.1, 2.1, 2, 2, 2, 2, 2, 1.9, 1.8, 1.8, 1.6, 1.5, 1.4, 1.3, 1.2, 1.2, 1.1, 1.1, 1.1, 1, 1, 1, 1, 1, 1],
    [2, 2, 2, 2, 2, 1.9, 1.9, 1.9, 1.8, 1.8, 1.7, 1.6, 1.5, 1.4, 1.3, 1.2, 1.2, 1.1, 1.1, 1, 1, 1, 1, 1, 1, 1],
    [2, 2, 1.9, 1.9, 1.9, 1.9, 1.9, 1.8, 1.8, 1.8, 1.6, 1.5, 1.4, 1.3, 1.3, 1.2, 1.1, 1.1, 1.1, 1, 1, 1, 1, 1, 1, 1],
    [1.9, 1.9, 1.9, 1.9, 1.8, 1.8, 1.8, 1.8, 1.8, 1.7, 1.6, 1.5, 1.4, 1.3, 1.2, 1.2, 1.1, 1.1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1.9, 1.9, 1.8, 1.8, 1.8, 1.8, 1.8, 1.8, 1.7, 1.7, 1.5, 1.4, 1.4, 1.3, 1.2, 1.1, 1.1, 1.1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1.8, 1.8, 1.8, 1.8, 1.8, 1.8, 1.8, 1.7, 1.7, 1.6, 1.5, 1.4, 1.3, 1.2, 1.2, 1.1, 1.1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1.8, 1.8, 1.8, 1.8, 1.7, 1.7, 1.7, 1.7, 1.6, 1.6, 1.5, 1.4, 1.3, 1.2, 1.2, 1.1, 1.1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1.8, 1.8, 1.7, 1.7, 1.7, 1.7, 1.7, 1.6, 1.6, 1.5, 1.4, 1.4, 1.3, 1.2, 1.1, 1.1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1.7, 1.7, 1.7, 1.7, 1.7, 1.6, 1.6, 1.6, 1.5, 1.5, 1.4, 1.3, 1.2, 1.2, 1.1, 1.1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1.7, 1.7, 1.7, 1.6, 1.6, 1.6, 1.6, 1.6, 1.5, 1.5, 1.4, 1.3, 1.2, 1.2, 1.1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1.7, 1.6, 1.6, 1.6, 1.6, 1.6, 1.5, 1.5, 1.5, 1.4, 1.4, 1.3, 1.2, 1.1, 1.1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1.6, 1.6, 1.6, 1.6, 1.5, 1.5, 1.5, 1.5, 1.5, 1.4, 1.3, 1.2, 1.2, 1.1, 1.1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1.6, 1.6, 1.6, 1.5, 1.5, 1.5, 1.5, 1.5, 1.4, 1.4, 1.3, 1.2, 1.2, 1.1, 1.1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1.6, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.4, 1.4, 1.3, 1.2, 1.1, 1.1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.4, 1.4, 1.3, 1.3, 1.2, 1.1, 1.1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1.5, 1.5, 1.5, 1.5, 1.5, 1.4, 1.4, 1.4, 1.4, 1.3, 1.2, 1.2, 1.1, 1.1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1.5, 1.5, 1.5, 1.4, 1.4, 1.4, 1.4, 1.4, 1.4, 1.3, 1.2, 1.2, 1.1, 1.1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1.5, 1.5, 1.4, 1.4, 1.4, 1.4, 1.4, 1.4, 1.3, 1.3, 1.2, 1.1, 1.1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1.4, 1.4, 1.4, 1.4, 1.4, 1.4, 1.4, 1.4, 1.3, 1.3, 1.2, 1.1, 1.1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1.4, 1.4, 1.4, 1.4, 1.4, 1.4, 1.4, 1.3, 1.3, 1.3, 1.2, 1.1, 1.1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1.4, 1.4, 1.4, 1.4, 1.4, 1.4, 1.3, 1.3, 1.3, 1.2, 1.2, 1.1, 1.1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1.4, 1.4, 1.4, 1.4, 1.3, 1.3, 1.3, 1.3, 1.3, 1.2, 1.2, 1.1, 1.1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1.4, 1.4, 1.4, 1.3, 1.3, 1.3, 1.3, 1.3, 1.2, 1.2, 1.1, 1.1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1.4, 1.4, 1.3, 1.3, 1.3, 1.3, 1.3, 1.3, 1.2, 1.2, 1.1, 1.1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1.3, 1.3, 1.3, 1.3, 1.3, 1.3, 1.3, 1.3, 1.2, 1.2, 1.1, 1.1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1.3, 1.3, 1.3, 1.3, 1.3, 1.3, 1.3, 1.2, 1.2, 1.2, 1.1, 1.1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1.3, 1.3, 1.3, 1.3, 1.3, 1.3, 1.2, 1.2, 1.2, 1.2, 1.1, 1.1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1.3, 1.3, 1.3, 1.3, 1.3, 1.2, 1.2, 1.2, 1.2, 1.2, 1.1, 1.1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1.3, 1.3, 1.3, 1.3, 1.2, 1.2, 1.2, 1.2, 1.2, 1.1, 1.1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1.3, 1.3, 1.3, 1.2, 1.2, 1.2, 1.2, 1.2, 1.2, 1.1, 1.1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1.3, 1.3, 1.2, 1.2, 1.2, 1.2, 1.2, 1.2, 1.2, 1.1, 1.1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];
