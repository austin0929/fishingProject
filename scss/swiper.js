const swiper = new Swiper('.swiper', {
    // Optional parameters
    direction: 'horizontal',
    slidesPerView: 3,
    // spaceBetween: 20
    loop: true,
    autoplay: {
        delay: 3000,
    },
    breakpoints:{
        320: {
            slidesPerView: 1,
            spaceBetween: 20
        },
        // when window width is >= 480px
        767.8: {
            slidesPerView: 2,
            spaceBetween: 20
        },
        // when window width is >= 640px
        991.8: {
            slidesPerView: 3,
            spaceBetween: 48
        }
    }
});

