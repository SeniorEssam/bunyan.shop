"use strict";

/* ========================================================================================
Common Variables
=========================================================================================*/
const breakpointMobileMenu = "(max-width: 1199.98px)";

let isRtl = ($("html").attr("lang") == "ar") ? true : false;

const isTouchDevice = matchMedia("(pointer: coarse)").matches;
if(isTouchDevice) {
    document.body.classList.add("touchDeviceTrue");
} else {
    document.body.classList.add("touchDeviceFalse");
}

/* ========================================================================================
Common Methods
=========================================================================================*/
/* ---------- Get Element Coords ---------- */
function getCoords(elem) {
    let box = elem.getBoundingClientRect();

    let body = document.body;
    let docEl = document.documentElement;

    let scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
    let scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;

    let clientTop = docEl.clientTop || body.clientTop || 0;
    let clientLeft = docEl.clientLeft || body.clientLeft || 0;

    let top = box.top + scrollTop - clientTop;
    let left = box.left + scrollLeft - clientLeft;

    return { 
        top: Math.round(top), 
        left: Math.round(left) 
    };
}

/* ---------- Get Document Height ---------- */
function getDocumentHeight(){
    let body = document.body,
    html = document.documentElement;

    return Math.max( body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight );
}

function fixBrokenContentFlash() {
    $(".fix-broken-content-flash").removeClass("fix-broken-content-flash");
}

/* ========================================================================================
Components
=========================================================================================*/
/* ---------- Productbox ---------- */
function adjustProductbox() {
    let node = $(".productbox");

    if (node.length == 0) {
        return;
    }

    //add class for style horizontal
    // must come before node.each()
    //$(".row-productbox-horizontal").find(".productbox").addClass("productbox-style-horizontal");


    node.each(function () {
        let picWrapper = $(this).find(".pic-wrapper");
        let picWrapperWidth = picWrapper.outerWidth();
        //let productDetailsUrl = $(this).attr("data-product-details-url");

        // Click redirect
        // $(this).find(".prbox-details-wrapper").click(function() {
        //     window.location = productDetailsUrl;
        //     return;
        // });
        
        // tiny productbox
        if ( $(this).outerWidth() < 215 ) {
            $(this).addClass("tiny");
        }

        // image size
        picWrapper.height(picWrapperWidth); // need to upload 500*500 images
        //picWrapper.height(picWrapperWidth * 1.3625); // need to upload 800*1090 images
        //picWrapper.height(picWrapperWidth * 1.767); // need to upload 508*898 images
        //picWrapper.height(picWrapperWidth * 1.5); // need to upload 600*900 images
        //picWrapper.height(picWrapperWidth / 1.5); // need to upload 450*300 images 
        //picWrapper.height(picWrapperWidth / 1.367); // need to upload 700*512 images
        //picWrapper.height(picWrapperWidth / 1.469); // need to upload 1440*980 images

    });//End: .each()

    // refresh on viewmode change on listing page
    // $(".viewmode-icon").click(function() {
    //     setTimeout(function() {
    //         adjustProductbox();
    //     }, 500);
    // });

}

/* ---------- Slick Common for Products ---------- */
function initSlickCommonConfigForProducts() {

    let node = $(".slick-common-config-for-products");

    if( node.hasClass("no-slider-on-touch-device") && isTouchDevice) {
        return;
    }

    if(node.length === 0) {
        return;
    }

    node.each(function () {
        let thisNode = $(this);

        let slideCount = thisNode.find(".each-item").length;

        thisNode.slick({
            rtl: isRtl,
            arrows: true,
            dots: false,
            autoplay: false,
            speed: 300,
            variableWidth: false,
            centerMode: false,
            infinite: false,
            slidesToShow: (slideCount > 5) ? 5 : slideCount,
            slidesToScroll: 2,
            responsive: [
                {
                    breakpoint: 1400,
                    settings: {
                        slidesToShow: (slideCount > 5) ? 5 : slideCount
                    }
                },
                {
                    breakpoint: 1199,
                    settings: {
                        slidesToShow: (slideCount > 4) ? 4 : slideCount,
                    }
                },
                {
                    breakpoint: 991,
                    settings: {
                        slidesToShow: (slideCount > 2) ? 2.5 : slideCount,
                    }
                },
                {
                    breakpoint: 767,
                    settings: {
                        slidesToShow: (slideCount > 1) ? 1.5 : slideCount,
                        slidesToScroll: 1
                    }
                }
            ]
        });

    }); //End: node.each()

}


/* ---------- image upload custom, with preview --------- */
function imageUploadWithPreview() {
    let node = $(".img-upload-custom");

    if( node.length < 1 ){
        return;
    }

    node.each(function () {
    
        var $file = $(this),
            $label = $file.next('label'),
            $labelText = $label.find('span'),
            labelDefault = $labelText.text();
    
        $file.on('change', function (event) {
            var fileName = $file.val().split('\\').pop(),
                tmppath = URL.createObjectURL(event.target.files[0]);
            if (fileName) {
                $label
                    .addClass('file-ok')
                    .css('background-image', 'url(' + tmppath + ')');
                $labelText.text(fileName);
            } else {
                $label.removeClass('file-ok');
                $labelText.text(labelDefault);
            }
        });
    
    });
}

/* ========================================================================================
Header
=========================================================================================*/
function initMenu() {


    // Desktops
    if( window.innerWidth >= 1200 ) {

        // $(".has-dropdown > a").hover(function (e) {
        //     $(this).next(".sl-dropdown-wrap").toggleClass("showed");
        // });

        // let availableHeightForDropdown = $("body").height() -  ( $(".sl-header").height() + 50 );

        // $(".sl-dropdown-level1").css({
        //     "max-height": availableHeightForDropdown + "px"
        // });

        return;
    }


    // Mobiles
    $(".sl-menu-outer").append("<div class='sl-close-menu-empty-bar'></div>");


    $(".has-dropdown > a").click(function (e) {
        e.preventDefault();
        $(this).next(".sl-dropdown-wrap").toggleClass("showed");
        $(this).parents("li").siblings().addClass("inactive");
        $(this).parents("li").addClass("active");
        $(".sl-menu").removeClass("showed");
        //$(this).next(".sl-dropdown-wrap").scrollTop(0);
    });

    $(".btn-go-back").click(function (e) {
        e.preventDefault();
        $(this).closest(".sl-dropdown-wrap").removeClass("showed");
    });
    $(".sl-dropdown-level1 .btn-go-back").click(function (e) {
        e.preventDefault();
        $(".sl-menu").addClass("showed");
        $(".sl-menu > li").removeClass("inactive active");
    });

    $(".sl-bars").click(function () {
        $(".sl-menubar").fadeIn();
        $(".sl-menu").addClass("showed");
        $(".sl-menu > li").removeClass("inactive active");
    });

    $(".sl-close-menu, .sl-close-menu-empty-bar").click(function () {
        
        $.when(
            $(".sl-menubar").fadeOut()
        ).done(function() {
        
            $(".sl-dropdown-wrap").removeClass("showed");
            $(".sl-menu").removeClass("showed");
        
        });
        
    });
    

}

function showOverlayWhileMainMenuDropdownsAppearOnDesktops() {

    if (window.innerWidth >= 1200) {

        $(".sl-menu > .list-inline-item.has-dropdown")
            .mouseenter(function () {
                //let menubarBottomDistance = $(".sl-menubar").offset().top + $(".sl-menu").height();
                if ($(".shadow-dropdown").length === 0) {
                    $("body").append("<div class='shadow-dropdown'></div>");
                }
                /*$(".shadow-dropdown").css({
                    "top" : menubarBottomDistance
                });*/
            })
            .mouseleave(function () {
                $("body").find(".shadow-dropdown").remove();
            });

    }

}

function makeHeaderSticky(){

    let node = $(".sl-logobar");
    /*
    if( (window.innerWidth < 1200) || (node.length == 0) ){
        return;
    }
    */
    if( node.length == 0 ){
        return;
    }

    //let headerHiddenDistance = node.offset().top;
    let headerHiddenDistance = 170;

    $(window).scroll(function (event) {
        let scroll = $(window).scrollTop();

        if(scroll >= headerHiddenDistance){
            node.addClass("sticky");
        } else {
            node.removeClass("sticky");
        }
    });

}



// search move on mobile
function searchReplace() {
    if (window.matchMedia(breakpointMobileMenu).matches) {
        $('#small-search-box-form').prependTo('#sl-search-mobile-form-holder');
    } 
}


/* ========================================================================================
Footer
=========================================================================================*/
//toggle footer links on mobile
// if(window.innerWidth < 768){

//     $(".module-footer-link h5").addClass("trigger trigger-plus");

//     $(".module-footer-link h5").click(function(){
//         $(this).parents(".module-footer-link").find("ul").slideToggle();
//         $(this).toggleClass("trigger-plus trigger-minus");
//     });
// }


/* ========================================================================================
Homepage 
=========================================================================================*/
/* ---------- Homepage Cats ---------- */
function initSlickHomepageCats() {

    let node = $(".slick-config-homepage-cats");

    if( node.hasClass("no-slider-on-touch-device") && isTouchDevice) {
        return;
    }

    if(node.length === 0) {
        return;
    }

    node.each(function () {
        let thisNode = $(this);

        let slideCount = thisNode.find(".each-item").length;

        thisNode.slick({
            rtl: isRtl,
            arrows: true,
            dots: false,
            autoplay: false,
            speed: 300,
            variableWidth: false,
            centerMode: false,
            infinite: false,
            slidesToShow: (slideCount > 5) ? 5 : slideCount,
            slidesToScroll: 2,
            responsive: [
                {
                    breakpoint: 1400,
                    settings: {
                        slidesToShow: (slideCount > 5) ? 5 : slideCount
                    }
                },
                {
                    breakpoint: 1199,
                    settings: {
                        slidesToShow: (slideCount > 4) ? 4 : slideCount,
                    }
                },
                {
                    breakpoint: 991,
                    settings: {
                        slidesToShow: (slideCount > 2) ? 2.5 : slideCount,
                    }
                },
                {
                    breakpoint: 767,
                    settings: {
                        slidesToShow: (slideCount > 1) ? 1.5 : slideCount,
                        slidesToScroll: 1
                    }
                }
            ]
        });

    }); //End: node.each()

}


/* ---------- Slick for Brands ---------- */
function initSlickConfigForHomepageBrands() {

    let node = $(".slick-config-homepage-brands");

    if( node.hasClass("no-slider-on-touch-device") && isTouchDevice) {
        return;
    }

    if(node.length === 0) {
        return;
    }

    node.each(function () {
        let thisNode = $(this);

        let slideCount = thisNode.find(".each-item").length;

        thisNode.slick({
            rtl: isRtl,
            arrows: true,
            dots: false,
            autoplay: false,
            speed: 300,
            variableWidth: false,
            centerMode: false,
            infinite: false,
            slidesToShow: (slideCount > 6) ? 6 : slideCount,
            slidesToScroll: 2,
            responsive: [
                {
                    breakpoint: 1400,
                    settings: {
                        slidesToShow: (slideCount > 5) ? 5 : slideCount
                    }
                },
                {
                    breakpoint: 1199,
                    settings: {
                        slidesToShow: (slideCount > 4) ? 4 : slideCount,
                    }
                },
                {
                    breakpoint: 991,
                    settings: {
                        slidesToShow: (slideCount > 2) ? 2.5 : slideCount,
                    }
                },
                {
                    breakpoint: 767,
                    settings: {
                        slidesToShow: (slideCount > 1) ? 1.5 : slideCount,
                        slidesToScroll: 1
                    }
                }
            ]
        });

    }); //End: node.each()

}

// random categories link
// function makeItSquare(els) {
//     for (let el of els) {
//         el.style.height = el.offsetWidth + "px";
//         $(el).removeClass("invisible");
//     }
// }

// let homeCatLinks = document.querySelectorAll(".category-wrap .list-picture > a");
// makeItSquare(homeCatLinks);

//show only 8 items on mobile
// if(window.innerWidth < 768){

//     let homeCatLinksWrap = document.querySelectorAll(".row-homepagecategories > .category-wrap");
//     for(let i = 0; i < homeCatLinksWrap.length; i++){
//         if(i > 7){
//             homeCatLinksWrap[i].style.display = "none";
//         }
//     }
// }



/* ========================================================================================
Product Details Page
=========================================================================================*/
// function setMaxheightPrDetailsSliderThumbs(){
//     if(window.innerWidth >= 992){
//         let prDetailsMainImgHeight = $(".pr-details-img-main").height() + "px";

//         if($(".pr-details-img-thumbs:first").length){
//             $(".pr-details-img-thumbs").css({"max-height" : prDetailsMainImgHeight });
//         }
//     }
// }

/* ========================================================================================
Listing Page
=========================================================================================*/
/* ---------- Sub Categories Slider ---------- */
function initSlickListingPageSubCategories(){
    let node = $(".slick-blog-page-categories");
    
    if(node.length == 0){
         return;
    }

    let slideCount = node.find(".each-item").length;

    // return if items are not overflown
    let availableSpaceForSubcats = node.width();
    
    let subcatItemsWidth = 0;
    for(let i = 0; i < slideCount; i++ ){
        subcatItemsWidth += node.find(".each-item").eq(i).outerWidth(true);
    }
    
    if( subcatItemsWidth < availableSpaceForSubcats ){
        return;
    }

    node.slick({
        rtl: isRtl,
        arrows: true,
        dots: false,
        autoplay: false,
        speed: 300,
        variableWidth: true,
        centerMode: false,
        infinite: false,
        slidesToScroll: 2,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    arrows: false
                }
            }
        ]
    });// End: slick

}

/* ========================================================================================
Checkout Page
=========================================================================================*/
// $(".add-new-address").on("click", function(e){
//     e.preventDefault;
//     $(".existing-address-holder").slideUp();
//     $(".add-address-holder").slideDown();
// });

// $(".cancel-add-address").on("click", function(e){
//     e.preventDefault;
//     $(".add-address-holder").slideUp();
//     $(".existing-address-holder").slideDown();
// })

/* ========================================================================================
Membership FAQ
=========================================================================================*/
function initMembershipFaq(){

    let node = $(".section-mfaq");

    if( node.length < 1 ){
        return;
    }

    node.find(".mfaq-q").click(function(){
        $(this).parents(".mfaq-single").find(".mfaq-a").slideToggle();
        $(this).parents(".mfaq-single").find(".mfaq-icon").slideToggle();
        $(this).parents(".mfaq-single").toggleClass("opened");
    });

}

/* ========================================================================================
Call Methods
=========================================================================================*/
/* ---------- After DOM Loaded ---------- */
$(function() {
    
    //fixBrokenContentFlash();
    
    initMenu();
    showOverlayWhileMainMenuDropdownsAppearOnDesktops();
    searchReplace();
    //makeHeaderSticky();

    initSlickHomepageCats();

    initSlickCommonConfigForProducts();

    adjustProductbox(); // should come after slick

    initSlickConfigForHomepageBrands();

    //setMaxheightPrDetailsSliderThumbs();
    imageUploadWithPreview();
    //initSlickListingPageSubCategories();

});



/* ---------- After DOM and Contents(images etc.) Loaded ---------- */
$(window).on("load", function() {
    
    initMembershipFaq();

});

