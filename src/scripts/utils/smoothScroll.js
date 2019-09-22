
export default function () {

	console.log("Smooth Scroll function has loaded.");

	const triggerSmoothScroll = () => {
		let $smoothTriggers = $('.js-smoothscroll');

		$smoothTriggers.on('click', function(event) {
			let $thisTrigger = $(this),
				$thisTriggerHref = $thisTrigger.attr('href'),
				$thisTarget = $($thisTriggerHref),
				$thisTargetPosition = $thisTarget.offset().top;

			event.preventDefault();

			$('html, body').animate({
				scrollTop: $thisTargetPosition
			}, 1000);
		});
	};

	(function () {
		triggerSmoothScroll();
	})();
}