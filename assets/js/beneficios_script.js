filterSelection("all");

function filterSelection(para) {
    console.log("para",para);
    var card = document.getElementsByClassName("imgDiv");
    if (para == "all") {
        para = "";
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

$('.chavez_detail').click(function() {
    Swal.fire({
        title: '<strong>Soli beneficio en Farmacias Chávez</strong>',
        icon: 'info',
        html:
            '<div class="text-align-left"><strong>Beneficio:</strong>\n' +
            'Descuento del 7% Aplicable sobre el monto total del consumo, válido en la compra de medicamentos y sucedáneos.' +
            '<br><br><strong>Requisitos de participación:</strong><br><br>' +
            '<ul>' +
            '<li>Si eres usuario nuevo en Soli y hacer uso de la tarjeta de descuento deberás esperar hasta 10 días hábiles desde la fecha de afiliación a la billetera móvil.</li>\n' +
            '<li>Para acceder al descuento es obligación del participante presentar su documento de identidad en el momento de hacer el pago de su consumo.\n</li>' +
            '<ul><li>Atención remota vía WhatsApp a los números:.\n</li>' +
            '<li>591 69203074.\n</li>' +
            '<li>591 69203075.\n</li>' +
            '<li>Modalidad de acceso: Presencial y Remota.\n</li>' +
            '</ul>\n' +
            '</ul>\n' +
            '<br><strong>Restricciones: </strong>\n<br>' +
            'solo los días viernes.\n<br>' +
            'Solo para dispositivos con sistema operativo Android.\n<br>' +
            'Sólo podrán participar aquellos que cuenten con documento de identidad vigente.\n<br>' +
            'Se excluyen las fórmulas infantiles, pañales y productos oncológicos los días viernes.\n<br>' +
            'No acumulable en otras ofertas y promociones en Farmacias Chávez.\n<br>' +
            'El descuento es intransferible a terceras personas.\n<br>' +


            '<br><strong>Duración:</strong> Del 13 de mayo del 2022 al 26 de agosto de 2022.</div>',
        showCloseButton: true,
        showCancelButton: false,
        focusConfirm: true,
        confirmButtonText: 'Genial!'
    })
});

$('.tia_detail').click(function() {
    Swal.fire({
        title: '<strong> Supermercados Tía</strong>',
        html:
            '<div class="text-align-left"><strong>Beneficio:</strong>\n' +
            'Para acceder al beneficio primeramente debes contar con el dinero de tu compra en Soli, aproxímate a las cajas y muestra tu cupón desde la seccion "Canjea ahora", presenta tu carnet de identidad y ¡listo! Así de fácil' +
            '<br><br><strong>Requisitos de participación:</strong><br><br>' +
            '<ul>' +
            '<li>Ser afiliado o afiliarse a la billetera móvil “Soli”.\n</li>' +
            '<li>Contar con su carnet de identidad</li>'+
            '<li>Tener saldo suficiente para su compra con Soli</li>'+
            '</ul>\n' +
            '<br><strong>Duración:</strong> Del 27 de Abril del 2022 al 31 de julio del 2022</div>',
        showCloseButton: true,
        showCancelButton: false,
        focusConfirm: true,
        confirmButtonText: 'Genial!'
    })
});

$('#cinemas_prime_ubicacion').click(function(){
    Swal.fire({
        title: '<strong>Ubicaciones de Cinemas Prime</strong>',
        html:
            '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13569.38685236641!2d-66.1539595827821!3d-17.374292398234008!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x93e3741a5339497f%3A0x993746e7d464e6bf!2sPrime%20Cinemas!5e0!3m2!1ses!2sbo!4v1646350155931!5m2!1ses!2sbo" width="1700" height="450" style="border:0;" allowfullscreen="" loading="lazy"></iframe>',
        showCloseButton: true,
        showCancelButton: false,
        focusConfirm: true,
        confirmButtonText: 'Genial!'
    })

})

$('#supermercado_tia_ubicacion').click(function(){
    Swal.fire({
        title: '<strong>Ubicaciones de Supermercados Tía</strong>',
        html:
            '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30394.824127670945!2d-63.17381028777671!3d-17.7750986802404!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x93f1e9005ae600ed%3A0x7ed50636df318d48!2sSupermercado%20T%C3%ADa!5e0!3m2!1ses!2sbo!4v1651241342404!5m2!1ses!2sbo" width="1700" height="450" style="border:0;" allowfullscreen="" loading="lazy"></iframe>',
        showCloseButton: true,
        showCancelButton: false,
        focusConfirm: true,
        confirmButtonText: 'Genial!'
    })

})
