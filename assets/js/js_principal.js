$(document).ready(function() {
    !function(e,t){if(!e.$Letstalk){var n=e.$Letstalk={};n.enqueue=function(){var e=arguments;return new Promise(function(t,n){u.stack.push({args:e,resolve:t,reject:n}),u.times.push(+new Date)})},n.init=function(){return n.enqueue("init",arguments)},n.on=function(){return n.enqueue("on",arguments)},n.executeAppMethod=function(){return n.enqueue("executeAppMethod",arguments)},n.isAvailable=function(){return n.enqueue("isAvailable",arguments)},n.launch=function(){return n.enqueue("launch",arguments)},n.listApps=function(){return n.enqueue("listApps",arguments)},n.remove=function(){return n.enqueue("remove",arguments)};var u=n._={stack:[],times:[+new Date]};t.body?r():e.attachEvent?e.attachEvent("onload",r):e.addEventListener("load",r,!1)}function r(){a=!1,s=t.createElement("script"),s.type="text/javascript",s.src="https://static.letsta.lk/launcher/launcher.js",s.async=!0,s.defer=!0,k=document.getElementsByTagName("script")[0],k.parentNode.insertBefore(s,k)}}(window,document);
    window.LetstalkSettings = {
        organization: 'bcp-qa'
    };
    window.$Letstalk.on('ready', function() {
        window.$Letstalk.launch('chat-pub-soli-qa');
    })
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
    //                 <img alt="navidad con soli" class="mt-50" src="./assets/img/navidad-y-año-nuevo1.png"> `,
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
    //         html: `<img alt="año nuevo con soli" src="./assets/img/navidad-y-año-nuevo2.png"> `,
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

    var force="";
    if( navigator.userAgent.match(/Android/i)){
        force='android';
    }else if(navigator.userAgent.match(/webOS/i)|| navigator.userAgent.match(/iPhone/i)|| navigator.userAgent.match(/iPad/i)|| navigator.userAgent.match(/iPod/i)){
        force='ios';
    }else{
        // force='android';
        document.getElementById("wrap").style.setProperty("margin-top", "0px", "important");
        document.getElementById('menu-cel').style.setProperty("margin-top", "0px", "important");
    }
    var n = document.querySelector('.smartbanner');
    if (n) {
        n.parentNode.removeChild(n);
    }
    new SmartBanner({
        aysHidden: 0,   // days to hide banner after close button is clicked (defaults to 15)
        daysReminder: 0, // days to hide banner after "VIEW" button is clicked (defaults to 90)
        appStoreLanguage: 'es', // language code for the App Store (defaults to user's browser language)
        title: 'Descarga la app Soli',
        author: 'No necesitas ser cliente del BCP',
        button: '¡Descarga!',
        store: {
            ios: 'App Store',
            android: 'Google Play'
        },
        price: {
            ios: 'Soli es 100% gratis',
            android: 'Soli es 100% gratis'
        },
        // url:'https://onelink.to/xurcbr',
        hideOnInstall: true,
        appendToSelector: 'head',
        layer: false,
        force: force
    });

    $('#owl-banner').owlCarousel({
        items : 1,
        loop:true,
        autoplay:true,
        autoplayTimeout:20000,
        lazyLoad:true,
        autoplayHoverPause:true,
        animateOut: 'fadeOut',
        animateIn: 'fadeIn',
    });

    $('#owl-comercios').owlCarousel({
        items : 3,
        loop:true,
        autoplay:true,
        autoplayTimeout:3000,
        lazyLoad:true,
        // autoplayHoverPause:true,
        animateOut: 'fadeOut',
        animateIn: 'fadeIn',
    });
    
    if( document.getElementById("owl-demo") !==null) {
        var owl = $("#owl-demo");
        owl.owlCarousel({
            items: 1,
            singleItem: true,
            loop: true,
            autoplay: true,
            autoPlay: 3500
        })

        owl.on('changed.owl.carousel', function (e) {
            var element = document.getElementById("phone"+e.relatedTarget.relative(e.relatedTarget.current()));
            if (document.querySelector('.customNavigation .active_phone') !== null) {
                document.querySelector('.customNavigation .active_phone').classList.remove('active_phone');
            }
            element.classList.add("active_phone");
        })

        $('.phone0').click(function () {
            owl.trigger('to.owl.carousel', 0);
            owl.trigger('stop.owl.autoplay');
            var element = document.getElementById("phone0");
            if (document.querySelector('.customNavigation .active_phone') !== null) {
                document.querySelector('.customNavigation .active_phone').classList.remove('active_phone');
            }
            element.classList.add("active_phone");
        });
        $('.phone1').click(function () {
            owl.trigger('to.owl.carousel', 1);
            owl.trigger('stop.owl.autoplay');
            var element = document.getElementById("phone1");
            if (document.querySelector('.customNavigation .active_phone') !== null) {
                document.querySelector('.customNavigation .active_phone').classList.remove('active_phone');
            }
            element.classList.add("active_phone");
        });
        $('.phone2').click(function () {
            owl.trigger('to.owl.carousel', 2);
            owl.trigger('stop.owl.autoplay');
            var element = document.getElementById("phone2");
            if (document.querySelector('.customNavigation .active_phone') !== null) {
                document.querySelector('.customNavigation .active_phone').classList.remove('active_phone');
            }
            element.classList.add("active_phone");
        });
        $('.phone3').click(function () {
            owl.trigger('to.owl.carousel', 3);
            owl.trigger('stop.owl.autoplay');
            var element = document.getElementById("phone3");
            if (document.querySelector('.customNavigation .active_phone') !== null) {
                document.querySelector('.customNavigation .active_phone').classList.remove('active_phone');
            }
            element.classList.add("active_phone");
        });
        $('.phone4').click(function () {
            owl.trigger('to.owl.carousel', 4);
            owl.trigger('stop.owl.autoplay');
            var element = document.getElementById("phone4");
            if (document.querySelector('.customNavigation .active_phone') !== null) {
                document.querySelector('.customNavigation .active_phone').classList.remove('active_phone');
            }
            element.classList.add("active_phone");
        });
        $('.phone5').click(function () {
            owl.trigger('to.owl.carousel', 5);
            owl.trigger('stop.owl.autoplay');
            var element = document.getElementById("phone5");
            if (document.querySelector('.customNavigation .active_phone') !== null) {
                document.querySelector('.customNavigation .active_phone').classList.remove('active_phone');
            }
            element.classList.add("active_phone");
        });
        $('.phone6').click(function () {
            owl.trigger('to.owl.carousel', 6);
            owl.trigger('stop.owl.autoplay');
            var element = document.getElementById("phone6");
            if (document.querySelector('.customNavigation .active_phone') !== null) {
                document.querySelector('.customNavigation .active_phone').classList.remove('active_phone');
            }
            element.classList.add("active_phone");
        });
        $('.phone7').click(function () {
            owl.trigger('to.owl.carousel', 7);
            owl.trigger('stop.owl.autoplay');
            var element = document.getElementById("phone7");
            if (document.querySelector('.customNavigation .active_phone') !== null) {
                document.querySelector('.customNavigation .active_phone').classList.remove('active_phone');
            }
            element.classList.add("active_phone");
        });
    }

    var link = "https://www.google.com/maps/d/embed?mid=1N7kFRvFaoxGDcAfa1UP2Ea5ZhRuAzObv&z=6"
    var iframe = document.createElement('iframe');
    iframe.width="100%";
    iframe.height="480px";
    iframe.setAttribute("src", link);
    document.getElementById("maps").appendChild(iframe);

    var link_tutorial = 'https://www.youtube.com/embed/A5-9HGZuuwU';
    var iframe_tutorial = document.createElement('iframe');
    iframe_tutorial.width="100%";
    iframe_tutorial.height="480px";
    iframe_tutorial.setAttribute("src", link_tutorial);
    document.getElementById("videotutorialsoli").appendChild(iframe_tutorial);

    // var link_comercio_qr = "con_qr.html"
    // var iframe_comercio_qr= document.createElement('iframe');
    // iframe_comercio_qr.width="100%";
    // iframe_comercio_qr.height="400px";
    // iframe_comercio_qr.setAttribute("src", link_comercio_qr);
    // document.getElementById("comercio_qr").appendChild(iframe_comercio_qr);

    // var link_comercio_nfc = "con_pos.html"
    // var iframe_comercio_nfc = document.createElement('iframe');
    // iframe_comercio_nfc.width="100%";
    // iframe_comercio_nfc.height="400px";
    // iframe_comercio_nfc.setAttribute("src", link_comercio_nfc);
    // document.getElementById("comercio_nfc").appendChild(iframe_comercio_nfc);

    // var link_agentes = "agentes_bcp.html"
    // var iframe_agentes = document.createElement('iframe');
    // iframe_agentes.width="100%";
    // iframe_agentes.height="400px";
    // iframe_agentes.setAttribute("src", link_agentes);
    // document.getElementById("agentes").appendChild(iframe_agentes);

    if(window.location.href.indexOf('#puntos-soli') != -1) {
        $("#puntos-soli").modal();
    }

    if ('serviceWorker' in navigator) {
        window.addEventListener('load', function() {
            navigator.serviceWorker.register('./sw.js?'+Math.random()+'')
        });
    }
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
//animation phone fin
function initparticles() {
    confetti();
}

function confetti() {
    $.each($(".particletext.confetti"), function(){
        var confetticount = ($(this).width()/50)*10;
        for(var i = 0; i <= confetticount; i++) {
            $(this).append('<span class="particle c' + $.rnd(1,2) + '" style="top:' + $.rnd(10,50) + '%; left:' + $.rnd(0,100) + '%;width:' + $.rnd(6,8) + 'px; height:' + $.rnd(3,4) + 'px;animation-delay: ' + ($.rnd(0,30)/10) + 's;"></span>');
        }
    });
}

jQuery.rnd = function(m,n) {
    m = parseInt(m);
    n = parseInt(n);
    return Math.floor( Math.random() * (n - m + 1) ) + m;
}

initparticles();

function generateLink() {
    let number = "+591"+document.form_main.number.value;
    var yourMessage = 'Bienvenido a tu nueva libertad financiera con Soli usa este enlace para descargar la app movil: https://bit.ly/2Y7g4YU';
    var message = yourMessage.split(' ').join('%20');
    let url = 'https://api.whatsapp.com/send?phone=' + number + '&text=%20' + message;
    if(navigator.userAgent.match(/webOS/i)|| navigator.userAgent.match(/iPhone/i)|| navigator.userAgent.match(/iPad/i)|| navigator.userAgent.match(/iPod/i)) {
        window.location.assign(url, '_blank');
    }else{
        window.open(url, '_blank');
    }
    return console.log('https://api.whatsapp.com/send?phone=' + number + '&text=%20' + message)
}
if (window.navigator.geolocation) {
    // console.log(window.navigator.geolocation);
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);

    function successCallback(datos) {
        // console.log(datos);
        var YOUR_LAT = datos.coords.latitude;
        var YOUR_LON = datos.coords.longitude
        var iframe_agentes = document.createElement('iframe');
        iframe_agentes.width="100%";
        iframe_agentes.height="400px";
        iframe_agentes.setAttribute("src", 'https://www.google.com/maps/d/embed?hl=es&mid=1pMd3NZdrUhqfGps3qEePFRPeVEcXgn6u&ll='+YOUR_LAT+'%2C'+YOUR_LON+'&z=13');
        document.getElementById("soli_agentes_bcp_atm").appendChild(iframe_agentes);

    }

    function errorCallback(error) {
        var iframe_agentes = document.createElement('iframe');
        iframe_agentes.width="100%";
        iframe_agentes.height="400px";
        iframe_agentes.setAttribute("src", 'https://www.google.com/maps/d/embed?hl=es&mid=1pMd3NZdrUhqfGps3qEePFRPeVEcXgn6u');
        document.getElementById("soli_agentes_bcp_atm").appendChild(iframe_agentes);
    }
}

///// Section-1 CSS-Slider /////
// Auto Switching Images for CSS-Slider
function bannerSwitcher() {
    next = $('.sec-1-input').filter(':checked').next('.sec-1-input');
    if (next.length) next.prop('checked', true);
    else $('.sec-1-input').first().prop('checked', true);
}

var bannerTimer = setInterval(bannerSwitcher, 5000);

$('nav .controls label').click(function() {
    clearInterval(bannerTimer);
    bannerTimer = setInterval(bannerSwitcher, 5000)
});


///// Anchor Smooth Scroll /////
//   $('.main-menu a, .learn-more-button a').click(function(e){

//     e.preventDefault();

//     var target = $(this).attr('href');

//     $('html, body').animate({scrollTop: $(target).offset().top}, 1000);
//     return false;
//   });


var $cards = $('.card-object'),
    $faceButtons = $('.face');

$faceButtons.on('click', flipCard);

function flipCard(event) {
    event.preventDefault();

    var $btnFace = $(this),
        $card = $btnFace.parent('.card-object');

    if( $card.hasClass('flip-in') ) {
        closeCards();
    } else {
        closeCards();
        openCard($card);
    }

}

function closeCards() {
    $cards.each( function() {
        $(this)
            .filter('.flip-in')
            .removeClass('flip-in')
            .queue( function() {
                // Force reflow hack
                var reflow = this.offsetHeight;
                $(this)
                    .addClass('flip-out')
                    .dequeue();
            })

    });
}

function openCard($card) {
    $card
        .removeClass('flip-out')
        .queue( function() {
            // Force reflow hack
            var reflow = this.offsetHeight;
            $(this)
                .addClass('flip-in')
                .dequeue();
        });

}
// var c = document.getElementById('container');
// var box = document.getElementById('box');
//
// window.addEventListener('devicemotion', function(e) {
//     console.log(e);
//     var ps = document.querySelectorAll('p');
//     ps[0] = 'a'+e.rotationRate.aplha;
//     ps[1] = 'b'+e.rotationRate.beta;
//     ps[2] = 'g'+e.rotationRate.gamma;
//     ps[3].textContent = e.accelerationIncludingGravity.x;
//     ps[4].textContent = e.accelerationIncludingGravity.y;
//     ps[5].textContent = e.accelerationIncludingGravity.z;
// });
/*
c.animate([
  {transform: 'rotateY(-40deg) rotateZ(60deg)'},
  {transform: 'rotateY(40deg) rotateZ(-60deg)'}
], {
  duration: 1600,
  easing: 'ease-in-out',
  direction: 'alternate',
  iterations: Infinity
});
//*/



(function() {
    function ready(fn) {
        if (document.readyState != 'loading'){
            fn();
        } else {
            document.addEventListener('DOMContentLoaded', fn);
        }
    }

    function makeSnow(el) {
        var ctx = el.getContext('2d');
        var width = 0;
        var height = 0;
        var particles = [];

        var Particle = function() {
            this.x = this.y = this.dx = this.dy = 0;
            this.reset();
        }

        Particle.prototype.reset = function() {
            this.y = Math.random() * height;
            this.x = Math.random() * width;
            this.dx = (Math.random() * 1) - 0.5;
            this.dy = (Math.random() * 0.5) + 0.5;
        }

        function createParticles(count) {
            if (count != particles.length) {
                particles = [];
                for (var i = 0; i < count; i++) {
                    particles.push(new Particle());
                }
            }
        }

        function onResize() {
            width = window.innerWidth;
            height = window.innerHeight;
            el.width = width;
            el.height = height;

            createParticles((width * height) / 10000);
        }

        function updateParticles() {
            ctx.clearRect(0, 0, width, height);
            ctx.fillStyle = '#f6f9fa';

            particles.forEach(function(particle) {
                particle.y += particle.dy;
                particle.x += particle.dx;

                if (particle.y > height) {
                    particle.y = 0;
                }

                if (particle.x > width) {
                    particle.reset();
                    particle.y = 0;
                }

                ctx.beginPath();
                ctx.arc(particle.x, particle.y, 5, 0, Math.PI * 2, false);
                ctx.fill();
            });

            window.requestAnimationFrame(updateParticles);
        }

        onResize();
        updateParticles();

        window.addEventListener('resize', onResize);
    }

    ready(function() {
        var canvas = document.getElementById('snow');
        makeSnow(canvas);
    });
})();
