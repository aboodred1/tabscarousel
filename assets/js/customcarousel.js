(function ( $ ) {

	$.fn.customCarousel = function() {


		var carousel = this;
		var wrapper = carousel.find('.carousel-wrapper');
		var items = wrapper.find('.carousel-item');
		var navs = carousel.find('.carousel-nav');
		var maximum = items.size(); 
		var current = 0;
		var step = 4;
		var visible = 4;
		var speed = 50;

		console.log(maximum);


		
		var totalWidth = carousel.outerWidth(true) + 20;
		var itemWidth = items.outerWidth(true);


		wrapper.width(itemWidth * maximum);

		console.log(totalWidth);


		navs.find('.carousel-nav-prev').click(function(){

			if(current - step < 0 || current - step > maximum - visible) {

			} else {
				current = current - step;
				wrapper.animate({left: -(itemWidth * current)}, speed, null);
			}

			console.log(current);

		});

		navs.find('.carousel-nav-next').click(function(){


			if(current + step < 0 || current + step > maximum - visible) {

			} else {
				current = current + step;
				wrapper.animate({left: -(itemWidth * current)}, speed, null);
			}

			console.log(current);
		});


	};


}( jQuery ));