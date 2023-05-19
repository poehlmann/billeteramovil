//VIDEOs - INICIO

// $(document).ready(function(){
//     function toggle_video_modal() {
//         $(".js-trigger-video-modal").on("click", function(e){
//             e.preventDefault();
//             var id = $(this).attr('data-youtube-id');
//             var autoplay = '?autoplay=1';
//             var related_no = '&rel=0';
//             var src = '//player.vimeo.com/video/'+id+autoplay+related_no;
//             $("#youtube").attr('src', src);
//             $("body").addClass("show-video-modal noscroll");
//         });
//         // Close and Reset the Video Modal
//         function close_video_modal() {
//             event.preventDefault();
//             $("body").removeClass("show-video-modal noscroll");
//             $("#youtube").attr('src', '');
//         }
//         $('body').on('click', '.close-video-modal, .video-modal .overlay', function(event) {
//             close_video_modal();
//         });
//         $('body').keyup(function(e) {
//             if (e.keyCode == 27) {
//                 close_video_modal();
//             }
//         });
//     }
//     toggle_video_modal();
// });
//VIDEOS - FIN

//animation phone
$(document).ready(function() {
    if( document.getElementById("owl-demo") !==null) {
        var owl = $("#owl-demo");
        owl.owlCarousel({
            items: 1,
            singleItem: true,
            loop: true,
            autoplay: true,
            autoPlay: 5000
        })

        $('.phone1').click(function () {
            owl.trigger('to.owl.carousel', 0);
            owl.trigger('stop.owl.autoplay');
            if (document.querySelector('.section-functions a.active_selection_phone') !== null) {
                document.querySelector('.section-functions a.active_selection_phone').classList.remove('active_selection_phone');
            }
            $(".phone1").addClass("active_selection_phone");
        });
        $('.phone2').click(function () {
            owl.trigger('to.owl.carousel', 1);
            owl.trigger('stop.owl.autoplay');
            if (document.querySelector('.section-functions a.active_selection_phone') !== null) {
                document.querySelector('.section-functions a.active_selection_phone').classList.remove('active_selection_phone');
            }
            $(".phone2").addClass("active_selection_phone");
        });
        $('.phone3').click(function () {
            owl.trigger('to.owl.carousel', 2);
            owl.trigger('stop.owl.autoplay');
            if (document.querySelector('.section-functions a.active_selection_phone') !== null) {
                document.querySelector('.section-functions a.active_selection_phone').classList.remove('active_selection_phone');
            }
            $(".phone3").addClass("active_selection_phone");
        });
        $('.phone4').click(function () {
            owl.trigger('to.owl.carousel', 3);
            owl.trigger('stop.owl.autoplay');
            if (document.querySelector('.section-functions a.active_selection_phone') !== null) {
                document.querySelector('.section-functions a.active_selection_phone').classList.remove('active_selection_phone');
            }
            $(".phone4").addClass("active_selection_phone");
        });
        $('.phone5').click(function () {
            owl.trigger('to.owl.carousel', 4);
            owl.trigger('stop.owl.autoplay');
            if (document.querySelector('.section-functions a.active_selection_phone') !== null) {
                document.querySelector('.section-functions a.active_selection_phone').classList.remove('active_selection_phone');
            }
            $(".phone5").addClass("active_selection_phone");
        });

    }
});
//scroll to element phone just in phone
function scrollFunction() {
    let e = document.getElementById("phone_expo");
    if( navigator.userAgent.match(/Android/i)
        || navigator.userAgent.match(/webOS/i)
        || navigator.userAgent.match(/iPhone/i)
        || navigator.userAgent.match(/iPad/i)
        || navigator.userAgent.match(/iPod/i)
        || navigator.userAgent.match(/BlackBerry/i)
        || navigator.userAgent.match(/Windows Phone/i)){
        e.scrollIntoView({
            block: 'start',
            behavior: 'smooth',
            inline: 'start'
        });
    }
}
//animation phone fin

// $('#cashback_soli').click(function(){
//     valor = document.getElementById("monto_soli").value;
//     if(valor<5){
//
//             Swal.fire({
//                 title: '¡RECUERDA! <br> El monto mínimo de recarga debe ser de 5 Bs',
//                 text: '',
//                 imageUrl: 'https://i.gifer.com/7VE.gif',
//                 imageWidth: 400,
//                 imageHeight: 400,
//                 imageAlt: 'Solicarga regla',
//             })
//     }
//     else{
//         Swal.fire({
//             title: '<div style="font-size:2.5rem;">¡¡¡Soli te devuelve <br><strong style="font-size: xx-large">'+ valor*0.08 +' Bs</strong>!!!</div>',
//             width: 600,
//             padding: '3em',
//             color: '#ffffff',
//             confirmButtonText:'¡Gracias!',
//             background: 'rgba(91,7,143,1)  url(https://i.gifer.com/6ob.gif)',
//             backdrop: `
//             rgba(255, 255, 255, 0)
//             url("https://i.gifer.com/6ob.gif")
//             center left
//             repeat
//           `
//         })
//     }
//
// })

