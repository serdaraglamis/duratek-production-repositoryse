// Module 100 STARTS
(function(){
    var module100Swiper = new Swiper('.module-100-container', {
        slidesPerView: 1,
        spaceBetween: 0,
        loop: true,
        grabCursor: true,
        pagination: {
        el: '.module-100-pagination',
            clickable: true,
        },
        autoplay: {
            delay: 6000,
            disableOnInteraction: false,
        },
        keyboard: {
            enabled: true,
        },
        navigation: {
            nextEl: '.module-100-next',
            prevEl: '.module-100-prev',
        }
    });
})();
// Module 100 ENDS