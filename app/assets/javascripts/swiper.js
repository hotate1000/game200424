window.addEventListener('DOMContentLoaded', function() {
	var slider1 = new Swiper ('.slider1', {
		loop: true,
		initialSlide: -1,
		spaceBetween: -50,
		slidesPerView: 3,
		speed: 500,
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev'
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true,
    },
	});
}, false);