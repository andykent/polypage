// ===============================
// = PolyPage Keyboard Extension =
// ===============================

(function($) {
  
  $.polypage.extension('Keyboard',
  {
    modifier: 18,
    mapping: null
  },
  {
    init: function(){
      if(!this.options.mapping) this.options.mapping = this.autoMapping();
      this.captureKeyPresses();
    },
    
    autoMapping: function(){
      var states = this.polypage.statesList();
      var mapping = {};
      for(var i in states) {
        var s = states[i];
        var keycodeFor = function(str,attempt) {
          if(str.length==attempt) return null;
          var code = str.charCodeAt(attempt);
          if(mapping[code]==undefined) return code;
          return keycodeFor(str,attempt+1);
        };
        mapping[ keycodeFor(s.toUpperCase(), 0) ] = s;
      };
      return mapping;
    },
    
    captureKeyPresses: function(){
      var keyboard = this;
      $(document).keydown(function(e) {
        var k = e.which || e.keyCode;
        if(k==keyboard.options.modifier) keyboard.activated = true;
      });
      $(document).keyup(function(e) {
        var k = e.which || e.keyCode;
        if(k==keyboard.options.modifier) keyboard.activated = false;
        if(keyboard.activated && k>=65 && k<=90) {
          e.preventDefault();
          keyboard.toggleByKeyCode(k);
        }
      });
    },
    
    toggleByKeyCode: function(keyCode){
      this.scope.trigger('pp_toggleState', this.options.mapping[keyCode]);
    }
  });
  
})(jQuery);