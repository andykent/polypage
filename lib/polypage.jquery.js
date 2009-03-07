/*
 * PolyPage 0.8.0 [dev]
 *
 * Copyright (c) 2009 Andy Kent
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 * For cookie support you will also need the modified version of the jQuery cookie plugin that comes bundled with this plugin.
 *
 * For help please open the index.html file in your web browser.
 *
 * Developed by Andy Kent
 */

(function($) {
  $.fn.polypage = function(opts) {
    return this.each(function() { new $.polypage(this, opts); });
  };

  $.polypage = function(scope, options) {
    this.scope = $(scope);
    this.options = $.extend($.polypage.DEFAULTS, options||{});
    this.init();
  };
  
  $.polypage.DEFAULTS = {
    prefix: 'pp',
    separator: '_',
    label: "Page States:"
  };
  
  $.polypage.prototype = {
    init: function(){
      this.findStates();
      // this.buildOptionsBar(elems);
      this.bindEvents();
      this.setStartStates();
      this.refresh();
    },
    
    
    setState: function(stateName,val){
      var newState = !!val;
      if(this.getState(stateName)==newState) return newState;
      this.states[stateName] = newState;
      this.setCookie(stateName, newState);
      this.refresh();
      this.scope.trigger('pp_stateChange', { name:stateName, value:newState });
      return newState;
    },
    
    getState: function(stateName){
      return this.states[stateName];
    },
    
    setStates: function(states) {
      for(var stateName in states) { this.setState(stateName, states[stateName]) };
    },
    
    toggleState: function(stateName) { return this.setState(stateName, !this.getState(stateName)); },
    
    toggleStates: function(stateNames) { for(var i in stateNames) this.toggleState(stateNames[i]); },
    
    setCookie: function(state,val) {
      if(!$.cookie()||!state.length) return;
      $.cookie(state, val ? 'yes' : null, {"path":"/"});
      return this;
    },
    
    
    bindEvents: function(){
      var pp = this;
      this.scope.bind('pp_setState pp_setStates', function(e, opts) { pp.setStates(opts); });
      this.scope.bind('pp_toggleState', function(e, stateName) { pp.toggleState(stateName); });
      this.scope.bind('pp_toggleStates', function(e, stateNames) { pp.toggleStates($.makeArray(arguments).slice(1)); });
      // this.scope.bind('click', this.clickHandler);
      // this.scope.bind('submit', this.submitHandler);
    },
    
    
    separated: function(val) {
      return this.options.separator+val+this.options.separator
    },

    setStartStates: function(){
      if(this.options.defaultStates) 
        for(var i in this.options.defaultStates) { this.setState(initValues[i], true); }
      this.setValuesFromHash(window.location.hash);
    },

    setValuesFromHash: function(hash) {
      var hashValues = hash.replace(/^#/,'').split(new RegExp(this.separated('and')));
      for(var i in hashValues) { this.setState(hashValues[i], true); }
      return this;
    },

    
    findStates: function(){
      var el = this.findAll();
      var self = this;
      this.states = {};
      el.each(function() {
        var s = self.extractDataFromClassName($(this).attr('class'));
        var states = s.split(new RegExp(self.separated('?not')+'|'+self.separated('or')+'|'+self.separated('and')));
        for(var state in states) {
          if(self.states[states[state]]==undefined && states[state]!='') {
            if($.cookie()){ 
              self.states[states[state]]=$.cookie(states[state]) != null;
            } else {
              self.states[states[state]]=false;
            }
          }
        }
      });
      return this.states;
    },

    extractDataFromClassName: function(className){
      var classes = className.split(' ');
      for(var i in classes) {
        var matcher = new RegExp('^'+this.options.prefix+this.options.separator);
        if(matcher.test(classes[i])) return classes[i].replace(matcher,'');
      }
      return '';
    },

    findAll: function(){
      return $("*[class*='"+this.options.prefix+this.options.separator+"']", this.scope);
    },
    
    pageHasPPElements: function() {
      return this.findAll().length>0
    },

    refresh: function(){
      var self = this;
      this.findAll().each(function(){ self.evaluateNode(this); });
      return this;
    },

    evaluateNode: function(node){
      var on = this.evaluate(this.extractDataFromClassName($(node).attr('class')));  
      $(node).toggle(on);
      return on;
    },

    evaluate: function(input){
      var str = input
      .replace(new RegExp(this.separated('and'),'gi'),' && ')
      .replace(new RegExp(this.separated('or'),'gi'),' || ')
      .replace(new RegExp(this.separated('?not'),'gi'),' !')
      .replace(/([a-z_0-9\-]+)/gi,"this.states['$1']");
      return eval(str);
    },
    
    // alphabeticalStateNames: function(){
    //   var ret = [];
    //   for(var state in this.states) {  ret.push(state); };
    //   return ret.sort();
    // },

    // buildOptionsBar: function(elems){
    //   if(!this.pageHasPPElements()) return;
    //   var self=this;
    //   $(elems).append('<div id="pp_options"><p>'+this.options.label+'</p><ul></ul></div>');
    //   
    //   var alphaStates = this.alphabeticalStateNames();
    //   
    //   for(var index in alphaStates) {
    //     var state = alphaStates[index];
    //     var val = this.states[state];
    // 
    //     $('#pp_options ul').append('<li><a href="#'+state+'" id="pp_state_switch_'+state+'">'+state.replace(this.options.separator,' ')+'</a></li>');
    //     var stateSwitch = $('#pp_state_switch_'+state);
    //     
    //     if($.cookie() && $.cookie(state) != null) {
    //       self.setState(state);
    //       this.refresh();
    //     };
    //   }
    // 
    //   $('#pp_options').click(function(event) {
    //     var target = $(event.target).closest('a');
    //     if(target.length) {
    //       if(target.attr('id')) {
    //         var state = target.attr('id').substring('pp_state_switch_'.length);
    //         self.setState(state,!self.states[state]);
    //       }
    //       event.preventDefault();
    //       event.stopPropagation();
    //     }
    //   });
    // }

  };
  
})(jQuery);
