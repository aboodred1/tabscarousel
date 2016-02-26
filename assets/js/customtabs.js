(function ( $ ) {

 	$.fn.customTabs = function() {
		// get main class

		var vars = {
			map: new Array(),
			currentTab: 0,
			hash: window.location.hash.replace('#!/', '')
		};

		var tabs = this;
		var links = tabs.find('.tab-nav');
		var content = tabs.find('.tab-content');

		var slug = function(str) {
			return str.toLowerCase().replace(/[^\w ]+/g,'').replace(/ +/g,'-');
		}; 

		var onLoad = function() {
			// set current tab
			links.children('.tab-link:eq('+ vars.currentTab +')').addClass('tab-link-active');
			content.children('.tab:eq('+ vars.currentTab +')').show();
			content.find('.tab-title:eq('+ vars.currentTab +')').children('.fa').addClass('fa-minus-circle').removeClass('fa-plus');
		}

		var linksReflection = function(index) {
			// remove active 
			links.children('.tab-link-active').removeClass('tab-link-active');
			// activate link
			links.children('.tab-link:eq('+ index +')').addClass('tab-link-active');
			// active accordion
			content.find('.tab-title:eq('+ index +')').children('.fa').addClass('fa-minus-circle').removeClass('fa-plus');
		};

		
		// add hashbang to links
		links.find('a').each(function(index, el){
			var text = $(this).html();
			$(this).attr('href', '#!/' + slug(text));
			content.children('.tab:eq('+ index +')').attr('id', slug(text));
			vars.map[index] = slug(text);
		});

		// set currentTab by hash
		if(vars.hash) {
			vars.currentTab = vars.map.indexOf(vars.hash);
		}

		// load default/current tab
		onLoad();

		// switch tab on click 
		links.find('a').click(function(){
			var linkIndex = links.find('a').index(this);

			// links reflection
			linksReflection(linkIndex);

			// hide active tab
			content.children('.tab:eq('+ vars.currentTab +')').hide();
			// active new tab
			content.children('.tab:eq('+ linkIndex +')').show();

			vars.currentTab = linkIndex;
		});

		// current accordion
		content.find('.tab-title').click(function(){
			var titleIndex = content.find('.tab-title').index(this);

			// show an indication that current tab is open 
			content.find('.tab-title').children('.fa-minus-circle').removeClass('fa-minus-circle').addClass('fa-plus');
			$(this).children('.fa').toggleClass('fa-plus').toggleClass('fa-minus-circle');
			
			// links reflection
			linksReflection(titleIndex);

			// close current tab
			content.children('.tab:eq('+ vars.currentTab +')').slideUp(300);
			// open active tab
			content.children('.tab:eq('+ titleIndex +')').slideDown(300);

			vars.currentTab = titleIndex;

			// set hash
			window.location.hash = '#!/' + vars.map[titleIndex];
		});
    };
    
}( jQuery ));