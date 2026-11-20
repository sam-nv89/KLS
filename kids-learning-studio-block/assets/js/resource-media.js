(function ($) {
	'use strict';
	let frame;
	$(function () {
		$('#kls-choose-pdf').on('click', function (event) {
			event.preventDefault();
			if (frame) { frame.open(); return; }
			frame = wp.media({ title: 'Choose a PDF', button: { text: 'Use this PDF' }, library: { type: 'application/pdf' }, multiple: false });
			frame.on('select', function () {
				const file = frame.state().get('selection').first().toJSON();
				if (file.mime !== 'application/pdf') return;
				$('#kls-pdf-id').val(file.id);
				$('#kls-pdf-url').val(file.url);
			});
			frame.open();
		});
		$('#kls-remove-pdf').on('click', function (event) {
			event.preventDefault();
			$('#kls-pdf-id, #kls-pdf-url').val('');
		});
	});
})(jQuery);
