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

    if ('serviceWorker' in navigator) {
        window.addEventListener('load', function() {
            navigator.serviceWorker.register('../sw.js?'+Math.random()+'')
        });
    }
    // const registerServiceWorker = async () => {
    //     if ("serviceWorker" in navigator) {
    //         try {
    //             const registration = await navigator.serviceWorker.register('../sw.js?'+Math.random(), {
    //                 scope: "/",
    //             });
    //             if (registration.installing) {
    //                 console.log("Instalando el Service worker");
    //             } else if (registration.waiting) {
    //                 console.log("Service worker instalado");
    //             } else if (registration.active) {
    //                 console.log("Service worker activo");
    //             }
    //         } catch (error) {
    //             console.error(`Falló el registro con el ${error}`);
    //         }
    //     }
    // };
    // registerServiceWorker();

});
$('.checkbox-resp-no input').on('change', function() {
    // alert($('input[name=radio_response_no]:checked', '.checkbox-resp-no').val());
    if($('input[name=radio_response_no]:checked', '.checkbox-resp-no').val()=="Otra razón"){
        $(".other_option_response_no").css("display","block");
    }else{
        $(".other_option_response_no").css("display","none");
    }
});
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

