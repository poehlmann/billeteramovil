$(document).ready(function() {

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
    if (!sessionStorage.getItem("popup")) {
        if(realPath+"/" == curWwwPath || realPath+"/index.html" == curWwwPath) {
            Swal.fire({
                    width: "70vh",
                    padding: 0,
                    html: '<img width="647" height="400" style=" width: -webkit-fill-available;max-width: 100%" src="' + realPath + '/assets/img/soli-yape.svg" alt="QR de yape" placeholder="blur"> ',
                    showCloseButton: true,
                    showConfirmButton: false,
                    showCancelButton: false,
                    // footer: '<strong class="font-size-14">Disponible en:</strong><img src="' + realPath + '/assets/img/yape_google_play_icon.svg"><img src="' + realPath + '/assets/img/yape_apple_icon.svg"><img src="' + realPath + '/assets/img/yape_huawei_icon.svg">'
            })
        }
        sessionStorage.setItem("popup", 'viewed');
    }

    if(window.location.href.indexOf('#puntos-yape') != -1) {
        $("#puntos-yape").modal();
    }

    // if ('serviceWorker' in navigator) {
    //     window.addEventListener('load', function() {
    //         navigator.serviceWorker.register('./sw.js?'+Math.random()+'')
    //     });
    // }
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
            // console.log(window.navigator.geolocation);

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
