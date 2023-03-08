let c2c_serverConfig = {
    domain: 'webrtc.bcp.com.bo',                 // SBC domain name, used to build SIP headers From/To
    addresses: ['wss://webrtc.bcp.com.bo:10081'],  // AudioCodes SBC secure web socket address (can be multiple)
    iceServers: [],                        // Optional STUN or TURN servers. Don't set TURN server password here. It's unsecure !  
    /* TURN server usage example 
       iceServers: [
           { urls: 'turn:ik.l5.ca',
             //username: 'xxx',     Note: username and credential is better set not here but in c2c.js code 
             //credential: 'yyy',
           }
        ],
        iceTransportPolicyRelay: false      // Optional. For TURN server debugging. If true will be used only 'relay' ice candidate
    */
};

let c2c_config = {
    // Call
    call: '5998', // Call to this user name (or phone number).
    caller: '4998', // Caller user name (One word according SIP RFC 3261). 
    callerDN: 'ClienteWEBSOLI', // Caller display name (words sequence).
    type: 'audio',         // 'audio' or 'video'
    videoSize: { width: '480px', height: '360px' }, // video size (for video call) can be used default {width: '', height: ''}
    callAutoStart: 'no',  // Start call automatically after page loading. Values: 'yes' (start if autoplay policy enabled) 'yes force' (start always), 'no' (don't start call automatically)                                      
    messageDisplayTime: 5, // A message will be displayed during this time (seconds).
    restoreCallMaxDelay: 20, // After page reloading, call can be restored within the time interval (seconds).

    // Test call used to check line quality.
    testCallEnabled: false,    // If test call enabled (show test call GUI)
    testCallSBCScore: true,   // Test call voice quality score calculated by SBC API (true) or browser API (false).
    testCallUser: '5995',     // Call to this user for test call (It's special test call user in SBC that auto answer and play sound prompt)
    testCallAutoStart: false,  // Start test call automatically after page loading when auto play policy enable play sound or when for test call used microphone.
    testCallUseMicrophone: false, // Send microphone sound (true) or generated tone/download sound (false).
    testCallVolume: 0.0,     // 1.0 .. 0.0. Hear or not test call audio prompt received from SBC
    testCallMinDuration: 10,  // For browser quality score: remote-inbound-rtp provided only after 5..10 seconds delay (Chrome) or 11..16 seconds (Firefox).
    testCallMaxDuration: 20,  // Call will terminated after testCallMinDuration if received remote-inbound-rtp and always after testCallMaxDuration.
    testCallQualityText: {    // Mapping SBC "color" voice quality score with corresponding text message.
        'green': 'Good', 'yellow': 'Fair', 'red': 'Low', 'gray': 'N/A'
    },

    // Websocket keep alive.
    keepAlivePing: 15,        // To detect websocket disconnection and and keep alive NAT connection, send CRLF ping interval (seconds) 
    keepAlivePong: 15,        // Wait pong response interval (seconds)
    keepAliveStats: 60,       // Each n pongs print to console log min and max pong delay
    keepAliveDist: false,     // Print to console log also pong distribution.

    // SDK modes. 
    modes: {
        ice_timeout_fix: 2000,             // ICE gathering timeout (milliseconds)
        chrome_rtp_timeout_fix: 13,        // Workaround of https://bugs.chromium.org/p/chromium/issues/detail?id=982793
    }
};

let c2c_soundConfig = {
    generateTones: {
        // Phone ringing, busy and other tones vary in different countries.
        // Please see: https://www.itu.int/ITU-T/inr/forms/files/tones-0203.pdf
        ringingTone: [{ f: 400, t: 1.5 }, { t: 3.5 }],
        busyTone: [{ f: 400, t: 0.5 }, { t: 0.5 }],
        disconnectTone: [{ f: 400, t: 0.5 }, { t: 0.5 }],
        // test_call_sound is sending during test call. Specified as tones sequence.
        test_call_sound: [{ f: 400, t: 1.0 }, { f: 300, t: 0.5 }]
    },
    downloadSounds: [
        // test_call_sound Can be specified as mp3 instead of tone sequence.
        // { test_call_sound: 'flowing_stream' }
    ],
    play: {
        outgoingCallProgress: { name: 'ringingTone', loop: true, volume: 0.2 },
        busy: { name: 'busyTone', volume: 0.2, repeat: 4 },
        disconnect: { name: 'disconnectTone', volume: 0.2, repeat: 3 },
    },
};