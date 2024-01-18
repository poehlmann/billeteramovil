// $(window).on('load',function(){
//     (function () {
//         const second = 1000,
//             minute = second * 60,
//             hour = minute * 60,
//             day = hour * 24;
//
//         //I'm adding this section so I don't have to keep updating this pen every year :-)
//         //remove this if you don't need it
//         let today = new Date(),
//             dd = String(today.getDate()).padStart(2, "0"),
//             mm = String(today.getMonth() + 1).padStart(2, "0"),
//             yyyy = today.getFullYear(),
//             nextYear = yyyy + 1,
//             dayMonth = "08/11/",
//             dia_inauguracion = dayMonth + yyyy;
//             today = mm + "/" + dd + "/" + yyyy;
//
//         if (today < dia_inauguracion) {
//             dia_inauguracion = dayMonth + nextYear;
//         }
//         //end
//         const countDown = new Date(dia_inauguracion).getTime(),
//             x = setInterval(function() {
//                 const now = new Date().getTime(),
//                     distance = countDown - now;
//                 //do something later when date is reached
//                 if (distance > 0) {
//                     window.location.href = 'temporizador.html';
//                     clearInterval(x);
//                 }
//                 //seconds
//             }, 0)
//     }());
// });


$('#input-search').on('click', function(){

});

if($("#search_button").length != 0) {

}
$(document).ready(function() {
    // https://swiperjs.com/
// ===================== -->


    // var d1=new Date(); //yyyy-mm-dd hh:mm:ss
    // var d2=new Date("2023-08-15, 10:00:00"); //yyyy-mm-dd hh:mm:ss
    // if(d1>d2)
    // {
    //     console.log("redireccionar");
    // }else{
    //     console.log("todavia");
    // }
    // fetch('http://reqres.in/api/users')
    //     .then(resp=> resp.json())
    //     .then(respObj=>{
    //         console.log(respObj);
    //     });
    //
    // $('.scroll_top').on('click', function(e){
    //     e.preventDefault()
    //
    //     $('html, body').animate({
    //         scrollTop : $(this.hash).offset().top
    //     }, 1500);
    // });

    // let today = new Date(),
    //     dd = String(today.getDate()).padStart(2, "0"),
    //     mm = String(today.getMonth() + 1).padStart(2, "0"),
    //     yyyy = today.getFullYear(),
    //     nextYear = yyyy + 1,
    //     dayMonth = "08/11/",
    //     dia_inauguracion = dayMonth + yyyy;
    // today = mm + "/" + dd + "/" + yyyy;
    // console.log("today",today);
    // if(today == "08/11/2023"){
    //     let curWwwPath2=window.document.location.href;
    //     if(curWwwPath2.includes("https://www.solipagosbcp.com.bo/")){
    //         window.location.href = "https://www.yape.com.bo/";
    //     }
    // }else{
    //     console.log("no")
    // }

    let curWwwPath=window.document.location.href;
    let pathName=window.document.location.pathname;
    let pos=curWwwPath.indexOf(pathName);
    let localhostPaht=curWwwPath.substring(0,pos);
    let projectName=pathName.substring(0,pathName.substring(1).indexOf('/')+1);
    let realPath=localhostPaht+projectName;
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
    // if ($("#formulario_negocio").length != 0) {
    //     const escapeHTMLPolicy = trustedTypes.createPolicy("myEscapePolicy", {
    //         createHTML: (string) => string.replace(/>/g, "<"),
    //     });
    //
    //     let el = document.getElementById("formulario_negocio");
    //     const escaped = escapeHTMLPolicy.createHTML('<iframe src="https://forms.office.com/pages/responsepage.aspx?id=zOuTXWn3gEOLfiifyXLaG-mQZqnMoy1KnHWPJOl6AutUNTVXQTEwWkxKN0VSTkw4V0o3WkdCWUlCSCQlQCN0PWcu&amp;embed=true" width="640" height="1780" frameborder="0" marginheight="0" marginwidth="0" style="overflow: hidden; border: none; max-width: 100%; max-height: 100vh; height: 1300px !important;" allowfullscreen="" webkitallowfullscreen="" mozallowfullscreen="" msallowfullscreen="" scrolling="no">Cargando…</iframe>');
    //     console.log(escaped instanceof TrustedHTML); // true
    //     el.innerHTML = escaped;
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
    function getposition()
    {
        if (window.navigator.geolocation) {
            console.log(window.navigator.geolocation);

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
}


//temporizador

