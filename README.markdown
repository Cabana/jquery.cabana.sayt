# Search as you type

jQuery plugin for quickly implementing search as you type functionality.

## Dependencies

- jQuery library
- jQuery UI Core library

## Usage

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

  url: [string] // the url to query for a result. Default is '/'.

  keyboard: [boolean] // let the user navigate the result list using the keyboard. Default is false.

  requestType: [string] // should be either "GET" or "POST". Default is "GET".

  dataType: [string] // the datatype used by jQuery.ajax(). Default is "json".

  containerClass: [string] // Class name of the element containing the results. If nothing is set then a div after the input with a `.ajax-results` class will be created.

  selectionClass: [string] // Class name of the selected link. Default is 'selection'.

  throttle: [integer] // Thottle in milliseconds. Default is 250.

  minLength: [integer] // The minimum length of input value before a search is made. Default is 3.

  markup: [function] // A function that returns the markup (as a string) of the search results. This function gets called with one argument, the json result after making the ajax request. Default is an unordered list with links.

  data: [function] // A function that returns the JSON object sent along with the request. It gets the element passed as argument. Default is { query: <input value> }

  enterPressedHandler: [function] // A function that will be called when the user hits the enter key while having a selection made. By default this will go to the link of the selection but you can customize this. The function will be passed the selected element and the event that was triggered. See the more_options.html for an example.

  searchOnFocus: [boolean] // Whether or not to search when the user focuses on the field

});
```

By default the `markup()` function expects the resulting JSON to be array of objects having a `url` and `text` attribute. Here is an example:

```javascript
[
  {"url":"http://northkorea.com/yo", "text":"North korea lands on sun"},
  {"url":"http://yahoo.com/man-takes-flight", "text":"Super awesome man takes flight"},
]
```

You can of course respond with what ever you want as long as you customize the `markup()` function to be able to handle it. This means that you can include URLs to images, return raw HTML instead of JSON or whatever you want.

## Data params

Most options can also be set via `data-` attributes on the element. They will override any options set with initializing the plugin.

- `data-sayt-url`
- `data-sayt-keyboard`
- `data-sayt-request-type`
- `data-sayt-data-type`
- `data-sayt-content-type`
- `data-sayt-selection-class`
- `data-sayt-min-lengt`
- `data-sayt-throttle`
- `data-sayt-container-class`

## Events

- `sayt:fetch:start`: Fired when the result fetching begins. Data passed along is the element on which the plugin was instantiated, the options and the data passed along with the ajax request.
- `sayt:fetch:complete`: Fired when the result fetching is completed. Again the element, options and data along with the results are passed along with the event.
- `sayt:results:injected`: Fired when the whole process is done and the results are in the DOM.

## Methods

- `destroy`: Remove the sayt functionality by unbinding the events and removing the results container.
- `option`: Sets an option associated with the specified `optionName`. Options can be changed in the fly after the plugin has been initialized.

## Viewing examples

To get the best experience (and easier testing) the examples require a server to send the requests too.

To install the server's dependencies run `bundle install`. This will install Sinatra and the Google search Ruby gem.

To start the server run `ruby server.rb` from within the examples folder. You can then vist [localhost:4567/basis.html](localhost:4567/basis.html) or one of the other example HTML files.
