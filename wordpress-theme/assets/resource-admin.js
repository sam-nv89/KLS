(function ($) {
  $(function () {
    let picker;

    $('#kls_choose_pdf').on('click', function (event) {
      event.preventDefault();
      if (picker) {
        picker.open();
        return;
      }

      picker = wp.media({
        title: 'Choose the published worksheet PDF',
        button: { text: 'Use this PDF' },
        library: { type: 'application/pdf' },
        multiple: false,
      });

      picker.on('select', function () {
        const file = picker.state().get('selection').first().toJSON();
        $('#kls_resource_pdf_id').val(file.id);
        $('#kls_resource_pdf_url').val(file.url);
      });

      picker.open();
    });

    $('#kls_remove_pdf').on('click', function (event) {
      event.preventDefault();
      $('#kls_resource_pdf_id').val('');
      $('#kls_resource_pdf_url').val('');
    });
  });
})(jQuery);
