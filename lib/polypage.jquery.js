/*
 * PolyPage 0.5
 *
 * Copyright (c) 2007 New Bamboo (new-bamboo.co.uk)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 * For cookie support you will also need the modified version of the jQuery cookie plugin that comes bundled with this plugin.
 *
 * Additional help and information can be found at: http://code.new-bamboo.co.uk/polypage
 *
 */

(function($) {

	$.polypage = {

		states: null, 

		init: function(defaults){
			this.assignDisplayStyles();
			this.buildOptionsBar();
			this.setStartValues(defaults);
			this.refresh();
		},

		setStartValues: function(initValues){
			if(initValues) {
				for(var i in initValues) {
					if($.cookie()){ 
						if($.cookie(initValues[i]) != 'yes') {
							// only set the initial value if it isnt already set 
							// otherwise setState will toggle off
							this.setState(initValues[i],true);
						} 
					} else {
						// if cookies are not being used set as usual
						this.setState(initValues[i],true);
					}

				}
			};
			var hashValues = window.location.hash.replace(/^#/,'').split(/_and_/);
			for(var i in hashValues) {
				// if it is on, turn it off 
				var val = (this.states[hashValues[i]]) ? false : true;
				// if it has been set elsewhere then the cookie also will be toggled
				this.setState(hashValues[i],val);
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
							if($.cookie(states[state]) == 'yes') {
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
			return $("*[@class~='pp_']");
		},

		refresh: function(){
			var self = this;
			this.findAll().each(function(){
				self.evaluateNode(this);
			});
		},

		assignDisplayStyles: function(){
			this.findAll().each(function() {
				$(this).css('display',$(this).css('display'));
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
			this.states[state] = val ? true : false;
			$('#pp_state_switch_'+state).toggleClass('active');

			// if the state needs to be set regardless of if it has been set already 
			// then the setState function is not the way to do it as it will toggle the state
			this.toggleCookie(state);
			this.refresh();
		},

		toggleCookie: function(state) {
			if($.cookie() && (state != '')){ 
				if(($.cookie(state) == null) || ($.cookie(state) != 'yes')) {
					// cookie never been set, set the cookie
					$.cookie(state, 'yes', {"path":"/"});
				} else {
					// destroy the cookie
					$.cookie(state, null, {"path":"/"});
				}
			}
		},
		
		alphabeticalStateNames: function(){
			var ret = [];
			for(var state in this.states) {	ret.push(state); };
			return ret.sort();
		},

		buildOptionsBar: function(){
			this.findStates();
			var self=this;
			$('body').append('<div id="pp_options"><ul></ul></div>');
			
			var alphaStates = this.alphabeticalStateNames();
			
			for(var index in alphaStates) {
				var state = alphaStates[index]
				var val = this.states[state];

				// show hide options
				$('#pp_options ul').append('<li><a href="#'+state+'" id="pp_state_switch_'+state+'">'+state.replace(/_/,' ')+'</a></li>');

				if($.cookie()){ 
					// If we are using cookies, check cookies, 
					// if there is a positive cookie set then switch the state to be on and refresh
					if(($.cookie(state) != null) || ($.cookie(state) == 'yes')) {
						// this state should be on because there is a cookie set
						this.states[state] = true;
						$('#pp_state_switch_'+state).toggleClass('active');
						this.refresh();
					}				
				}

				// switch event
				$('#pp_state_switch_'+state)
				.click(function() {
					var state = $(this).attr('id').replace('pp_state_switch_','');
					self.setState(state,!self.states[state]);
					return false;
				});
			};
		}

	};
	
	
})(jQuery);