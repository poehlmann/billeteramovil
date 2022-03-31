filterSelection("all");

function filterSelection(para) {
    console.log("para",para);
    var card = document.getElementsByClassName("imgDiv");
    if (para == "all") {
        para = "";
        $('.map_prime').addClass('hidden');
        $('.map_ketal').addClass('hidden');
    }else if(para == "lp"){
        $('.map_prime').removeClass('show');
        $('.map_prime').addClass('hidden');
        $('.map_ketal').removeClass('hidden');
        $('.map_ketal').addClass('show');

    }else if(para == "cbba"){
        $('.map_ketal').removeClass('show');
        $('.map_ketal').addClass('hidden');
        $('.map_prime').removeClass('hidden');
        $('.map_prime').addClass('show');
    }
    //     cards.forEach((card) => {
    //       card.classList.remove("show");

    //       if (card.classList.contains(para)) {
    //         setTimeout(function () {
    //           card.classList.add("show");
    //         }, 100);
    //       }
    //     });
    //

    for (let i = 0; i < card.length; i++) {
        removeClass(card[i], "show");
        if (card[i].className.indexOf(para) > -1) {
            addClass(card[i], "show");
        }
    }
}

function addClass(elem, clname) {
    var el = elem.className.split(" ");
    var cl = clname.split(" ");

    for (let j = 0; j < cl.length; j++) {
        if (el.indexOf(cl[j]) == -1) {
            elem.className += " " + cl;
        }
    }
}

function removeClass(elem, clname) {
    var el = elem.className.split(" ");
    var cl = clname.split(" ");

    for (let j = 0; j < cl.length; j++) {
        while (el.indexOf(cl[j]) > -1) {
            el.splice(el.indexOf(cl[j], 1));
        }
    }
    elem.className = el.join(" ");
}

function showText(toggleText) {
    toggleText.classList.toggle("active");
}

$('.button_filter').click(function(){
    $('.button_filter').removeClass('active');
    $(this).addClass('active');
})

$('.ketal_detail').click(function() {
    Swal.fire({
        title: '<strong>Paga menos con Soli en Ketal</strong>',
        icon: 'info',
        html:
            'Beneficio: descuento del 5%<br>\n' +
            'Monto máximo de descuento: Bs 1.000<br>\n' +
            'Supermercados habilitados: 1.\tIrpavi: Av. Rafael Pabón mega Center P.B. (Atención al Cliente)\n' +
            '2.\tArce: Av. Arce esq. Macario Pinilla. (Atención al Cliente)\n' +
            '3.\tAchumani: Av. Alexander entre las calles 14 y 15 N+ 108. (Atención al Cliente)\n' +
            '4.\tMiraflores: Av. Busch esq. Villalobos. (Atcnci6n a\\ Cliente)\n' +
            '5.\tCalacoto: Av. Ballivián esq. Calle 15. (Atención al Cliente)\n' +
            '6.\tSan Pedro: Almirante Grau N° 329. (Atención al Cliente)\n' +
            '7.\tObrajes. Calle 16 de Obrajes esq. 14 de septiembre № 460. (Express)\n' +
            '8.\tEstación Central: Final Teleférico Línea Naranja. (Express)\n' +
            '9.\tPlaza España: Plaza España esq. Méndez Artos. (Express)\n' +
            '10.\tSatélite: Av. Panorámica Ed. Teleférico Amarillo P.B. (Express)\n' +
            '11.\tSan Miguel: Calle 21 de Calacoto esq. Av. Montenegro. (Express)\n' +
            '12.\tFaro Murillo: Teleférico Morado Pza. Palenque P.B. (Express)<br>\n' +
            'Días de promoción: (Lun a dom)<br>',
        showCloseButton: true,
        showCancelButton: false,
        focusConfirm: true,
        confirmButtonText: 'Genial!'
    })
});
$('.prime_detail').click(function() {
    Swal.fire({
        title: '<strong> Martes 2X1 con Soli en Prime Cinemas</strong>',
        icon: 'info',
        html:
            'Beneficio: Entradas 2X1<br>\n' +
            'Cantidad maxima: Puedes acceder hasta dos promos 2x1 por Soli<br>\n' +
            'Cines habilitados: Prime Cinema (Hupermall - Cochabamba)<br>\n' +
            'Días de promoción: Todos los días martes<br>\n' +
            'Películas habilitadas: Sólo películas 2D<br>\n'+
            'Compras: Solo en cajas de Prime Cinemas',
        showCloseButton: true,
        showCancelButton: false,
        focusConfirm: true,
        confirmButtonText: 'Genial!'
    })
});
$('.entel_detail').click(function() {
    Swal.fire({
        title: '<strong> Soli ilimitado con Entel</strong>',
        icon: 'info',
        html:
            '<div class="text-align-left"><strong>Beneficio:</strong>\n' +
            'Para acceder al beneficio, se deberá activar los datos móviles correspondientes a la línea Entel en su teléfono celular (dispositivo móvil), entrar a la aplicación SOLI, una vez que este entre en la aplicación, el consumo de MB que demande la aplicación no será cobrada o debitada de la línea afiliada, dando un uso libre a todas las funcionalidades que tiene la aplicación.' +
            '<br><br><strong>Requisitos de participación:</strong><br><br>' +
            '<ul>' +
            '<li>Ser cliente activo de la empresa de telecomunicación ENTEL, para el servicio de telefonía celular en su modalidad pre-pago o post-pago.</li>\n' +
            '<li>Ser afiliado o afiliarse a la billetera móvil “Soli”, la billetera móvil deberá estar necesariamente vinculada al dispositivo móvil registrado para el servicio de telefonía celular prestado por ENTEL.\n</li>' +
            '</ul>\n' +
            '<br><strong>Restricciones: </strong>\n' +
            'En caso de que el servicio de telefonía celular prestado en favor del cliente y que este vinculado con la billetera móvil, se encuentre bloqueado, cancelado o no operativo por cualquier razón el participante quedará automáticamente fuera de la promoción.\n' +
            'Se aclara que en caso de que la persona y/o línea se desafilien de la billetera móvil Soli Pagos BCP,  el participante quedará automáticamente excluido de la promoción.\n<br>' +
            '<br><strong>Duración:</strong> Del 24 de marzo del 2022 al 23 de junio del 2022</div>',
        showCloseButton: true,
        showCancelButton: false,
        focusConfirm: true,
        confirmButtonText: 'Genial!'
    })
});
