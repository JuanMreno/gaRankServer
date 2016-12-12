(function($) {

	mainInit();

	function mainInit() {
		$body = $('body');

		if (skel.vars.IEVersion < 9)
			$(':last-child').addClass('last-child');

		$('form').placeholder();

		skel.on('+mobile -mobile', function() {
			$.prioritize(
				'.important\\28 mobile\\29',
				skel.breakpoint('mobile').active
			);
		});

		$('.scrolly').scrolly();

		var $nav_a = $('#nav a');

		$nav_a
			.scrolly()
			.on('click', function(e) {

				var t = $(this),
					href = t.attr('href');

				if (href[0] != '#')
					return;

				e.preventDefault();

				$nav_a
					.removeClass('active')
					.addClass('scrollzer-locked');

				t.addClass('active');

			});

		var ids = [];

		$nav_a.each(function() {

			var href = $(this).attr('href');

			if (href[0] != '#')
				return;

			ids.push(href.substring(1));

		});

		$.scrollzer(ids, { pad: 200, lastHack: true });

		$('#section').load('views/ranking.html');

	}

})(jQuery);