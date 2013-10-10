;(function ( $, window, document, undefined ) {

  var pluginName = "sayt";

  var defaults = {
    url: "/",
    keyboard: false,
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
    requestType: 'GET',
    dataType: 'json',
    containerClass: 'ajax-results',
    selectionClass: 'selection',
    data: function() {
      return { query: $elem.val() };
    },
    minLength: 3,
    throttle: 250
  };

  function Plugin ( element, options ) {
    this.element = element;
    this.settings = $.extend( {}, defaults, options );
    this._defaults = defaults;
    this._name = pluginName;
    this.init();
  }

  var settings;
  var $elem;
  var base;
  var timer = undefined;

  Plugin.prototype = {
    init: function () {
      base = this;
      $elem = $(base.element);
      settings = base.settings;

      $elem.on('keyup', function() {
        if (timer) {
          window.clearTimeout(timer);
        }

        timer = window.setTimeout(function() {
          if ($elem.val().length >= settings.minLength) {
            var results = base.fetchResults();

            var markup = '<div class="' + settings.containerClass + '">' + settings.markup(results) + '</div>';

            base.emptyResultsContainer();
            base.inject(markup);
          } else {
            base.emptyResultsContainer();
          }
        }, settings.throttle);
      }).on('blur', function() {
        base.emptyResultsContainer();
      });

      if (settings.keyboard) {
        base.bindKeyboardEvents();
      }
    },

    emptyResultsContainer: function() {
      if (settings.resultsContainer) {
        settings.resultsContainer.html('');
      } else {
        $elem.next('.' + settings.containerClass).remove();
      }
    },

    inject: function(markup) {
      if (settings.resultsContainer) {
        settings.resultsContainer.append(markup);
      } else {
        $elem.after(markup);
      }
    },

    fetchResults: function() {
      var results;

      $.ajax({
        url: settings.url,
        type: settings.requestType,
        dataType: settings.dataType,
        data: settings.data(),
        async: false
      }).done(function(json) {
        results = json;
      });

      return results;
    },

    thereAreResults: function() {
      return $elem.next('.' + settings.containerClass).length;
    },

    selectionMade: function() {
      return $elem.next('.' + settings.containerClass).find('.' + settings.selectionClass).length
    },

    bindKeyboardEvents: function() {
      $(document).on('keyup', function(e) {
        if (base.thereAreResults()) {
          if (e.keyCode === 13) {
            base.goToSelection();
          } else if (e.keyCode === 40) {
            base.moveSelectionDown();
          } else if (e.keyCode === 38) {
            base.moveSelectionUp();
          }
        }
      });
    },

    goToSelection: function() {
      if (base.selectionMade()) {
        window.location.href = $elem.next('.' + settings.containerClass).find('.' + settings.selectionClass).attr('href');
      }
    },

    moveSelectionDown: function() {
      if (base.selectionMade()) {
        var $selection = $elem.next('.' + settings.containerClass).find('.' + settings.selectionClass)

        var links = $selection.parents('.' + settings.containerClass).find('a');
        for (var i = links.length - 1; i >= 0; i--) {
          if ($(links[i]).hasClass(settings.selectionClass)) {
            var $link = $(links[i]);
            var $nextLink = $(links[i+1]);
            var $lastLink = $(links[links.length-1]);

            $link.removeClass(settings.selectionClass);

            if ($link.is($lastLink)) {
              $elem.focus();
            } else {
              $nextLink.addClass(settings.selectionClass);
            }

            break;
          }
        };
      } else {
        $elem.blur();
        $elem.next('.' + settings.containerClass).find('a').first().addClass(settings.selectionClass);
      }
    },

    moveSelectionUp: function() {
      if (base.selectionMade()) {
        var $selection = $elem.next('.' + settings.containerClass).find('.' + settings.selectionClass)

        var links = $selection.parents('.' + settings.containerClass).find('a');
        for (var i = links.length - 1; i >= 0; i--) {
          if ($(links[i]).hasClass(settings.selectionClass)) {
            var $link = $(links[i]);
            var $prevLink = $(links[i-1]);
            var $firstLink = $(links[0]);

            $link.removeClass(settings.selectionClass);

            if ($link.is($firstLink)) {
              $elem.focus();
            } else {
              $prevLink.addClass(settings.selectionClass);
            }

            break;
          }
        };
      } else {
        $elem.blur();
        $elem.next('.' + settings.containerClass).find('a').last().addClass(settings.selectionClass);
      }
    }
  };

  $.fn[ pluginName ] = function ( options ) {
    return this.each(function() {
      if ( !$.data( this, "plugin_" + pluginName ) ) {
        $.data( this, "plugin_" + pluginName, new Plugin( this, options ) );
      }
    });
  };

})( jQuery, window, document );
