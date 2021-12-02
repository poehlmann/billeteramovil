//  JQUERY SEARCH FILTER - Credits: //codepen.io/alexerlandsson/pen/ZbyRoO
// --------------------------
// 1) Add [data-search] to search input
// 2) Add [data-filter-item] to the items that should be filtered
// 3) Add [data-filter-name="SEARCH TERM"] to the filter-items (lowercase)

$('[data-search]').on('keyup', function () {
    var searchVal = $(this).val();
    console.log("search",searchVal);
    var filterItems = $('[data-filter-item]');
    console.log("items",filterItems);
    if (searchVal != '') {
        filterItems.addClass('hidden');
        $('[data-filter-item][data-filter-name*="' + searchVal.toLowerCase() + '"]').removeClass('hidden');
    } else {
        filterItems.removeClass('hidden');
    }
});

// $("button.btn-link").click(function(e,i){
//     if(i){
//         var hash = i.ancora ? i.hash : i;
//     }else{
//         var hash = this.href.match(/#.+/)[0];
//     }
//
//     $(hash + '.collapse').collapse('show');
//
//     if(i) hash = i.ancora || hash;
//
//     $('html, body').animate({ scrollTop: $(hash).offset().top - 200 }, 500);
// });
//
// $(document).ready(function(){
//     var hash = location.hash;
//     var params = hash;
//     if(!$(hash).hasClass('collapse')){
//         hash = "#"+$(hash).closest(".collapse").attr("id");
//         params = {hash: "#"+$(hash).closest(".collapse").attr("id"), ancora: params};
//     }
//     if(hash) $("button.btn-link[href$='"+hash+"']").trigger("click", params);
// });
$(document).ready(function() {
    jQuery(function () {
        var url = window.location.href;
        var element="";
        if (document.querySelector('#faq-tabs a.active') !== null) {
            document.querySelector('#faq-tabs a.active').classList.remove('active');
        }
        jQuery("#faq-tabs a").each(function (index,value) {
            if (url == (this.href)) {
                jQuery(this).addClass("active");
                element= value.attributes.href.value;
            }
        });

        if (document.querySelector('#faq-tab-content .tab-pane.active') !== null) {
            document.querySelector('#faq-tab-content .tab-pane.active').classList.remove('active');
        }
        jQuery("#faq-tab-content .tab-pane").each(function (index,value) {
            if (element == ("#"+(value.id))) {
                jQuery(this).addClass("active");
            }
        });
    });

    jQuery(function () {
        var link = jQuery("#faq-tabs a");
        link.on("click", function () {
            var $this = jQuery(this);
            var href = $this.href;
            jQuery("a .nav-link").removeClass().addClass(href);
            link.removeClass("active");
            if (document.querySelector('#faq-tabs a.active') !== null) {
                document.querySelector('#faq-tabs a.active').classList.remove('active');
            }
            jQuery(this).closest("a").addClass("active");
        })
    });
});
$(document).ready(function () {
    window.scrollTo(0,0);
});
