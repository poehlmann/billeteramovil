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
            'Cantidad maxima: Hasta 2 entradas<br>\n' +
            'Cines habilitados: Prime Cinema, Hupermall - Cochabamba<br>\n' +
            'Días de promoción: (Lun a dom todo el día)<br>\n' +
            'Películas habilitadas: Sólo películas 2D'+
            'Compras: Solo en cajas de Prime Cinemas',
        showCloseButton: true,
        showCancelButton: false,
        focusConfirm: true,
        confirmButtonText: 'Genial!'
    })
});
