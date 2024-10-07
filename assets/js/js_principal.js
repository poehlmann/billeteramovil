$(document).ready(function() {
    let curWwwPath=window.document.location.href;
    let pathName=window.document.location.pathname;
    let pos=curWwwPath.indexOf(pathName);
    //
    // Swal.fire({
    //     width: "54vh",
    //     padding: 32,
    //     html: `<img  style=" width: -webkit-fill-available;" src="https://www.yape.com.bo/assets/img/not-found.svg" alt="QR de yape" placeholder="blur">
    //                         <div class="yape-texto-purpura font-size-24 mt-16 mb-20" style="font-family: Roboto-Regular">Yaper@, estamos presentando lentitud en nuestra aplicación. Nos encontramos trabajando para solucionarlo</div>
    //                         `,
    //     confirmButtonColor: "#10CBB4",
    //     confirmButtonText: `De acuerdo`,
    //     showConfirmButton: true,
    //     backdrop:true,
    // })
    // if (!sessionStorage.getItem("popup")) {
        if("https://www.yape.com.bo/" == curWwwPath || "https://www.yape.com.bo/index.html"== curWwwPath || "http://127.0.0.1:5500/" == curWwwPath) {
            Swal.fire({
                    width: "54vh",
                    padding: 32,
                    html: `<img width="80" height="80" style=" width: -webkit-fill-available; max-width: 80px" src="../assets/img/Flag_Bol.png" alt="QR de yape" placeholder="blur"> 
                            <div class="yape-texto-purpura font-size-24 mt-16" style="font-family: Roboto-Bold">Estás en Yape Bolivia</div>
                            <div class="font-size-16 mt-16" style="width: -webkit-fill-available;font-family: Roboto-Regular">Hemos detectado que estás accediendo a nuestro sitio web de Bolivia.</div>`,
                    showCloseButton: false,
                    confirmButtonColor: "#10CBB4",
                    showConfirmButton: true,
                    showCancelButton: true,
                    backdrop:true,
                    allowOutsideClick:false,
                    allowEscapeKey:false,
                    allowEnterKey:false,
                    confirmButtonText: 'Ir a Yape Perú',
                    cancelButtonText:"Seguir en Yape Bolivia",
                    customClass: {
                        confirmButton: 'bta_cta_popup',
                        cancelButton: 'bta_back_white_popup',
                    }
            }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    window.location.replace("https://www.yape.com.pe/");
                }
            })
        }
        // sessionStorage.setItem("popup", 'viewed');
    // }

    if(window.location.href.indexOf('#puntos-yape') != -1) {
        $("#puntos-yape").modal();
    }

    // if ('serviceWorker' in navigator) {
    //     window.addEventListener('load', function() {
    //         navigator.serviceWorker.register('../sw.js?'+Math.random()+'')
    //     });
    // }

});
if(/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream){
    document.querySelector('meta[name=viewport]')
        .setAttribute(
            'content',
            'initial-scale=1.0001, minimum-scale=1.0001, maximum-scale=1.0001, user-scalable=no'
        );
    $('.input-search').css('margin-top', '15px');
}else{
    if(/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream){
        $('.input-search').css('top', '130%');
    }
    if (/(MacIntel)|(Win32)|(Linux x86_64")|(Linux armv81)/.test(navigator.userAgent)) {
        $('.input-search').css('top', '180%');
    }
    // console.log("navigator.platform",navigator.platform);
}
$('.checkbox-resp-no input').on('change', function() {
    // alert($('input[name=radio_response_no]:checked', '.checkbox-resp-no').val());
    if($('input[name=radio_response_no]:checked', '.checkbox-resp-no').val()=="Otra razón"){
        $(".other_option_response_no").css("display","block");
    }else{
        $(".other_option_response_no").css("display","none");
    }
});
function saliendo_de_la_app(){
    Swal.fire({
        width: "54vh",
        padding: "0 32px",
        html: ` 
              <div class="yape-texto-purpura font-size-24 mt-16" style="font-family: Roboto-Bold">Estás saliendo de nuestra app</div>
              <div class="font-size-16 mt-16" style="width: -webkit-fill-available;font-family: Roboto-Regular">Estás saliendo hacia una app externa ¿Deseas continuar?</div>
              `,
        showCloseButton: false,
        confirmButtonColor: "#10CBB4",
        showConfirmButton: true,
        showCancelButton: true,
        backdrop:true,
        allowOutsideClick:false,
        allowEscapeKey:false,
        allowEnterKey:false,
        confirmButtonText: 'CONTINUAR',
        cancelButtonText:"VOLVER",
        customClass: {
            confirmButton: 'bta_cta_wpp_popup',
            cancelButton: 'bta_back_white_wpp_popup',
        }
    }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            window.location.replace("https://api.whatsapp.com/send?phone=59172007654&text=Hola%2C+vengo+de+la+app%2C+Cambie+de+telefono+no+puedo+acceder+a+Yape");
        }
    })
}
function lo_mas_buscado_principal(href) {
    // console.log("href",href);
    location.href = href;
    // location.reload();
    var tabnum = location.href.split("#").slice(-1)[0];
    $(' .panel-collapse.in').collapse('hide');
    $('body').css('overflow-y', 'visible');
    if (window.location.href.indexOf("#") > -1) {
        if (tabnum != "") {
            const element = document.getElementById(tabnum);
            $('#' + tabnum).addClass('in');
            // console.log("tabnum", tabnum);
            if (window.innerWidth >= 993) {
                $('html, body').animate({
                    scrollTop: $("#" + tabnum).offset().top - 150
                }, 0);
            } else {
                if (window.location.href.indexOf("centro_de_ayuda_webview") == 0) {
                    $('html, body').animate({
                        scrollTop: $("#" + tabnum).offset().top - 100
                    }, 0);
                } else {
                    $('html, body').animate({
                        scrollTop: $("#" + tabnum).offset().top - 150
                    }, 0);
                }
            }
            var tab_link = document.querySelectorAll("a[href='#" + tabnum + "']");
            var tab = tab_link[0];
            tab.classList.remove("collapsed");
            document.getElementById('window-search').style.display = 'none'
        }
    }
}
function countChar(val) {
    var len = val.value.length;
    if(len==0){
        $(".pf_si_fin").addClass('disabled');
    }else{
        $(".pf_si_fin").removeClass('disabled');
    }
    $(val).next().html(300-len +" / 300");
}
function countChar2(val) {
    var len = val.value.length;
    if(len==0){
        $(".pf_no_fin").addClass('disabled');
    }else{
        $(".pf_no_fin").removeClass('disabled');
    }
    $(val).next().html(100-len +" / 100");
}
function countChar3(val) {
    var len = val.value.length;
    if(len==0){
        $(".pf_no_fin").addClass('disabled');
    }else{
        $(".pf_no_fin").removeClass('disabled');
    }
    $(val).next().html(300-len +" / 300");
}
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

function getposition(url,id)
{
    if (window.navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
        function successCallback(datos) {
            // console.log(datos);
            var YOUR_LAT = datos.coords.latitude;
            var YOUR_LON = datos.coords.longitude
            var iframe_agentes = document.createElement('iframe');
            iframe_agentes.width = "100%";
            iframe_agentes.height = "400px";
            iframe_agentes.setAttribute("src", url+'&ll=' + YOUR_LAT + '%2C' + YOUR_LON + '&z=13');
            document.getElementById(id).appendChild(iframe_agentes);

        }
        function errorCallback(error) {
            var iframe_agentes = document.createElement('iframe');
            iframe_agentes.width = "100%";
            iframe_agentes.height = "400px";
            iframe_agentes.setAttribute("src", url);
            document.getElementById(id).appendChild(iframe_agentes);
        }
    }
}
// mapa con agentes y cajeros
function mapa_agentes_cajeros() {
    if ($("#agentes_atm_bcp").length != 0) {
        getposition("https://www.google.com/maps/d/embed?mid=1w7mjA8BTGvV6lEb2X0ZXttE41tGt9_E&ehbc=2E312F&noprof=1", "agentes_atm_bcp");
    }
}

//mapa con agentes
function mapa_agentes() {
    if ($("#agentes_bcp").length != 0) {
        getposition("https://www.google.com/maps/d/embed?mid=19z1ANkjUJ9m6HtkCX2DZxwEF4m_JVfY&ehbc=2E312F&noprof=1", "agentes_bcp");
    }
}

//mapas con cajeros
function mapa_cajeros() {
    if ($("#atm_bcp").length != 0) {
        getposition("https://www.google.com/maps/d/embed?mid=1Asn6iQzNJpchez2rm6limbmQZ3QSKc8&ehbc=2E312F&noprof=1", "atm_bcp");
    }
}

