// =============================
// = PolyPage Events Extension =
// =============================

(function($) {
  
  $.polypage.extension('Events', 
  {
    enableClickEvents: true,
    enableSubmitEvents: true
  }, 
  {
    init: function(){
      this.bindEvents();
    },
    
    bindEvents: function() {
      var pp = this;
      if(this.options.enableClickEvents)
        $('body').bind('click.pp', function(e) { pp.clickHandler(e); });
      if(this.options.enableSubmitEvents)
        $('form').bind('submit.pp', function(e) { pp.submitHandler(e); }); // FIXME try to bind this to body not just form elements
    },
    
    clickHandler: function(e) {
      var a = $(e.target).closest('a');
      if(a.length==0) return;
      var href = a.attr('href');
      if(!href) return;
      if(this.triggerEventFromHash(href)) e.preventDefault();
    },
    
    submitHandler: function(e){
      var form = $(e.target).closest('form')
      if(form.length==0) return;
      var action = form.attr('action');
      if(!action) return;
      if(this.triggerEventFromHash(action)) e.preventDefault();
    },
    
    triggerEventFromHash: function(hash){
      if(hash.search(/^#pp_/)==-1) return false;
      var hash = hash.replace(/^#pp_/,'');
      if(hash.search(/^toggle_/)>=0) {
        this.scope.trigger('pp_toggleState', hash.replace(/^toggle_/, ''));
        return true
      }
      if(hash.search(/^set_/)>=0) {
        var val = hash.search(/_false$/)==-1
        hash = hash.replace(/^set_/, '')
        hash = hash.replace(/_true$|_false$/, '')
        var obj = {}
        obj[hash]=val
        this.scope.trigger('pp_setState', obj);
        return true
      }
      return false
    }
  });
  
})(jQuery);