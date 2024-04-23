// Elasticlunr.js
var config = {
    expand: true
};
elasticlunr.synonyms = function (token) {
    if (token === null || token === undefined) {
        throw new Error('token should not be undefined');
    }
    switch (token) {
        case 'desvincular':
            return 'Cambié';
        case 'perdi':
            return 'Cambié';
        default:
            return token;
    }
};

elasticlunr.Pipeline.registerFunction(elasticlunr.synonyms, 'synonyms');

var index = elasticlunr(function () {
    // this.use(elasticlunr.es);
    this.addField('question');
    this.addField('tags');
    this.setRef('link');
    this.pipeline.before(elasticlunr.trimmer, elasticlunr.synonyms);
});

var displayResult = function(val,result){
    $('.results').html('');
    result.map(function(el){
        // console.log("result",el.doc);
        var li = $('<li></li>');
        var a = $('<a href='+el.doc.link+' target="_self">'+ createSearchResultBlurb(val,el.doc.question)+'</a><i class="angle-right-r icon-yape"></i>');
        li.append(a);
        // li.append('<p>'+el.doc.answer+'</p>');
        $('.results').append(li);
    });
    return result;
}

function createSearchResultBlurb(query, pageContent){
    const reg = new RegExp(query,"gi");
    pageContent = pageContent.replace(reg, `<strong class="highlight-search">${query}</strong>`);
    return pageContent;
}

$('#clear').on('click', function(e) {
    e.preventDefault();
    // console.log('clear text.');
    $("#text-search").val('');
    $('.results').html('');
    $('#clear').css('display', 'none');
    $('.title_search').css("display","none");
    $(".sin_resultados_hide").css("display","none");
    $('#search_recomendation').css('display', 'block');
    return false;
});
$(".search-js").on('click', function(){
    var val = $("#text-search").val();
    // console.log('searched for: '+val);
    var result = index.search(val, config);
    // console.log("result:",result);
    displayResult(val,result);
});

$.ajax({
    url: '../../library.json',
    success: function(response){
        // console.log(response);
        $('button').prop('disabled', false);
        response.map(function(el, i){
            el.id = i;
            index.addDoc(el);
        });
    },
    error: function(jqxhr, status, exception) {
        // console.log('Exception:', status);
    },
    dataType: 'json'
});

$(".input-search").on("keyup",(e)=>{
    $('.title_search').css("display","none");
    $('.result_search').css('display', 'none');
    $("#searching").css("display","block");
    var val = $("#text-search").val();
    // console.log('searched for: '+val);
    // console.log("config",config);
    var result = index.search(val, config);
    if(val!=""){
        $('.results').html('');
        $(".sin_resultados_hide").css("display","none");
        $('.result_search').css('display', 'block');
        $('#clear').css('display', 'block');
        $('#search_recomendation').css('display', 'none');
    }else{
        $("#searching").css("display","none");
        $(".sin_resultados_hide").css("display","none");
        $('.result_search').css('display', 'none');
        $('#clear').css('display', 'none');
        $('#search_recomendation').css('display', 'block');
    }
    const timeoutSearch = setTimeout(function(){
        $("#searching").css("display","none");
        var resultado=displayResult(val,result);
        if(resultado.length==0 && val!=""){
            $('.title_search').css("display","none");
            $(".sin_resultados_hide").css("display","block");
            $("#mensaje_sin_resultados").html("No se encontraron<br>resultados para<br>'"+val+"'");
            // console.log("hubieron resultados");
        }else{
            $('.title_search').css("display","block");
            $(".sin_resultados_hide").css("display","none");
            // console.log("sin resultados");
        }
    },1000);
})
// prevent submission on enter
$(document).ready(function() {
    // $(window).keydown(function(event){
    //     if(event.keyCode == 13) {
    //         event.preventDefault();
    //         return false;
    //     }
    // });
});
// End Elasticlunr

window.addEventListener('beforeunload', function (e) {
    sessionStorage.clear()
});

$('#button-close').on('click', function() {
    $('body').css('overflow-y', 'visible');
    document.getElementById('window-search').style.display = 'none'
});
$('#close').on('click', function() {
    $('body').css('overflow-y', 'visible');
    document.getElementById('window-search').style.display = 'none'
});
function MakeSearch(){
    document.getElementById('window-search').style.display='block';
    let search = document.getElementById('text-search');
    search.focus();
    search.select();
    $('body').css('overflow-y', 'hidden');
}
(function($) {

    if($(".footer-section").length !=0){
        document.getElementById('copyright').innerHTML = `<p style='padding: 3px;color:rgba(255, 255, 255, 0.7) !important;font-size: 14px !important;'>Yape Bolivia © ${new Date().getFullYear()}. Todos los derechos reservados.</p>`;
        document.getElementById('copyrightyear').innerHTML =  `<p style="padding: 3px;letter-spacing: 2px;font-size: 12px;"><a href="https://www.asfi.gob.bo/" target="_blank">Esta Entidad es
                                Supervisada por ASFI – Banco de Crédito de Bolivia S.A.</a><br>Banco de Crédito de
                                Bolivia S.A. Av. Hernando Siles N.º 5555, edificio “Torre Empresarial ESIMSA”, en la zona
                                de Obrajes de la ciudad de La Paz</p>`;
    }
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
    let realPath=localhostPaht+"/"+projectName;
    console.log("realPath:",realPath+"/"+projectName);
    // if("https://www.yape.com.bo/index.html"== window.document.location.href || "http://127.0.0.1:5500/index.html" == window.document.location.href){
    //     window.location.replace("https://www.yape.com.bo/");
    // }
    document.querySelector('meta[property="og:image"]').setAttribute("content", realPath + '/assets/img/preview_yape.png');
    $('.descarga_QR').click(function() {
        if( navigator.userAgent.match(/Android/i)
            || navigator.userAgent.match(/webOS/i)
            || navigator.userAgent.match(/iPhone/i)
            || navigator.userAgent.match(/iPad/i)
            || navigator.userAgent.match(/iPod/i)
            || navigator.userAgent.match(/BlackBerry/i)
            || navigator.userAgent.match(/Windows Phone/i)){
            // window.location.replace("https://onelink.to/xurcbr");
            window.location.href = "https://onelink.to/xurcbr";
        }else{
            Swal.fire({
                padding: '3em',
                width: "80vh",
                html:
                    '<div class="row d-flex">' +
                    '<div class="col-md-6 indent-left-services">' +
                    '<div style="text-align: left"><strong class="mb-20 yape-texto-purpura font-size-26">Escanea el código QR y regístrate en Yape:</strong>\n' +
                    '<ol class="font-size-16" style="padding-inline-start: 15px;margin-block-start: revert;">' +
                    '<li>Apunta al código QR con la cámara de tu celular</li>' +
                    '<li>Haz clic en el enlace generado para descargar e instalar la aplicación</li>' +
                    '</ol>' +
                    '</div>' +
                    '</div>' +
                    '<div class="col-md-6 " >' +
                    '<img style="width: 250px" src="' + realPath + '/assets/img/yape_qr_redirect.svg" alt="QR de yape"> ' +
                    '</div>' +
                    '</div>',
                showCloseButton: true,
                showConfirmButton: false,
                showCancelButton: false,
                footer: '<strong class="font-size-14">Disponible en:</strong><img alt="descarga yape de play store" src="' + realPath + '/assets/img/yape_google_play_icon.svg"><img alt="descarga yape del apple store" src="' + realPath + '/assets/img/yape_apple_icon.svg"><img alt="descarga yape de huawei store " src="' + realPath + '/assets/img/yape_huawei_icon.svg">'
            })
        }
    });
    function detectMob() {
        return ( ( window.innerWidth <= 997 )  );
    }
    function close(){
        $('.window-search').css('display','none');
    }
    function changeUrlMenu(){
        // document.getElementById("descarga_android").src = realPath + "/assets/img/soli-05.svg";
        $('.descarga_android').attr('src',realPath + "/assets/img/soli-05.svg");
        $('.descarga_ios').attr('src',realPath + "/assets/img/soli-02.svg");
        $('.descarga_appgallery').attr('src',realPath + "/assets/img/app-gallery.svg");

        if($(".footer-section").length !=0) {
            document.getElementById("footer-facebook").src = realPath + "/assets/img/ic_social_facebook_b.svg";
            document.getElementById("footer-instagram").src = realPath + "/assets/img/ic_social_instagram_b.svg";
            document.getElementById("footer-youtube").src = realPath + "/assets/img/ic_social_youtube_b.svg";
            document.getElementById("footer-whatsapp").src = realPath + "/assets/img/Contactos.svg";
            document.getElementById("footer-terminos-condiciones").src = realPath + "/assets/img/Conocenos.svg";
            document.getElementById("footer-tiktok").src = realPath + "/assets/img/ic_social_tiktok_b.svg";
            document.getElementById("footer-logo").src = realPath + "/assets/img/Logo_Bolivia_footer.svg";

            document.getElementById("footer-facebook-phone").src = realPath + "/assets/img/ic_social_facebook_b.svg";
            document.getElementById("footer-instagram-phone").src = realPath + "/assets/img/ic_social_instagram_b.svg";
            document.getElementById("footer-youtube-phone").src = realPath + "/assets/img/ic_social_youtube_b.svg";
            document.getElementById("footer-whatsapp-phone").src = realPath + "/assets/img/contactos-phone.svg";
            document.getElementById("footer-terminos-condiciones-phone").src = realPath + "/assets/img/conocenos-phone.svg";
            document.getElementById("footer-tiktok-phone").src = realPath + "/assets/img/ic_social_tiktok_b.svg";
            document.getElementById("footer-logo-phone").src = realPath + "/assets/img/Logo_Bolivia_footer.svg";

            document.getElementById("footer-scrollup").src = realPath + "/assets/img/angle-up-white.svg";
        }
        if($("#header").hasClass("cell") == 0) {
            if ($("#logo-menu-secundary").length == 0) {
                document.getElementById("logo-menu").src = realPath + "/assets/img/Logo_Bolivia_2.svg";
                // document.getElementById("submenu_arrow").src = realPath+"/assets/img/ic_angle_down_r_small-white.svg";
            } else {
                // document.getElementById("submenu_arrow").src = realPath+"/assets/img/ic_angle_down_r_small.svg";
                document.getElementById("logo-menu-secundary").src = realPath + "/assets/img/Logo_Bolivia_3.svg";
            }
        }

        document.getElementById("menu_inicio").href = realPath+"/";
        document.getElementById("inicio_yape").href = realPath+"/";
        // document.getElementById("menu_yape").href = realPath+"/yape/";
        document.getElementById("menu_ayuda").href = realPath+"/centro_de_ayuda/";
        document.getElementById("menu_ayuda_movil").href = realPath+"/centro_de_ayuda/";
        // document.getElementById("menu_billetera").href = realPath+"/billeteramovil/";
        document.getElementById("menu_seguridad").href = realPath+"/seguridad/";
        document.getElementById("menu_promociones").href = realPath+"/yapepromociones/";
        document.getElementById("menu_blog").href = realPath+"/blog/";
        document.getElementById("menu_negocio").href = realPath+"/yapenegocios/";
        // document.getElementById("menu_beneficios").href = realPath+"/beneficios/";



        document.getElementById("submenu-whatsapp-phone").src = realPath+"/assets/img/whatsapp.png";
        // document.getElementById("menu_soli_yape").href = realPath+"/soli-ahora-es-yape/";
        $('.terminos_condiciones').attr('href',realPath+"/contrato-prestacion-servicio.html");
        $('.numero_wpp_soporte').attr('href', 'https://api.whatsapp.com/send?phone=+59172007654&text=%C2%A1Hola!%20Vengo%20de%20la%20web%20y%20necesito%20ayuda,%20por%20favor.%20%F0%9F%91%A8%F0%9F%8F%BB%E2%80%8D%F0%9F%92%BB%F0%9F%91%A9%F0%9F%8F%BB%E2%80%8D%F0%9F%92%BB');

        if($('#swiper-home').length != 0){
            //swiper
            const showcaseSlider = new Swiper(".home-showcaseSlider", {
                speed: 1000,
                slidesPerView: 1,
                parallax: false,
                loop: false,
                watchSlidesVisibility: true,
                centeredSlides: true,
                autoplay: {
                    delay: 30000,
                    disableOnInteraction: false,
                },
                pagination: {
                    el: ".showcaseSlider-pagination",
                    clickable: true,
                },
                navigation: {
                    nextEl: '.showcaseSlider-next',
                    prevEl: '.showcaseSlider-prev',
                },
            });
            // fin swiper
            // segundo swiper

            var swiper = new Swiper(".mySwiper", {
                cssMode: true,
                loop: false,
                slidesPerView: 1,
                speed: 1000,
                autoplay: {
                    delay: 30000,
                    disableOnInteraction: false,
                },
                navigation: {
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev",
                },
                pagination: {
                    el: ".swiper-pagination",
                },
                mousewheel: true,
                keyboard: true,
            });

            // fin segundo swiper
        }
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
            // $('#header-sroll').addClass('small');
            if ($("#header-sroll").length != 0) {
                $('#header-sroll').addClass('small');
            }
            if ($("#header-home").length != 0) {
                $('#header-home').addClass('small');
                $('#title_principal').addClass('space_smart');
            }
            // document.getElementById("submenu_arrow").src = realPath+"/assets/img/ic_angle_down_r_small.svg";
            document.getElementById("logo-menu").src=realPath+"/assets/img/Logo_Bolivia_3.svg";
        }else {
            // $('#header-sroll').removeClass('small');
            if ($("#header-sroll").length != 0) {
                $('#header-sroll').removeClass('small');
            }
            if ($("#header-home").length != 0) {
                $('#header-home').removeClass('small');
                $('#title_principal').addClass('space_smart');
            }
            // document.getElementById("submenu_arrow").src = realPath+"/assets/img/ic_angle_down_r_small-white.svg";
            if ($("#logo-menu-secundary").length != 0) {
                document.getElementById("logo-menu-secundary").src = realPath + "/assets/img/Logo_Bolivia_2.svg";
            }
        }
        windowSize();
    }

    // VERIFY WINDOW SIZE
    function windowSize() {
        size = $(document).width();
        if (size >= 991) {
            $('.button_bottom').css('display','none');
            $('body').removeClass('open-menu');
            $('.hamburger-menu .bar').removeClass('animate');
            $('#inicio').css('display','none');
        }else{
            // document.getElementById("header-sroll").className = "header small cell";
            if ($("#header-sroll").length != 0) {
                $('#header-sroll').addClass('small');
                $('header .desk-menu .menu-container').css('top','60px' );
            }
            if ($("#header-home").length != 0) {
                $('#header-home').addClass('small');
                $('#title_principal').addClass('space_smart');
            }
            // console.log("no esta agregando la clase",realPath+"/assets/img/Logo_Bolivia_3.svg");
            if($("#logo-menu").length != 0) {
                // document.getElementById("submenu_arrow").src = realPath+"/assets/img/ic_angle_down_r_small.svg";
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

    $(document).on('click', '.smart-banner .close', function (event) {
        event.preventDefault();
        var $banner = $('.smart-banner');
        $banner.css('margin-top',0 - $banner.outerHeight())
        $('header').css('margin-top',0 - $banner.outerHeight() );
        $('header .desk-menu .menu-container').css('top','60px' );
        $('.wrap_body').css('top','40px' );
        $('.wrap-banner').css('padding-top','15vh' );
        var $cd_primary_nav = $('#cd-primary-nav');
        $cd_primary_nav.removeClass('main_nav_principal');
        $cd_primary_nav.addClass('main_nav');
        //set cookie
    });

    // $('#cd-primary-nav > li').hover(function() {
    //     $whidt_item = $(this).width();
    //     // console.log("$whidt_item",$whidt_item);
    //     $whidt_item = $whidt_item-8;
    //     // console.log("$whidt_item-8",$whidt_item);
    //     $prevEl = $(this).prev('li');
    //     // console.log("$prevEl",$prevEl);
    //     $preWidth = $(this).prev('li').width();
    //     // console.log("$preWidth",$preWidth);
    //     var pos = $(this).position();
    //     // console.log("pos",pos);
    //     pos = pos.left+4;
    //     // console.log("pos+4",pos);
    //     $('header .desk-menu .menu-container .menu>li.line').css({
    //         width:  $whidt_item,
    //         left: pos,
    //         opacity: 1
    //     });
    // });

    // ANIMATE HAMBURGER MENU
    $('.hamburger-menu').on('click', function() {
        $('.hamburger-menu .bar').toggleClass('animate');
        if($('body').hasClass('open-menu')){
            $('body').removeClass('open-menu');
            $('.button_bottom').css('display','none');
        }else{
            $('body').toggleClass('open-menu');
            $('.button_bottom').css('display','flex');
        }
    });
    //
    // $('header .desk-menu .menu-container .menu .menu-item-has-children ul').each(function(index) {
    //     if($(".back").length == 0) {
    //         $(this).append('<li class="back"><a href="#">Volver</a></li>');
    //     }
    // });
// CLICK FUNCTION BACK MENU RESPONSIVE
    let flag_submenu = 0;
    // RESPONSIVE MENU NAVIGATION
    $('header .desk-menu .menu-container .menu .menu-item-has-children .back').on('click', function(e) {
        e.preventDefault();
        if(size <= 991) {
            if (flag_submenu == 1) {
                document.getElementById('sub-menu').style.display = "none";
                $("#submenu_arrow").removeClass('fill_arrow');
                document.getElementById('submenu_arrow').style.transform = "rotate(0deg)";
                flag_submenu=0;
            }else{
                document.getElementById('sub-menu').style.display = "block";
                $("#submenu_arrow").addClass('fill_arrow');
                document.getElementById('submenu_arrow').style.transform = "rotate(180deg)";
                flag_submenu=1;

            }
        }
        // console.log("estado",flag_submenu);
        // $('#sub-menu').removeClass('open-sub');
    });

    // $('header .desk-menu .menu-container .menu .menu-item-has-children .back').on('click', function(e) {
    //     e.preventDefault();
    //     if(size <= 991){
    //         console.log("mostrar",flag_submenu);
    //         if(flag_submenu == 0){
    //             // $(this).next('ul').addClass('open-sub');
    //
    //         }
    //     }
    // });

    $('body .over-menu').on('click', function() {
        $('body').removeClass('open-menu');
        $('.bar').removeClass('animate');
    });

    $(document).ready(function(){
        windowSize();
        // setNavigation();
        // cambiarMensajeSegunPantalla();

        // $('select#country_page').change(function(){
        //     window.location = $(this).val();
        // });
    });

    $(window).scroll(function(){
        if($("#logo-menu-secundary").length == 0) {
            smallerMenu();
        }
    });

    $(window).resize(function(){
        windowSize();
    });

    // let div = document.querySelector("#submenu");
    //
    // div.addEventListener("click", (e)=>{
    //     var event = new Event('touch');
    //     e.target.dispatchEvent(event)
    // });
    function setNavigation() {
        let flag = 0;
        var path = window.location.pathname;
        path = decodeURIComponent(path);
        path = path.replace(/\//g, '');
        size = $(document).width();

        $("nav a").each(function () {
            var href = $(this).attr('href');
            var strArray = href.split("/");
            var delete_element = strArray.shift();
            strArray = strArray.filter((a) => a);
            if ((strArray.indexOf(path) > -1)) {
                $(this).closest('li').addClass('active');
                if($(this).closest('a').hasClass("question_button")){
                    $(this).closest('li').removeClass('active');
                }
            } else {
                if($(".pagina_principal").length!=0){
                    $("#inicio").addClass('active');
                }
                $(this).closest('li').removeClass('active');
            }
        });
        if (size <= 991) {
            if (document.getElementById("submenu").getElementsByClassName("active").length) {
                // console.log("hay un elemento activo dentro del submenu")
                document.getElementById('sub-menu').style.display = "block";
                // $("#submenu_arrow").addClass('fill_arrow');
                document.getElementById('submenu_arrow').style.transform = "rotate(180deg)";
                flag_submenu=1;
            }
        }
    }
    function cambiarMensajeSegunPantalla(){
        // $.get("https://ipinfo.io/?token=719fc6762c190c", function (response) {
            // $("#ip").html("IP: " + response.ip);
            // $("#address").html("pais: " + response.country);
            // $("#details").html(JSON.stringify(response, null, 4));
            // if(response.country=="PE") {
                if( window.innerWidth <= 997 ){
                    document.getElementById('text-flag').innerHTML = "Estás en el sitio web de Yape Bolivia.";
                }else {
                    document.getElementById('text-flag').innerHTML = "Estás en el sitio web de Yape Bolivia. Elige tu país o región para ver el contenido sobre tu ubicación."
                }
                // $("#button-flag").html("<a href=\"https://www.yape.com.pe/\"><span class=\"flag-icon flag-icon-pe me-1\"></span> <span>Perú</span></a>");
            // }
        // }, "jsonp");
    }



})(jQuery);
