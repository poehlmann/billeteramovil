filterSelection("all");

function filterSelection(para) {
    var card = document.getElementsByClassName("imgDiv");
    if (para == "all") {
        para = "";
    }else if(para == "lp"){
        $('.map_prime').removeClass('hidden');
        $(this).addClass('show');

        $('.map_ketal').addClass('hidden');

    }else if(para == "cbba"){
        $('.map_ketal').removeClass('hidden');
        $(this).addClass('show');
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

