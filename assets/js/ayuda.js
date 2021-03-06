$(document).ready(function () {
    window.scrollTo(0,0);

    jQuery(function () {
        var url = window.location.href;
        var element="";
        if (document.querySelector('#faq-tabs a.active') !== null) {
            document.querySelector('#faq-tabs a.active').classList.remove('active');
        }
        jQuery("#faq-tabs a").each(function (index,value) {
            if (url == (this.href)) {
                jQuery(this).addClass("active");
                element= value.attributes.href.value;
            }
        });

        if (document.querySelector('#faq-tab-content .tab-pane.active') !== null) {
            document.querySelector('#faq-tab-content .tab-pane.active').classList.remove('active');
        }
        jQuery("#faq-tab-content .tab-pane").each(function (index,value) {
            if (element == ("#"+(value.id))) {
                jQuery(this).addClass("active");
            }
        });
    });

    jQuery(function () {
        var link = jQuery("#faq-tabs a");
        link.on("click", function () {
            var $this = jQuery(this);
            var href = $this.href;
            jQuery("a .nav-link").removeClass().addClass(href);
            link.removeClass("active");
            if (document.querySelector('#faq-tabs a.active') !== null) {
                document.querySelector('#faq-tabs a.active').classList.remove('active');
            }
            jQuery(this).closest("a").addClass("active");
        })
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

    if( document.getElementById("owl-tutorial") !==null) {
        var owl = $("#owl-tutorial");
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

    var link_tutorial = 'https://www.youtube.com/embed/A5-9HGZuuwU';
    var iframe_tutorial = document.createElement('iframe');
    iframe_tutorial.width="100%";
    iframe_tutorial.height="480px";
    iframe_tutorial.setAttribute("src", link_tutorial);
    document.getElementById("videotutorialsoli").appendChild(iframe_tutorial);
});

