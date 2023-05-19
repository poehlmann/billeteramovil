(function($) {
    document.getElementById('copyrightyear').innerHTML =  `<p>Yape Bolivia © ${new Date().getFullYear()}. <a href="https://www.asfi.gob.bo/" target="_blank">Esta Entidad es
                                Supervisada por ASFI – Banco de Crédito de Bolivia S.A.</a><br>Banco de Crédito de
                                Bolivia S.A. Av. Hernando Siles Nº 5555, edificio “Torre Empresarial ESIMSA”, en la zona
                                de Obrajes de la ciudad de La Paz</p>`;
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

    function changeUrlMenu(){
        if($("#descarga_android").length != 0) {
            document.getElementById("descarga_android").src = realPath + "/assets/img/soli-05.svg";
        }
        if($("#descarga_ios").length != 0) {
            document.getElementById("descarga_ios").src = realPath + "/assets/img/soli-02.svg";
        }
        document.getElementById("footer-facebook").src=realPath+"/assets/img/ic_social_facebook_b.svg";
        document.getElementById("footer-instagram").src=realPath+"/assets/img/ic_social_instagram_b.svg";
        document.getElementById("footer-youtube").src=realPath+"/assets/img/ic_social_youtube_b.svg";
        document.getElementById("footer-whatsapp").src=realPath+"/assets/img/ic_social_whatsapp_b.svg";
        document.getElementById("footer-tiktok").src=realPath+"/assets/img/ic_social_tiktok_b.svg";
        document.getElementById("footer-logo").src=realPath+"/assets/img/Logo_Bolivia_footer.svg";
        document.getElementById("footer-scrollup").src=realPath+"/assets/img/angle-up-white.svg";
        if($("#header").hasClass("cell") == 0) {
            if ($("#logo-menu-secundary").length == 0) {
                document.getElementById("logo-menu").src = realPath + "/assets/img/Logo_Bolivia_2.svg";
            } else {
                document.getElementById("logo-menu-secundary").src = realPath + "/assets/img/Logo_Bolivia_3.svg";
            }
        }

        document.getElementById("menu_inicio").href = realPath+"/";
        document.getElementById("menu_yape").href = realPath+"/yape/";
        document.getElementById("menu_ayuda").href = realPath+"/ayuda";
        // document.getElementById("menu_billetera").href = realPath+"/billeteramovil/";
        document.getElementById("menu_seguridad").href = realPath+"/seguridad/";
        document.getElementById("menu_promociones").href = realPath+"/solipromociones/";
        document.getElementById("menu_blog").href = realPath+"/blog/";
        document.getElementById("menu_negocio").href = realPath+"/YapeNegocios/";
        document.getElementById("menu_beneficios").href = realPath+"/beneficios/";

        document.getElementById("submenu_arrow").src = realPath+"/assets/img/yape_arrowmenu.svg";


        document.getElementById("footer_inicio").href = realPath+"/index.html";
        document.getElementById("footer_yape").href = realPath+"/yape/";
        document.getElementById("footer_ayuda").href = realPath+"/ayuda";
        // document.getElementById("footer_billetera").href = realPath+"/billeteramovil/";
        // document.getElementById("footer_seguridad").href = realPath+"/seguridad/";
        document.getElementById("footer_promociones").href = realPath+"/solipromociones/";
        document.getElementById("footer_blog").href = realPath+"/blog/";
        document.getElementById("footer_negocio").href = realPath+"/YapeNegocios/";

        // //ahora verificaremos si es movil
        // let e = document.getElementById("phone_expo");
        // if( navigator.userAgent.match(/Android/i)
        //     || navigator.userAgent.match(/webOS/i)
        //     || navigator.userAgent.match(/iPhone/i)
        //     || navigator.userAgent.match(/iPad/i)
        //     || navigator.userAgent.match(/iPod/i)
        //     || navigator.userAgent.match(/BlackBerry/i)
        //     || navigator.userAgent.match(/Windows Phone/i)){
        //     // document.getElementById("logo-menu-secundary").src=realPath+"/assets/img/Logo_Bolivia_3.svg";
        //     document.getElementById("header-sroll").classList.add("small");
        // }

    }
    changeUrlMenu();
    //SMALLER HEADER WHEN SCROLL PAGE
    function smallerMenu() {
        var sc = $(window).scrollTop();
        if (sc > 40) {
            $('#header-sroll').addClass('small');
            document.getElementById("logo-menu").src=realPath+"/assets/img/Logo_Bolivia_3.svg";
        }else {
            $('#header-sroll').removeClass('small');
            document.getElementById("logo-menu").src=realPath+"/assets/img/Logo_Bolivia_2.svg";
        }
        if ($(this).scrollTop()>0)
        {
            $('#location-flag').hide(1000);
        }
        else
        {
            $('#location-flag').show(1000);
        }
        windowSize();
    }

    // VERIFY WINDOW SIZE
    function windowSize() {
        size = $(document).width();
        if (size >= 991) {
            $('body').removeClass('open-menu');
            $('.hamburger-menu .bar').removeClass('animate');
        }else{
            document.getElementById("header-sroll").className = "header small cell";
            // console.log("no esta agregando la clase",realPath+"/assets/img/Logo_Bolivia_3.svg");
            if($("#logo-menu").length != 0) {
                document.getElementById("logo-menu").src = realPath + "/assets/img/Logo_Bolivia_3.svg";
            }
        }
    }

    // ESC BUTTON ACTION
    $(document).keyup(function(e) {
        if (e.keyCode == 27) {
            $('.bar').removeClass('animate');
            $('body').removeClass('open-menu');
            $('header .desk-menu .menu-container .menu .menu-item-has-children a ul').each(function( index ) {
                $(this).removeClass('open-sub');
            });
        }
    });

    $('#cd-primary-nav > li').hover(function() {
        $whidt_item = $(this).width();
        console.log("$whidt_item",$whidt_item);
        $whidt_item = $whidt_item-8;
        console.log("$whidt_item-8",$whidt_item);
        $prevEl = $(this).prev('li');
        console.log("$prevEl",$prevEl);
        $preWidth = $(this).prev('li').width();
        console.log("$preWidth",$preWidth);
        var pos = $(this).position();
        console.log("pos",pos);
        pos = pos.left+4;
        console.log("pos+4",pos);
        $('header .desk-menu .menu-container .menu>li.line').css({
            width:  $whidt_item,
            left: pos,
            opacity: 1
        });
    });

    // ANIMATE HAMBURGER MENU
    $('.hamburger-menu').on('click', function() {
        $('.hamburger-menu .bar').toggleClass('animate');
        if($('body').hasClass('open-menu')){
            $('body').removeClass('open-menu');
        }else{
            $('body').toggleClass('open-menu');
        }
    });

    $('header .desk-menu .menu-container .menu .menu-item-has-children ul').each(function(index) {
        if($(".back").length == 0) {
            $(this).append('<li class="back"><a href="#">Volver</a></li>');
        }
    });

    // RESPONSIVE MENU NAVIGATION
    $('header .desk-menu .menu-container .menu .menu-item-has-children > a').on('click', function(e) {
        e.preventDefault();
        if(size <= 991){
            $(this).next('ul').addClass('open-sub');
        }
    });

    // CLICK FUNCTION BACK MENU RESPONSIVE
    $('header .desk-menu .menu-container .menu .menu-item-has-children ul .back').on('click', function(e) {
        e.preventDefault();
        $(this).parent('ul').removeClass('open-sub');
    });

    $('body .over-menu').on('click', function() {
        $('body').removeClass('open-menu');
        $('.bar').removeClass('animate');
    });

    $(document).ready(function(){
        windowSize();
        setNavigation();
        obtenerPais();

        $('select#country_page').change(function(){
            window.location = $(this).val();
        });
    });

    $(window).scroll(function(){
        if($("#logo-menu-secundary").length == 0) {
            smallerMenu();
        }
    });

    $(window).resize(function(){
        windowSize();
    });

    function setNavigation() {
        var currenturl  = window.location.href
        var path = window.location.pathname;
        path = path.replace(/\/$/, "");
        path = decodeURIComponent(path);
        $("nav a").each(function () {
            var href = $(this).attr('href');
            if (currenturl.substring(0, href.length) == href) {
                $(this).closest('li').addClass('active');
            }
        });
    }
    function obtenerPais(){
        $.get("https://ipinfo.io/?token=719fc6762c190c", function (response) {
            // $("#ip").html("IP: " + response.ip);
            // $("#address").html("pais: " + response.country);
            // $("#details").html(JSON.stringify(response, null, 4));
            if(response.country=="PE") {
                $("#text-flag").html("Estás en el sitio web de Yape Perú. Elige tu país o región para ver el contenido sobre tú ubicación.");
                $("#button-flag").html("<a href=\"https://www.yape.com.pe/\"><span class=\"flag-icon flag-icon-pe me-1\"></span> <span>Perú</span></a>");
            }
        }, "jsonp");
    }

})(jQuery);
