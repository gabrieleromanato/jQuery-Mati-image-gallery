var Gallery = new function() {

	var gallery = document.getElementById('gallery'),
		wrapper = $('#gallery-wrapper', gallery),
		sets = $('div.gallery-set', wrapper),
		thumbs = $('img', sets),
		progress = $('#gallery-progress-indicator', gallery),
		play = $('#gallery-play-pause', gallery),
		prev = $('#prev', gallery),
		next = $('#next', gallery),
		close = $('#gallery-close', gallery),
		current = null,
		paused = false;
		
		
	var prepare = function() {
	
		$('#gallery-preview').append('<img/>');
	
	
	};
	
	var handleThumbs = function() {
	
		thumbs.each(function() {
		
			var $img = $(this);
			var src = $img.attr('src');
			var larger = src.replace('-thumb', '');
			
			$img.click(function() {
			
				$('img', '#gallery-preview').attr('src', larger);
				$('#gallery-container').height(600);
				$('#gallery-preview').show();
			
			
			});
		
		
		});
	
	
	
	};
	
	var handleClose = function() {
	
	
		close.click(function(e) {
		
			$(this).parent().hide();
			$('#gallery-container').height(305);

		
			e.preventDefault();
		
		});
	
	
	};
	
	var slideTo = function(element) {
	
		wrapper.animate({
			left: - element.position().left
		}, 1000);
	
	
	};
	
	var navigate = function() {
	
		$('a', document.getElementById('gallery-navigation')).each(function() {
		
			var $a = $(this);
			var $set = $($a.attr('rel'));
			
			$a.click(function(e) {
			
				current = $set;
				
				slideTo($set);
			
				e.preventDefault();
			
			});
		
		
		});
	
	};
	
	var prevNext = function() {
	
		prev.click(function(e) {
		
			if(current == null) {
			
				slideTo(sets.eq(0));
				
				current = sets.eq(0);
			
			} else {
			
				var target = (current.prev().length) ? current.prev() : sets.eq(0);
				
				slideTo(target);
			
			
			}
			
			e.preventDefault();
		
		
		});
		
		
		next.click(function(e) {
		
			if(current == null) {
			
				slideTo(sets.eq(sets.length-1));
				
				current = sets.eq(sets.length-1);
			
			} else {
			
				var target = (current.next().length) ? current.next() : sets.eq(sets.length -1);
				
				slideTo(target);
			
			
			}
			
			e.preventDefault();
		
		
		});

	
	
	};
	
	var playAnim = function() {
	
		play.click(function(e) {
					
				progress.animate({
					width: 0
				}, 2000, function() {
				
					if(current == null) {
					
						slideTo(sets.eq(sets.length-1));
						
						current = sets.eq(sets.length-1);
						
						progress.width(768);
					
					
					} else {
					
						slideTo(current);
						
						progress.width(768);
					
					}	
				
				
				});
					
			e.preventDefault();
		
		});
	
	
	
	};
	
	this.init = function() {
	
		prepare();
		handleThumbs();
		handleClose();
		navigate();
		prevNext();
		playAnim();
	
	
	};



}();

$(function() {

	Gallery.init();


});