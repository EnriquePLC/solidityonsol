new Swiper('.twitter-slider__container', {
  //direction: 'vertical',
  loop: true,
  autoHeight: true,
  spaceBetween:37,
  watchSlidesVisibility: true,
  //centeredSlides:true,
  //slidesOffsetBefore:200,
   navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  breakpoints: {
    320: {
      slidesPerView: 1,
      spaceBetween:15,
    },
    480: {
      slidesPerView: 2,
      spaceBetween:20,
    },
    700: {
      slidesPerView: 3,
    },
    960: {
      slidesPerView: 4,
    },
  }

})

