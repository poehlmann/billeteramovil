$(document).ready(function () {
    // $('.collapse').on('show.bs.collapse hide.bs.collapse', function (e) {
    //     e.preventDefault();
    // });
    //
    // $('[data-toggle="collapse"]').on('click', function (e) {
    //     e.preventDefault();
    //     $($(this).data('target')).toggleClass('in');
    // });

    // console.log("location.href",location.href);
    var tabnum = location.href.split("#").slice(-1)[0] ;
    if(window.location.href.indexOf("#") > -1) {
        if (tabnum!=""){
            $('#'+tabnum).addClass('in');
            // $(window).scrollTop( $("#"+tabnum).offset().top );
        // .scrollTop( $("#topofthePage").offset().top );
            window.scrollTo(0,0);
            if( window.innerWidth >= 290 ){
                $('html,body').animate({
                    scrollTop: $("#" + this.$element[0].id).offset().top - 180
                }, 0);
            }else {
                $('html,body').animate({
                    scrollTop: $("#" + this.$element[0].id).offset().top - 230
                }, 0);
            }
            var tab_link = document.querySelectorAll("a[href='#"+tabnum+"']");
            var tab = tab_link[0];
            // console.log("tab",tab);
            tab.classList.remove("collapsed");
            $('.window-search').css('display','none');
        }
    }
    $('.pf_no').click(function () {
        $(this).parent().parent().next().next().addClass("show_response");
        $(this).parent().parent().addClass("hide_response");
            // $(".nps_pf_container").css("display","none");
            // $(".box-response-no").css("display","flex");
    });

    $("input[name='radio_response_no']").change(function(){
        if ($("input[name='radio_response_no']").is(":checked"))
        {
            $(".pf_no_fin").removeClass('disabled');
        }
    })

    $('.pf_no_fin').click(function () {
        $(this).parent().addClass("hide_response").removeClass("show_response");
        $(this).parent().next().addClass("show_response");


        // $(".nps_pf_container").css("display","none");
        // $(".box-response-no").css("display","none");
        // $(".box-response").css("display","flex");
        $('.message-response-no').val("");
        $(".pf_no_fin").addClass('disabled');
        setTimeout(function() {
            $(".box-response").css("display","none");
            $(".nps_pf_container").css("display","flex");
        }, 7000);
    });

    $('.pf_si').click(function () {
        // if($(this).attr('id').split("resp_si_").pop() == location.href.split("#").slice(-1)[0]) {
            $(this).parent().parent().next().addClass("show_response");
            $(this).parent().parent().addClass("hide_response");
        // }
    });

    $('.pf_si_fin').click(function () {
        $(this).parent().addClass("hide_response").removeClass("show_response");
        $(this).parent().next().next().addClass("show_response");

        // $(".nps_pf_container").css("display","none");
        // $(".box-response-si").css("display","none");
        // $(".box-response").css("display","flex");
        $('.message-response-si').val("");
        $(".pf_si_fin").addClass('disabled');
        setTimeout(function() {
            $(".box-response").css("display","none");
            $(".nps_pf_container").css("display","flex");
        }, 7000);
    });



    // window.scrollTo(0,0);
    size = $(document).width();
    if (size >= 1199) {
        $(".icon_down") .css('display','none');
        $('.inner').css('display','block');
    }else{
        $(".icon_down") .css('display','block');
        $('.inner').css('display','none');
    }
    $(".nest").on("click", function() {
        if (size < 1199) {
            if ($(this).next().hasClass("show")) {
                $(this).next().removeClass("show");
                $(this).next().slideUp(300);
                $(this).find("div .icon_down").css({
                    "-webkit-transform": "rotate(0deg)",
                    "-moz-transform": "rotate(0deg)",
                    "transform": "rotate(0deg)" /* For modern browsers(CSS3)  */
                });
            } else {
                $(this).parent().parent().find("li .inner").removeClass("show");
                $(this).parent().parent().find("li .inner").slideUp(300);
                $(this).next().toggleClass("show");
                $(this).next().slideToggle(300);
                // $(this).next().find(".icon_down").filter(':after').style.transform = "rotate(180deg)";
                $(this).find("div .icon_down").css({
                    "-webkit-transform": "rotate(180deg)",
                    "-moz-transform": "rotate(180deg)",
                    "transform": "rotate(180deg)" /* For modern browsers(CSS3)  */
                });
            }
        }
    });


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
            autoPlay: 100
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
        // $('.phone7').click(function () {
        //     owl.trigger('to.owl.carousel', 7);
        //     owl.trigger('stop.owl.autoplay');
        //     var element = document.getElementById("phone7");
        //     if (document.querySelector('.customNavigation .active_phone') !== null) {
        //         document.querySelector('.customNavigation .active_phone').classList.remove('active_phone');
        //     }
        //     element.classList.add("active_phone");
        // });
    }

    var link_tutorial = 'https://www.youtube.com/embed/_iFIy-16-_o';
    var iframe_tutorial = document.createElement('iframe');
    iframe_tutorial.width="100%";
    iframe_tutorial.height="480px";
    iframe_tutorial.setAttribute("src", link_tutorial);
    if($("#videotutorialyape").length != 0) {
        document.getElementById("videotutorialyape").appendChild(iframe_tutorial);
    }
});

