$(function(){

  $('input[data-autocomplete-url]').each(function() {
    var $input = $(this);

    $(this).sayt({
      url: $input.data('autocomplete-url'),
      containerClass: 'put-results-here',
      keyboard: true
    });
  });

});

var a = [1,2,3,4];

for (var i = a.length - 1; i >= 0; i--) {
  console.log(a[i]);
};
