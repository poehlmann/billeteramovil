
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
        iframe_agentes.setAttribute("src", 'https://www.google.com/maps/d/embed?mid=158KpL_Wj6wHN2wOnj7ZoJ1_6_znkYZRq&ehbc=2E312F&ll='+YOUR_LAT+'%2C'+YOUR_LON+'&z=13');
        document.getElementById("soli_agentes_bcp_atm").appendChild(iframe_agentes);

    }

    function errorCallback(error) {
        var iframe_agentes = document.createElement('iframe');
        iframe_agentes.width="100%";
        iframe_agentes.height="400px";
        iframe_agentes.setAttribute("src", 'https://www.google.com/maps/d/embed?mid=158KpL_Wj6wHN2wOnj7ZoJ1_6_znkYZRq&ehbc=2E312F');
        document.getElementById("soli_agentes_bcp_atm").appendChild(iframe_agentes);
    }
}

// Check active classes
var checkClass = function() {
    if ( $('.item').hasClass('hide') ) {
        $('.item').removeClass('hide');
    }
};

// Category filters
$('.all').click( function() {
    checkClass();
});

$('.adios_al_efectivo').click( function() {
    checkClass();
    $('.item:not(.adios_al_efectivo)').toggleClass('hide');
});
$('.inclusion_financiera').click( function() {
    checkClass();
    $('.item:not(.inclusion_financiera)').toggleClass('hide');
});
$('.mundo_fintech').click( function() {
    checkClass();
    $('.item:not(.mundo_fintech)').toggleClass('hide');
});
$('.prensa').click( function() {
    checkClass();
    $('.item:not(.prensa)').toggleClass('hide');
});
$('.negocios_digitales').click( function() {
    checkClass();
    $('.item:not(.negocios_digitales)').toggleClass('hide');
});

// Active tag
$('.button').click(function(){
    if($('#articles').children(':visible').length == 0) {
        Swal.fire({
            title: 'Estamos trabajando!',
            text: '??Muy pronto tendremos novedades!',
            imageUrl: 'https://i.gifer.com/Ao.gif',
            imageWidth: 400,
            imageHeight: 400,
            imageAlt: 'Soli articulos',
        })
    }
    $('.button').removeClass('active');
    $(this).addClass('active');
})


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
        autoPlay: 2500
    })

    owl.on('changed.owl.carousel', function (e) {
        var punteroQR = e.relatedTarget.relative(e.relatedTarget.current());
        var element = document.getElementById("phone"+punteroQR);
        if (document.querySelector('.customNavigation .active_phone') !== null) {
            document.querySelector('.customNavigation .active_phone').classList.remove('active_phone');
        }
        console.log("1",e.relatedTarget.relative(e.relatedTarget.current()));
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

if( document.getElementById("owl-demo2") !==null) {
    var owl2 = $("#owl-demo2");
    owl2.owlCarousel({
        items: 1,
        singleItem: true,
        loop: true,
        autoplay: true,
        autoPlay: 2500
    })

    owl2.on('changed.owl.carousel', function (e) {
        var puntero = e.relatedTarget.relative(e.relatedTarget.current())+4;
        if(puntero == 3){
            puntero = 4
        }
        var element = document.getElementById("phone"+(puntero));
        if (document.querySelector('.customNavigation2 .active_phone') !== null) {
            document.querySelector('.customNavigation2 .active_phone').classList.remove('active_phone');
        }
        console.log("2",puntero);
        element.classList.add("active_phone");
    })

    $('.phone4').click(function () {
        owl2.trigger('to.owl.carousel', 0);
        owl2.trigger('stop.owl.autoplay');
        var element = document.getElementById("phone4");
        if (document.querySelector('.customNavigation2 .active_phone') !== null) {
            document.querySelector('.customNavigation2 .active_phone').classList.remove('active_phone');
        }
        element.classList.add("active_phone");
    });
    $('.phone5').click(function () {
        owl2.trigger('to.owl.carousel', 1);
        owl2.trigger('stop.owl.autoplay');
        var element = document.getElementById("phone5");
        if (document.querySelector('.customNavigation2 .active_phone') !== null) {
            document.querySelector('.customNavigation2 .active_phone').classList.remove('active_phone');
        }
        element.classList.add("active_phone");
    });
    $('.phone6').click(function () {
        owl2.trigger('to.owl.carousel', 2);
        owl2.trigger('stop.owl.autoplay');
        var element = document.getElementById("phone6");
        if (document.querySelector('.customNavigation2 .active_phone') !== null) {
            document.querySelector('.customNavigation2 .active_phone').classList.remove('active_phone');
        }
        element.classList.add("active_phone");
    });
    $('.phone7').click(function () {
        owl2.trigger('to.owl.carousel', 3);
        owl2.trigger('stop.owl.autoplay');
        var element = document.getElementById("phone7");
        if (document.querySelector('.customNavigation2 .active_phone') !== null) {
            document.querySelector('.customNavigation2 .active_phone').classList.remove('active_phone');
        }
        element.classList.add("active_phone");
    });
}
//scroll to element phone just in phone
function scrollFunction2() {
    let e = document.getElementById("phone_expo2");
    if( detectMob()){
        e.scrollIntoView({
            block: 'start',
            behavior: 'smooth',
            inline: 'start'
        });
    }
}

function detectMob() {
    return ( ( window.innerWidth <= 997 )  );
}
//scroll to element phone just in phone
function scrollFunction(value) {
    let e = document.getElementById("phone_expo");
    if( detectMob()){
        e.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}
function scrollFunction_down() {
    let e = document.getElementById("phone_expo");
    if( detectMob()){
        e.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}
