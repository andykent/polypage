/**
 * Cookie plugin
 *
 * Copyright (c) 2006 Klaus Hartl (stilbuero.de)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 */

/*
 * Altered by Natalie Downe <nat@natbat.net> to make $cookie() with no arguments return an array of the set cookies
 * eg [["cookiename1", "cookievalue1"], ["cookiename2", "cookievalue2"]]
*/
jQuery.cookie = function(name, value, options) {
    if (typeof value != 'undefined') { // name and value given, set cookie
        options = options || {};
        if (value === null) {
            value = '';
            options.expires = -1;
        }
        var expires = '';
        if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
            var date;
            if (typeof options.expires == 'number') {
                date = new Date();
                date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
            } else {
                date = options.expires;
            }
            expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
        }
        var path = options.path ? '; path=' + options.path : '';
        var domain = options.domain ? '; domain=' + options.domain : '';
        var secure = options.secure ? '; secure' : '';
        document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
    } else if(typeof name != 'undefined') { // only name given, get cookie
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    } else {
		// not given anything
		var cookies = document.cookie.split(';');
		for (var i = 0; i < cookies.length; i++) {
            cookies[i] = jQuery.trim(cookies[i]).split('=')[0];
		}
		return cookies;
	}
};


// =============================
// = PolyPage Cookie Extension =
// =============================

(function($) {
  
  $.polypage.extension('Cookie',
  {
    expires: null, // can be a Date object or a integer number of days
    namespace:'pp_'
  },
  {
    init: function(){
      this.checkForCookieSupport();
      this.setInitialStateFromCookie();
      this.bindStateChangeListener();
    },
    
    checkForCookieSupport: function(){
      if($.cookie===undefined) throw "The jQuery Cookie plugin is required to use the ppCookie() extension but was not found at $.cookie()";
    },
    
    setInitialStateFromCookie: function(){
      var states = this.polypage.statesList();
      for(var i in states) {
        var stateName = states[i];
        if(this.getCookie(stateName)) {
          var obj = {}
          obj[stateName]=true
          this.scope.trigger('pp_setState', obj);
          
        }
      }
    },
    
    setCookie: function(state,val) {
      if(!state.length) return false;
      $.cookie(this.prefixed(state), val ? 'yes' : null, {"path":"/", "expires":this.options.expires});
      return true;
    },
    
    getCookie: function(state) {
      if(!state.length) return false;
      return $.cookie(this.prefixed(state))!=null;
    },
    
    prefixed: function(state) {
      return this.options.namespace+state;
    },
    
    bindStateChangeListener: function(){
      var c = this;
      this.polypageScope.bind('pp_stateChange', function(e, state) {
        c.setCookie(state.name, state.value);
      });
    }
  });
  
})(jQuery);