# Search as you type

jQuery plugin for quickly implementing search as you type functionality.

## How to use

1. Include jQuery.
2. Include the plugin.
3. Call it.

## Example

Here is an example of how you might call the plugin

```javascript
$('.some-input-field').sayt({
  url: '/search'
});
```

Thats all you need to get it working, don't worry there are quite a few options that allow you customize it.

## Options

```javascript
$('.some-input-field').sayt({

  url: [string] // the url to query for a result. No default, not optional!

  keyboard: [boolean] // let the user navigate the result list using the keyboard. Default is false.

  requestType: [string] // should be either "GET" or "POST". Default is "GET".

  dataType: [string] // the datatype used by jQuery.ajax(). Default is "json".

  containerClass: [string] // Class name of the div the results will be wrapped in. Default is 'ajax-results'.

  selectionClass: [string] // Class name of the selected link. Default is 'selection'.

  throttle: [integer] // Thottle in milliseconds. Default is 250.

  minLength: [integer] // The minimum length of input value before a search is made. Default is 3.

  resultsContainer: [jQuery object] // A jQuery object to put the results into. If its undefined then the results will be injected after the input. Default is undefined.

  markup: [function] // A function that returns the markup (as a string) of the search results. This function gets called with one argument, the json result after making the ajax request. Default is an unordered list with links.

});
```

By default the `markup()` function expects the result JSON to be array of objects having a `url` and `text` attribute. Here is an example:

```javascript
[
  {"url":"http://google.com/", "text":"google"},
  {"url":"http://google.com/", "text":"google"},
  {"url":"http://google.com/", "text":"google"},
  {"url":"http://google.com/", "text":"google"}
]
```

You can of course respond with what ever you want as long as you customize the `markup()` function to be able to handle it. This means that you can include URLs to images, return raw HTML instead of JSON or whatever you want.

Example of using some of the options:

```javascript
$('.some-input-field').sayt({

  url: $(this).data('ajax-url'),

  keyboard: true,

  throttle: 300,

  markup: function(results) {
    var markup = '';

    markup += '<h3>Results</h3>';
    markup += '<ul>';

    for (var i = results.length - 1; i >= 0; i--) {
      markup += '<li>';
      markup += '<a href="' + results[i].url + '">' + results[i].text + '</a>';
      markup += '</li>';
    };

    markup += '</ul>';

    return markup;
  },

  requestType: 'POST'

});
```
