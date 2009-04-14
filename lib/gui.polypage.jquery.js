// ==========================
// = PolyPage GUI Extension =
// ==========================

(function($) {
  
  $.polypage.extension('GUI', 
  {
    containerID: 'pp_options',
    label: "Page States:"
  },
  {
    init: function(){
      this.bindEvents();
      this.redraw();
    },
    
    bindEvents: function() {
      var nb = this;
      this.scope.bind('pp_gui_forceRedraw', function() { nb.redraw() });
      this.polypageScope.bind('pp_stateChange', function() { nb.redraw()});
    },
    
    redraw: function(){
      this.scope.trigger('pp_gui_redrawBegin', this);
      this.undraw();
      if(!this.needsOptionBar()) return;
      this.draw();
      this.scope.trigger('pp_gui_redrawComplete', this);
    },
    
    draw: function(){
      this.scope.append('<div id="'+this.options.containerID+'"><p>'+this.options.label+'</p><ul></ul></div>');
      var states = this.states();
      for(var index in states) {
        var state = states[index];
        var humanStateName = state.name.replace(this.separator(),' ');
        var className = state.value ? 'on' : 'off'
        $('#pp_options ul').append('<li><a href="#pp_toggle_'+state.name+'" id="pp_state_toggle_'+state.name+'" class="'+className+'">'+humanStateName+'</a></li>');
      }
    },
    
    undraw: function(){
      this.scope.find('#'+this.options.containerID).remove();
    },
    
    needsOptionBar: function(){
      return this.polypage.hasElements();
    },
    
    states: function(){
      return this.polypage.alphabeticalStates();
    },
    
    separator: function(){
      return this.polypage.options.separator;
    }
  });
  
})(jQuery);