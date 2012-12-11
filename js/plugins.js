// usage: log('inside coolFunc', this, arguments);
// paulirish.com/2009/log-a-lightweight-wrapper-for-consolelog/
window.log = function f(){ log.history = log.history || []; log.history.push(arguments); if(this.console) { var args = arguments, newarr; args.callee = args.callee.caller; newarr = [].slice.call(args); if (typeof console.log === 'object') log.apply.call(console.log, console, newarr); else console.log.apply(console, newarr);}};

// make it safe to use console.log always
(function(a){function b(){}for(var c="assert,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,markTimeline,profile,profileEnd,time,timeEnd,trace,warn".split(","),d;!!(d=c.pop());){a[d]=a[d]||b;}})
(function(){try{console.log();return window.console;}catch(a){return (window.console={});}}());


/*
* jquery-google-analytics plugin
*
* A jQuery plugin that makes it easier to implement Google Analytics tracking,
* including event and link tracking.
*
* Adds the following methods to jQuery:
*   - $.trackPage() - Adds Google Analytics tracking on the page from which
*     it's called.
*   - $.trackPageview() - Tracks a pageview using the given uri. Can be used for tracking Ajax requests: http://www.google.com/support/analytics/bin/answer.py?hl=en&answer=55519
*   - $.trackEvent() - Tracks an event using the given parameters.
*   - $('a').track() - Adds event tracking to element(s).
*   - $.timePageLoad() - Measures the time it takes  an event using the given parameters.
*
* Features:
*   - Improves page load time by loading Google Analytics code without blocking.
*   - Easy and extensible event and link tracking plugin for jQuery and Google Analytics
*   - Automatic internal/external link detection. Default behavior is to skip
*     tracking of internal links.
*   - Enforces that tracking event handler is added to an element only once.
*   - Configurable: custom event tracking, skip internal links, metadata
*     extraction using callbacks.
*
* Copyright (c) 2008-09 Christian Hellsten
*
* Plugin homepage:
*   http://aktagon.com/projects/jquery/google-analytics/
*   http://github.com/christianhellsten/jquery-google-analytics/
*
* Examples:
*   http://aktagon.com/projects/jquery/google-analytics/examples/
*   http://code.google.com/apis/analytics/docs/eventTrackerGuide.html
*
* Repository:
*   git://github.com/christianhellsten/jquery-google-analytics.git
*
* Version 1.1.3
*
* Tested with:
*   - Mac: Firefox 3, Safari 3
*   - Linux: Firefox 3
*   - Windows: Firefox 3, Internet Explorer 6
*
* Licensed under the MIT license:
* http://www.opensource.org/licenses/mit-license.php
*
* Credits:
*   - http://google.com/analytics
*   - http://lyncd.com: 
*       Idea for trackPage method came from this blog post: http://lyncd.com/2009/03/better-google-analytics-javascript/
*/
(function($) {

  var pageTracker;

  /**
   * Enables Google Analytics tracking on the page from which it's called. 
   *
   * Usage:
   *  <script type="text/javascript">
   *    $.trackPage('UA-xxx-xxx', options);
   *  </script>
   *
   * Parameters:
   *   account_id - Your Google Analytics account ID.
   *   options - An object containing one or more optional parameters:
   *     - onload - boolean - If false, the Google Analytics code is loaded
   *       when this method is called instead of on window.onload.
   *     - status_code - The HTTP status code of the current server response.
   *       If this is set to something other than 200 then the page is tracked
   *       as an error page. For more details: http://www.google.com/support/analytics/bin/answer.py?hl=en&answer=86927
   *     - callback  - function to be executed after the Google Analytics code is laoded and initialized
   *
   */
  $.trackPage = function(account_id, options) {
    var host = (("https:" === document.location.protocol) ? "https://ssl." : "http://www.");
    var script;

    // Use default options, if necessary
    var settings = $.extend({}, {onload: true, status_code: 200}, options);
    var src  = host + 'google-analytics.com/ga.js';

    function init_analytics() {
      if (typeof _gat !== undefined) {
        debug('Google Analytics loaded');

        pageTracker = _gat._getTracker(account_id);

        if(settings.status_code === null || settings.status_code === 200) {
          pageTracker._trackPageview();
        } else {
          debug('Tracking error ' + settings.status_code);
          pageTracker._trackPageview("/" + settings.status_code + ".html?page=" + document.location.pathname + document.location.search + "&from=" + document.referrer);
        }
        if($.isFunction(settings.callback)){
          settings.callback(pageTracker);
        }
      }
      else { 
        throw "_gat is undefined"; // setInterval loading?
      }
    }

    load_script = function() {
      $.ajax({
        type: "GET",
        url: src,
        success: function() {          
          init_analytics(); 
        },
        dataType: "script",
        cache: true // We want the cached version
      });
    };
    
    // Enable tracking when called or on page load?
    if(settings.onload === true || settings.onload === null) {
      $(window).load(load_script);
    } else {
      load_script();
    }
  };

  /**
   * Tracks an event using the given parameters. 
   *
   * The trackEvent method takes four arguments:
   *
   *  category - required string used to group events
   *  action - required string used to define event type, eg. click, download
   *  label - optional label to attach to event, eg. buy
   *  value - optional numerical value to attach to event, eg. price
   *  skip_internal - optional boolean value. If true then internal links are not tracked.
   *
   */
  $.trackEvent = function(category, action, label, value) {
    if(typeof pageTracker === 'undefined') {
      debug('FATAL: pageTracker is not defined'); // blocked by whatever
    } else {
      pageTracker._trackEvent(category, action, label, value);
    }
  };

  /**
   * Tracks socialnetworks using the given parameters. 
   *
   * The trackSocial method takes four arguments:
   *
   * network      - name of the network, e.g. facebook, tweeter
   * socialAction - action, e.g. like/unlike
   * opt_target   - Optional: A string representing the URL (or resource) which receives the action.
   * opt_pagePath - Optional: A string representing the page by path (including parameters) from which the action occurred.
   *
   */
  $.trackSocial = function(network, socialAction, opt_target, opt_pagePath) {
    if(typeof pageTracker == 'undefined') {
      debug('FATAL: pageTracker is not defined'); // blocked by whatever
    } else {
      pageTracker._trackSocial(network, socialAction, opt_target, opt_pagePath);
    }
  };

  /**
   * Tracks a pageview using the given uri.
   *
   */
  $.trackPageview = function(uri) {
    if(typeof pageTracker === 'undefined') {
      debug('FATAL: pageTracker is not defined');
    } else {
      pageTracker._trackPageview(uri);
    }
  };

  /**
   * Adds click tracking to elements. Usage:
   *
   *  $('a').track()
   *
   */
  $.fn.track = function(options) {
    /**
     * Checks whether a setting value is a string or a function.
     * 
     * If second parameter is a string: returns the value of the second parameter.
     * If the second parameter is a function: passes the element to the function and returns function's return value.
     */
    function evaluate(element, text_or_function) {
      if(typeof text_or_function === 'function') {
        text_or_function = text_or_function(element);
      }
      return text_or_function;
    }

    // Add event handler to all matching elements
    return this.each(function() {
      var element = $(this);

      // Prevent an element from being tracked multiple times.
      if (element.hasClass('tracked')) {
        return false;
      } else {
        element.addClass('tracked');
      } 

      // Use default options, if necessary
      var settings = $.extend({}, $.fn.track.defaults, options);

      // Merge custom options with defaults.
      var category = evaluate(element, settings.category);
      var action   = evaluate(element, settings.action);
      var label    = evaluate(element, settings.label);
      var value    = evaluate(element, settings.value);
      var event_name = evaluate(element, settings.event_name);
      
      var message = "category:'" + category + "' action:'" + action + "' label:'" + label + "' value:'" + value + "'";
      
      debug('Tracking ' + event_name + ' ' + message);

      // Bind the event to this element. 
      // TODO Use .live since jQuery 1.4 now supports it better.
      element.bind(event_name + '.track', function() {       
        // Should we skip internal links? REFACTOR
        var skip = settings.skip_internal && (element[0].hostname === location.hostname);
      
        if(!skip) {
          $.trackEvent(category, action, label, value);
          debug('Tracked ' + message);
        } else {
          debug('Skipped ' + message);
        }

        return true;
      });
    });
  };

  /**
   * Prints to Firebug console, if available. To enable:
   *   $.fn.track.defaults.debug = true;
   */
  function debug(message) {
    if ($.fn.track.defaults.debug && typeof console !== 'undefined' && typeof console.debug !== 'undefined') {
      console.debug(message);
    }
  }

  /**
   * Default (overridable) settings.
   */
  $.fn.track.defaults = {
    category      : function(element) { return (element[0].hostname === location.hostname) ? 'internal':'external'; },
    action        : 'click',
    label         : function(element) { return element.attr('href'); },
    value         : null,
    skip_internal : true,
    event_name    : 'click',
    debug         : false
  };
}(jQuery));


/*
 * jQuery Orbit Plugin 1.2.3
 * www.ZURB.com/playground
 * Copyright 2010, ZURB
 * Free to use under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
*/

(function(d){d.fn.orbit=function(a){a=d.extend({animation:"horizontal-push",animationSpeed:600,timer:!0,advanceSpeed:4E3,pauseOnHover:!1,startClockOnMouseOut:!1,startClockOnMouseOutAfter:1E3,directionalNav:!0,captions:!0,captionAnimation:"fade",captionAnimationSpeed:600,bullets:!1,bulletThumbs:!1,bulletThumbLocation:"",afterSlideChange:function(){}},a);return this.each(function(){function q(){if(!a.timer||a.timer=="false")return!1;else r.is(":hidden")?s=setInterval(function(){l("next")},a.advanceSpeed):
(o=!0,x.removeClass("active"),s=setInterval(function(){var a="rotate("+m+"deg)";m+=2;t.css({"-webkit-transform":a,"-moz-transform":a,"-o-transform":a});m>180&&(t.addClass("move"),y.addClass("move"));m>360&&(t.removeClass("move"),y.removeClass("move"),m=0,l("next"))},a.advanceSpeed/180))}function n(){if(!a.timer||a.timer=="false")return!1;else o=!1,clearInterval(s),x.addClass("active")}function z(){if(!a.captions||a.captions=="false")return!1;else{var c=e.eq(b).data("caption");(_captionHTML=d(c).html())?
(j.attr("id",c).html(_captionHTML),a.captionAnimation=="none"&&j.show(),a.captionAnimation=="fade"&&j.fadeIn(a.captionAnimationSpeed),a.captionAnimation=="slideOpen"&&j.slideDown(a.captionAnimationSpeed)):(a.captionAnimation=="none"&&j.hide(),a.captionAnimation=="fade"&&j.fadeOut(a.captionAnimationSpeed),a.captionAnimation=="slideOpen"&&j.slideUp(a.captionAnimationSpeed))}}function A(){if(a.bullets)C.children("li").removeClass("active").eq(b).addClass("active");else return!1}function l(c){function d(){e.eq(f).css({"z-index":1});
u=!1;a.afterSlideChange.call(this)}var f=b,g=c;if(f==g)return!1;if(e.length=="1")return!1;u||(u=!0,c=="next"?(b++,b==p&&(b=0)):c=="prev"?(b--,b<0&&(b=p-1)):(b=c,f<b?g="next":f>b&&(g="prev")),A(),e.eq(f).css({"z-index":2}),a.animation=="fade"&&e.eq(b).css({opacity:0,"z-index":3}).animate({opacity:1},a.animationSpeed,d),a.animation=="horizontal-slide"&&(g=="next"&&e.eq(b).css({left:h,"z-index":3}).animate({left:0},a.animationSpeed,d),g=="prev"&&e.eq(b).css({left:-h,"z-index":3}).animate({left:0},a.animationSpeed,
d)),a.animation=="vertical-slide"&&(g=="prev"&&e.eq(b).css({top:v,"z-index":3}).animate({top:0},a.animationSpeed,d),g=="next"&&e.eq(b).css({top:-v,"z-index":3}).animate({top:0},a.animationSpeed,d)),a.animation=="horizontal-push"&&(g=="next"&&(e.eq(b).css({left:h,"z-index":3}).animate({left:0},a.animationSpeed,d),e.eq(f).animate({left:-h},a.animationSpeed)),g=="prev"&&(e.eq(b).css({left:-h,"z-index":3}).animate({left:0},a.animationSpeed,d),e.eq(f).animate({left:h},a.animationSpeed))),z())}var b=0,
p=0,h,v,u,f=d(this).addClass("orbit"),c=f.wrap('<div class="orbit-wrapper" />').parent();f.add(h).width("1px").height("1px");var e=f.children("img, a, div");e.each(function(){var a=d(this),b=a.width(),a=a.height();b>f.width()&&(f.add(c).width(b),h=f.width());a>f.height()&&(f.add(c).height(a),v=f.height());p++});if(e.length==1)a.directionalNav=!1,a.timer=!1,a.bullets=!1;e.eq(b).css({"z-index":3}).fadeIn(function(){e.css({display:"block"})});if(a.timer){c.append('<div class="timer"><span class="mask"><span class="rotator"></span></span><span class="pause"></span></div>');
var r=c.children("div.timer"),o;if(r.length!=0){var t=d("div.timer span.rotator"),y=d("div.timer span.mask"),x=d("div.timer span.pause"),m=0,s;q();r.click(function(){o?n():q()});if(a.startClockOnMouseOut){var B;c.mouseleave(function(){B=setTimeout(function(){o||q()},a.startClockOnMouseOutAfter)});c.mouseenter(function(){clearTimeout(B)})}}}a.pauseOnHover&&c.mouseenter(function(){n()});if(a.captions){c.append('<div class="orbit-caption"></div>');var j=c.children(".orbit-caption");z()}if(a.directionalNav){if(a.directionalNav==
"false")return!1;c.append('<div class="slider-nav"><span class="right">Right</span><span class="left">Left</span></div>');var k=c.children("div.slider-nav").children("span.left"),w=c.children("div.slider-nav").children("span.right");k.click(function(){n();l("prev")});w.click(function(){n();l("next")})}if(a.bullets){c.append('<ul class="orbit-bullets"></ul>');var C=c.children("ul.orbit-bullets");for(i=0;i<p;i++){k=d("<li>"+(i+1)+"</li>");if(a.bulletThumbs&&(w=e.eq(i).data("thumb")))k=d('<li class="has-thumb">'+
i+"</li>"),k.css({background:"url("+a.bulletThumbLocation+w+") no-repeat"});c.children("ul.orbit-bullets").append(k);k.data("index",i);k.click(function(){n();l(d(this).data("index"))})}A()}})}})(jQuery);








	/*
	 * HoverDir .
	 */

(function( $, undefined ) {

	$.HoverDir 				= function( options, element ) {
	
		this.$el	= $( element );
		
		this._init( options );
		
	};
	
	$.HoverDir.defaults 	= {
		hoverDelay	: 0,
		reverse		: false
	};
	
	$.HoverDir.prototype 	= {
		_init 				: function( options ) {
			
			this.options 		= $.extend( true, {}, $.HoverDir.defaults, options );
			
			// load the events
			this._loadEvents();
			
		},
		_loadEvents			: function() {
			
			var _self = this;
			
			this.$el.on( 'mouseenter.hoverdir, mouseleave.hoverdir', function( event ) {
				
				var $el			= $(this),
					evType		= event.type,
					$hoverElem	= $el.find( 'div' ),
					direction	= _self._getDir( $el, { x : event.pageX, y : event.pageY } ),
					hoverClasses= _self._getClasses( direction );
				
				$hoverElem.removeClass();
				
				if( evType === 'mouseenter' ) {
					
					$hoverElem.hide().addClass( hoverClasses.from );
					
					clearTimeout( _self.tmhover );
					
					_self.tmhover	= setTimeout( function() {
						
						$hoverElem.show( 0, function() {
							$(this).addClass( 'da-animate' ).addClass( hoverClasses.to );
						} );
						
					
					}, _self.options.hoverDelay );
					
				}
				else {
				
					$hoverElem.addClass( 'da-animate' );
					
					clearTimeout( _self.tmhover );
					
					$hoverElem.addClass( hoverClasses.from );
					
				}
					
			} );
			
		},
		// credits : http://stackoverflow.com/a/3647634
		_getDir				: function( $el, coordinates ) {
			
				/** the width and height of the current div **/
			var w = $el.width(),
				h = $el.height(),

				/** calculate the x and y to get an angle to the center of the div from that x and y. **/
				/** gets the x value relative to the center of the DIV and "normalize" it **/
				x = ( coordinates.x - $el.offset().left - ( w/2 )) * ( w > h ? ( h/w ) : 1 ),
				y = ( coordinates.y - $el.offset().top  - ( h/2 )) * ( h > w ? ( w/h ) : 1 ),
			
				/** the angle and the direction from where the mouse came in/went out clockwise (TRBL=0123);**/
				/** first calculate the angle of the point, 
				add 180 deg to get rid of the negative values
				divide by 90 to get the quadrant
				add 3 and do a modulo by 4  to shift the quadrants to a proper clockwise TRBL (top/right/bottom/left) **/
				direction = Math.round( ( ( ( Math.atan2(y, x) * (180 / Math.PI) ) + 180 ) / 90 ) + 3 )  % 4;
			
			return direction;
			
		},
		_getClasses			: function( direction ) {
			
			var fromClass, toClass;
			
			switch( direction ) {
				case 0:
					// from top
					( !this.options.reverse ) ? fromClass = 'da-slideFromTop' : fromClass = 'da-slideFromBottom';
					toClass		= 'da-slideTop';
					break;
				case 1:
					// from right
					( !this.options.reverse ) ? fromClass = 'da-slideFromRight' : fromClass = 'da-slideFromLeft';
					toClass		= 'da-slideLeft';
					break;
				case 2:
					// from bottom
					( !this.options.reverse ) ? fromClass = 'da-slideFromBottom' : fromClass = 'da-slideFromTop';
					toClass		= 'da-slideTop';
					break;
				case 3:
					// from left
					( !this.options.reverse ) ? fromClass = 'da-slideFromLeft' : fromClass = 'da-slideFromRight';
					toClass		= 'da-slideLeft';
					break;
			};
			
			return { from : fromClass, to: toClass };
					
		}
	};
	
	var logError 			= function( message ) {
		if ( this.console ) {
			console.error( message );
		}
	};
	
	$.fn.hoverdir			= function( options ) {
	
		if ( typeof options === 'string' ) {
			
			var args = Array.prototype.slice.call( arguments, 1 );
			
			this.each(function() {
			
				var instance = $.data( this, 'hoverdir' );
				
				if ( !instance ) {
					logError( "cannot call methods on hoverdir prior to initialization; " +
					"attempted to call method '" + options + "'" );
					return;
				}
				
				if ( !$.isFunction( instance[options] ) || options.charAt(0) === "_" ) {
					logError( "no such method '" + options + "' for hoverdir instance" );
					return;
				}
				
				instance[ options ].apply( instance, args );
			
			});
		
		} 
		else {
		
			this.each(function() {
			
				var instance = $.data( this, 'hoverdir' );
				if ( !instance ) {
					$.data( this, 'hoverdir', new $.HoverDir( options, this ) );
				}
			});
		
		}
		
		return this;
		
	};
	
})( jQuery );
