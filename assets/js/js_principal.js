$(document).ready(function() {
    $('.scroll_top').on('click', function(e){
        e.preventDefault()

        $('html, body').animate({
            scrollTop : $(this.hash).offset().top
        }, 1500);
    });
    var size;
    // Obtenga la URL actual, como: http: // localhost: 8083 / myproj / view / my.jsp
    let curWwwPath=window.document.location.href;
    // Obtenga el directorio después de la dirección de host, como: myproj / view / my.jsp
    let pathName=window.document.location.pathname;
    let pos=curWwwPath.indexOf(pathName);
    let localhostPaht=curWwwPath.substring(0,pos);
    // Obtenga el nombre del proyecto con "/", como: / myproj
    let projectName=pathName.substring(0,pathName.substring(1).indexOf('/')+1);
    // obtuve http: // localhost: 8083 / myproj
    let realPath=localhostPaht+projectName;
    if(realPath+"/" == curWwwPath || realPath+"/index.html" == curWwwPath) {
        Swal.fire({
            width: "70vh",
            html:
                '<div class="row">' +
                    '<div class="col-md-12">' +
                    '<img src="' + realPath + '/assets/img/soli-yape.svg" alt="QR de yape"> ' +
                    '</div>' +
                '</div>',
            showCloseButton: true,
            showConfirmButton: false,
            showCancelButton: false,
            // footer: '<strong class="font-size-14">Disponible en:</strong><img src="' + realPath + '/assets/img/yape_google_play_icon.svg"><img src="' + realPath + '/assets/img/yape_apple_icon.svg"><img src="' + realPath + '/assets/img/yape_huawei_icon.svg">'
        })
    }

    // var client_list = $('.app-active');
    // if(client_list.length){
    //     client_list.owlCarousel({
    //         items: 1,
    //         singleItem: true,
    //         loop: true,
    //         autoplay: true,
    //         dots: false,
    //         nav  : false,
    //         autoPlay: 5000
    //     });
    // }


    // function createLauncherPanel() {
    //     var div = document.createElement("div");
    //     div.setAttribute("class", "launcher-panel");
    //     div.classList.add("hidden");
    //     div.appendChild(createLauncherLink(div));
    //
    //     document.getElementsByTagName("body")[0].appendChild(div);
    //
    //     return div;
    // }
    //
    // function createLauncherLink(container) {
    //     var link = document.createElement("link");
    //
    //     link.setAttribute("rel", "import");
    //     link.setAttribute("href", "path_to_my_launcher_page.html");
    //
    //     link.onload = function () {
    //         container.appendChild(link.import.querySelector('.launcher-main-container'));
    //     };
    //
    //     return link;
    // }
    //
    // createLauncherPanel();

    // module.exports = loginWithChrome
    // !function (e, t) {
    //     if (!e.$Letstalk) {
    //         var n = e.$Letstalk = {};
    //         n.enqueue = function () {
    //             var e = arguments;
    //             return new Promise(function (t, n) {
    //                 u.stack.push({args: e, resolve: t, reject: n}), u.times.push(+new Date)
    //             })
    //         }, n.init = function () {
    //             return n.enqueue("init", arguments)
    //         }, n.on = function () {
    //             return n.enqueue("on", arguments)
    //         }, n.executeAppMethod = function () {
    //             return n.enqueue("executeAppMethod", arguments)
    //         }, n.isAvailable = function () {
    //             return n.enqueue("isAvailable", arguments)
    //         }, n.launch = function () {
    //             return n.enqueue("launch", arguments)
    //         }, n.listApps = function () {
    //             return n.enqueue("listApps", arguments)
    //         }, n.remove = function () {
    //             return n.enqueue("remove", arguments)
    //         };
    //         var u = n._ = {stack: [], times: [+new Date]};
    //         t.body ? r() : e.attachEvent ? e.attachEvent("onload", r) : e.addEventListener("load", r, !1)
    //     }
    //
    //     function r() {
    //         a = !1, s = t.createElement("script"), s.type = "text/javascript", s.src = "https://static.letsta.lk/launcher/launcher.js", s.async = !0, s.defer = !0, k = document.getElementsByTagName("script")[0], k.parentNode.insertBefore(s, k)
    //     }
    // }(window, document);
    // window.LetstalkSettings = {
    //     organization: 'bcp-qa'
    // };
    // window.$Letstalk.on('ready', function () {
    //     window.$Letstalk.launch('chat-pub-yape-qa');
    // })

    // var date = new Date(); // Create Date object for a reference point
    // if(date.getDate() == 25 && date.getMonth() == 11 ) { // Check the time like above
    //     Swal.fire({
    //         html: `<ul class="lightrope">
    //             <li></li>
    //             <li></li>
    //             <li></li>
    //             <li></li>
    //             <li></li>
    //             <li></li>
    //             <li></li>
    //             <li></li>
    //             <li></li>
    //             <li></li>
    //             <li></li>
    //             <li></li>
    //             <li></li>
    //             <li></li>
    //             <li></li>
    //             <li></li>
    //             <li></li>
    //             <li></li>
    //             <li></li>
    //             <li></li>
    //             <li></li>
    //             <li></li>
    //             <li></li>
    //             <li></li>
    //             <li></li>
    //             <li></li>
    //             <li></li>
    //             <li></li>
    //             <li></li>
    //             <li></li>
    //             <li></li>
    //             <li></li>
    //             <li></li>
    //             <li></li>
    //             <li></li>
    //             <li></li>
    //             <li></li>
    //             <li></li>
    //             <li></li>
    //             <li></li>
    //             <li></li>
    //             <li></li>
    //         </ul>
    //                 <img alt="navidad con yape" class="mt-50" src="./assets/img/navidad-y-año-nuevo1.png"> `,
    //         width: 800,
    //         imageWidth: 500,
    //         imageHeight: 400,
    //         heightAuto: true,
    //         showConfirmButton: false,
    //         allowOutsideClick: true,
    //         allowEscapeKey: true,
    //         timer: 8000,
    //         imageUrl: ``,
    //         background: `rgba(255, 255, 255, 0) center no-repeat `,
    //         backdrop: `
    //                     rgb(0 0 0 / 73%)
    //                     url("https://i.gifer.com/2eSd.gif")
    //                     center top
    //                     repeat
    //                   `
    //     })
    // }
    // if(date.getDate() == 1 && date.getMonth() == 0 ) {
    //     Swal.fire({
    //         html: `<img alt="año nuevo con yape" src="./assets/img/navidad-y-año-nuevo2.png"> `,
    //         width: 800,
    //         imageWidth: 500,
    //         imageHeight: 400,
    //         heightAuto: true,
    //         showConfirmButton: false,
    //         allowOutsideClick: true,
    //         allowEscapeKey: true,
    //         timer: 8000,
    //         imageUrl: ``,
    //         background: `rgba(255, 255, 255, 0) center no-repeat `,
    //         backdrop: `
    //         rgb(0 0 0 / 73%)
    //         url("https://i.gifer.com/6ob.gif")
    //         center top
    //         repeat
    //       `
    //     })
    // }

    // $(".fondo-solimegate-solisocios-parte1").click(function() {
    //     window.location = $(this).find("a").attr("href");
    //     return false;
    // });
    //
    // $(".fondo-solimegate-solisocios-parte2").click(function() {
    //     window.location = $(this).find("a").attr("href");
    //     return false;
    // });

    // var force="";
    // if( navigator.userAgent.match(/Android/i)){
    //     force='android';
    // }else if(navigator.userAgent.match(/webOS/i)|| navigator.userAgent.match(/iPhone/i)|| navigator.userAgent.match(/iPad/i)|| navigator.userAgent.match(/iPod/i)){
    //     force='ios';
    // }else{
    //     // force='android';
    //     document.getElementById("wrap").style.setProperty("margin-top", "0px", "important");
    //     document.getElementById('menu-cel').style.setProperty("margin-top", "0px", "important");
    // }
    // var n = document.querySelector('.smartbanner');
    // if (n) {
    //     n.parentNode.removeChild(n);
    // }
    // new SmartBanner({
    //     aysHidden: 0,   // days to hide banner after close button is clicked (defaults to 15)
    //     daysReminder: 0, // days to hide banner after "VIEW" button is clicked (defaults to 90)
    //     appStoreLanguage: 'es', // language code for the App Store (defaults to user's browser language)
    //     title: 'Descarga la app Soli',
    //     author: 'No necesitas ser cliente del BCP',
    //     button: '¡Regístrate!',
    //     store: {
    //         ios: 'App Store',
    //         android: 'Google Play'
    //     },
    //     price: {
    //         ios: '',
    //         android: ''
    //     },
    //     // url:'https://onelink.to/xurcbr',
    //     hideOnInstall: true,
    //     appendToSelector: 'head',
    //     layer: false,
    //     force: force
    // });

    if(window.location.href.indexOf('#puntos-yape') != -1) {
        $("#puntos-yape").modal();
    }

    // if ('serviceWorker' in navigator) {
    //     window.addEventListener('load', function() {
    //         navigator.serviceWorker.register('./sw.js?'+Math.random()+'')
    //     });
    // }
});
function detectMob() {
    return ( ( window.innerWidth <= 997 )  );
}
//scroll to element phone just in phone
function scrollFunction() {
    let e = document.getElementById("phone_expo");
    if( detectMob()){
        e.scrollIntoView({
            block: 'start',
            behavior: 'smooth',
            inline: 'start'
        });
    }
}

// function generateLink() {
//     let number = "+591"+document.form_main.number.value;
//     var yourMessage = 'Bienvenido a tu nueva libertad financiera con Soli usa este enlace para descargar la app movil: https://bit.ly/2Y7g4YU';
//     var message = yourMessage.split(' ').join('%20');
//     let url = 'https://web.whatsapp.com/send?phone=' + number + '&text=%20' + message;
//     if(navigator.userAgent.match(/webOS/i)|| navigator.userAgent.match(/iPhone/i)|| navigator.userAgent.match(/iPad/i)|| navigator.userAgent.match(/iPod/i)) {
//         window.location.assign(url, '_blank');
//     }else{
//         window.open(url, '_blank');
//     }
//     return console.log('https://api.whatsapp.com/send?phone=' + number + '&text=%20' + message)
// }

if($("#soli_agentes_bcp_atm").length != 0) {
    if (window.navigator.geolocation) {
        // console.log(window.navigator.geolocation);

        navigator.geolocation.getCurrentPosition(successCallback, errorCallback);

        function successCallback(datos) {
            // console.log(datos);
            var YOUR_LAT = datos.coords.latitude;
            var YOUR_LON = datos.coords.longitude
            var iframe_agentes = document.createElement('iframe');
            iframe_agentes.width = "100%";
            iframe_agentes.height = "400px";
            iframe_agentes.setAttribute("src", 'https://www.google.com/maps/d/embed?mid=1FuQemmqWJmxmQeaJcRAxpRFc-aiY-Bo&ehbc&ll=' + YOUR_LAT + '%2C' + YOUR_LON + '&z=13');
            document.getElementById("soli_agentes_bcp_atm").appendChild(iframe_agentes);

        }

        function errorCallback(error) {
            var iframe_agentes = document.createElement('iframe');
            iframe_agentes.width = "100%";
            iframe_agentes.height = "400px";
            iframe_agentes.setAttribute("src", 'https://www.google.com/maps/d/embed?mid=1FuQemmqWJmxmQeaJcRAxpRFc-aiY-Bo&ehbc');
            document.getElementById("soli_agentes_bcp_atm").appendChild(iframe_agentes);
        }
    }
}
///// Section-1 CSS-Slider /////
// Auto Switching Images for CSS-Slider
// function bannerSwitcher() {
//     next = $('.sec-1-input').filter(':checked').next('.sec-1-input');
//     if (next.length) next.prop('checked', true);
//     else $('.sec-1-input').first().prop('checked', true);
// }
//
// var bannerTimer = setInterval(bannerSwitcher, 5000);

// $('nav .controls label').click(function() {
//     clearInterval(bannerTimer);
//     bannerTimer = setInterval(bannerSwitcher, 5000)
// });


///// Anchor Smooth Scroll /////
//   $('.main-menu a, .learn-more-button a').click(function(e){

//     e.preventDefault();

//     var target = $(this).attr('href');

//     $('html, body').animate({scrollTop: $(target).offset().top}, 1000);
//     return false;
//   });

//
// var $cards = $('.card-object'),
//     $faceButtons = $('.face');
//
// $faceButtons.on('click', flipCard);
//
// function flipCard(event) {
//     event.preventDefault();
//
//     var $btnFace = $(this),
//         $card = $btnFace.parent('.card-object');
//
//     if( $card.hasClass('flip-in') ) {
//         closeCards();
//     } else {
//         closeCards();
//         openCard($card);
//     }
//
// }
//
// function closeCards() {
//     $cards.each( function() {
//         $(this)
//             .filter('.flip-in')
//             .removeClass('flip-in')
//             .queue( function() {
//                 // Force reflow hack
//                 var reflow = this.offsetHeight;
//                 $(this)
//                     .addClass('flip-out')
//                     .dequeue();
//             })
//
//     });
// }
//
// function openCard($card) {
//     $card
//         .removeClass('flip-out')
//         .queue( function() {
//             // Force reflow hack
//             var reflow = this.offsetHeight;
//             $(this)
//                 .addClass('flip-in')
//                 .dequeue();
//         });
//
// }
