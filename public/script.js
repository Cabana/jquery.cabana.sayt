$(function(){

  $('input[data-autocomplete-url]').each(function() {
    var $input = $(this);

    $(this).sayt({
      url: $input.data('autocomplete-url')
    });

  });

});
