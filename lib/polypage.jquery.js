/*
* PolyPage 0.8.3
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

 $.polypage = {
   extensionList: []
 };


 // ============================
 // = PolyPage Agregate helper =
 // ============================

 $.fn.polypage = function(opts) {
   var opts = opts || {};
   this.ppBase(opts.base || {});
   for(var i in $.polypage.extensionList) {
     var extension = $.polypage.extensionList[i];
     if(this['pp'+extension]) this['pp'+extension](opts[extension.toLowerCase()] || {});
   }
   return this
 };


 // =================
 // = PolyPage Base =
 // =================

 $.fn.ppBase = function(opts) {
   return this.each(function() {
     if($(this).data('polypage')===undefined)
       $(this).data('polypage', new $.polypage.Base(this, opts)); 
   });
 };

 $.polypage.Base = function(scope, options) {
   this.scope = $(scope);
   this.options = $.extend($.polypage.Base.DEFAULTS, options||{});
   this.init();
 };

 $.polypage.Base.DEFAULTS = {
   prefix: 'pp',
   separator: '_'
 };

 $.polypage.Base.prototype = {
   init: function(){
     this.findStates();
     this.bindEvents();
     this.setStartStates();
     this.refresh();
   },


   setState: function(stateName,val){
     var newState = !!val;
     if(this.getState(stateName)==newState) return newState;
     this.states[stateName] = newState;
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

   prefixed: function(str){
     return this.options.prefix+this.options.separator+str;
   },

   bindEvents: function(){
     var pp = this;
     var doc = $(document.body);
     this.scope.bind('pp_setState pp_setStates', function(e, opts) { pp.setStates(opts); });
     this.scope.bind('pp_toggleState', function(e, stateName) { pp.toggleState(stateName); });
     this.scope.bind('pp_toggleStates', function(e, stateNames) { pp.toggleStates($.makeArray(arguments).slice(1)); });
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
         if(self.states[states[state]]==undefined && states[state]!='') 
           self.states[states[state]]=false;
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

   hasElements: function() {
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
     try { var ret = eval(str) }
     catch(e) { throw "Ooops! there seems to have been an error in your use of polypage classname ("+input+")" }
     return ret;
   },

   statesList: function(){
     var list = [];
     for(var state in this.states) { list.push(state) };
     return list.sort();
   },

   alphabeticalStates: function(){
     var alphaStates = [], ret = [];
     for(var state in this.states) { alphaStates.push(state) }
     alphaStates = this.statesList();
     for(var state in alphaStates) { ret.push({name:alphaStates[state], value:this.states[alphaStates[state]]}); };
     return ret
   }
 };


 // ====================
 // = Extension Helper =
 // ====================

 $.polypage.extension = function(__extensionName__, __defaults__, __prototype__) {
   $.polypage.extensionList.push(__extensionName__);
   // create a jQuery chainable helper
   $.fn['pp'+__extensionName__] = function(opts) {
     return this.each(function() {
       (opts = opts || {}).bindTo = opts.bindTo || this;
       $(this).data('pp'+__extensionName__, new $.polypage[__extensionName__](this, opts)); 
     });
   };

   // object initializer
   $.polypage[__extensionName__] = function(scope, options) {
     this.scope = $(scope);
     this.options = $.extend($.polypage[__extensionName__].DEFAULTS, options||{});
     // polypage binding
     this.polypageScope = $(this.options.bindTo);
     this.polypage = this.options.polypage || this.polypageScope.data('polypage');
     if(this.polypage===undefined)
       throw "A polypage "+__extensionName__+" object must be bound to a polypage enabled element, try setting the 'bindTo' option.";
     // initialization
     this.init();
   };

   // empty defaults
   $.polypage[__extensionName__].DEFAULTS = __defaults__ || {};

   // blank init to stop errors
   $.polypage[__extensionName__].prototype = $.extend({ init: function(){} }, __prototype__);
 };

})(jQuery);