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
}
