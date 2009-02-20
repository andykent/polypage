/*
 * PolyPage 0.6.0
 *
 * Copyright (c) 2007 New Bamboo (new-bamboo.co.uk)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 * For cookie support you will also need the modified version of the jQuery cookie plugin that comes bundled with this plugin.
 *
 * For help please open the index.html file in your web browser.
 *
 * Developed by Andy Kent & Natalie Downe 
 *
 */

(function($) {
  
  $.fn.polypage = function(defaults, opts) {
    $.polypage.init(defaults,opts,this);
  };
  
	$.polypage = {
    
		states: null,
		
		options: {
		  label: "Page States:"
		},

		init: function(defaults, opts, elems){
		  var elems = elems || 'body';
      $.extend(this.options,opts);
			this.buildOptionsBar(elems);
			this.setStartValues(defaults);
			this.refresh();
		},

		setStartValues: function(initValues){
			if(initValues) {
				for(var i in initValues) {
				  this.setState(initValues[i],true);
				}
			};
			var hashValues = window.location.hash.replace(/^#/,'').split(/_and_/);
			for(var i in hashValues) {
				this.setState(hashValues[i],true);
			}
		},

		findStates: function(){
			var el = this.findAll();
			var self = this;
			this.states = {};
			el.each(function() {
				var s = self.extractDataFromClassName($(this).attr('class'));
				var states = s.split(/_?not_|_or_|_and_/);
				for(var state in states) {
					if(self.states[states[state]]==undefined && states[state]!='' ) {
						if($.cookie()){ 
							// the state may be undefined but if the state has been set on another page 
							// we need to reset that state in our array to be on
							if($.cookie(states[state]) != null) {
								self.states[states[state]]=true;
							} else {
								self.states[states[state]]=false;
							}
						} else {
							// if we are not using cookies if its not in our aray we dont know about it
							self.states[states[state]]=false;
						}
					}
				}
			});
			return this.states;
		},

		extractDataFromClassName: function(className){
			var classes = className.split(' ');
			for(var i in classes)
			if(classes[i].match(/^pp_/)) return classes[i].replace(/^pp_/,'');
			return '';
		},

		findAll: function(){
			return $("*[class*='pp_']");
		},

		refresh: function(){
			var self = this;
			this.findAll().each(function(){
				self.evaluateNode(this);
			});
		},

		evaluateNode: function(node){
			// a node is an element with the pp_ class
			var on = this.evaluate(this.extractDataFromClassName($(node).attr('class')));	
			// toggle on or off if to be displayed
			if(on) $(node).show();
			else $(node).hide();
			return on;
		},

		evaluate: function(input){
			var str = input
			.replace(/^pp_/gi,'')
			.replace(/_and_/gi,' && ')
			.replace(/_or_/gi,' || ')
			.replace(/_?not_/gi,' !')
			.replace(/([a-z_0-9]+)/gi,"this.states['$1']");
			return eval(str);
		},

		setState: function(state,val){
		  if(val) {
		    this.states[state] = true;
  			$('#pp_state_switch_'+state).addClass('active');
		  } else {
		    this.states[state] = false;
  			$('#pp_state_switch_'+state).removeClass('active');
		  }
			this.setCookie(state,val);
			this.refresh();
		},

		setCookie: function(state,val) {
			if(!$.cookie()) return;
			if(state.length==0) return;
			$.cookie(state, val ? 'yes' : null, {"path":"/"});
		},
		
		alphabeticalStateNames: function(){
			var ret = [];
			for(var state in this.states) {	ret.push(state); };
			return ret.sort();
		},

		buildOptionsBar: function(elems){
			this.findStates();
			var self=this;
			$(elems).append('<div id="pp_options"><p>'+this.options.label+'</p><ul></ul></div>');
			
			var alphaStates = this.alphabeticalStateNames();
			
			for(var index in alphaStates) {
				var state = alphaStates[index]
				var val = this.states[state];

				$('#pp_options ul').append('<li><a href="#'+state+'" id="pp_state_switch_'+state+'">'+state.replace(/_/,' ')+'</a></li>');
        var stateSwitch = $('#pp_state_switch_'+state);
        
        if($.cookie() && $.cookie(state) != null) {
          this.states[state] = true;
          stateSwitch.toggleClass('active');
          this.refresh();
        };
				
				stateSwitch.click(function() {
					var state = $(this).attr('id').replace('pp_state_switch_','');
					self.setState(state,!self.states[state]);
					return false;
				});
			};
		}

	};
	
})(jQuery);