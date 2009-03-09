Screw.Unit(function() {
  describe("PolyPage Public Event API", function() {
    describe("triggering pp_setState events", function() {
      it("shows and hides matching elements", function() {
        $('#dom').trigger('pp_setState', { logged_in:false });
        expect('.pp_logged_in').to(be_hidden);
        $('#dom').trigger('pp_setState', { logged_in:true });
        expect('.pp_logged_in').to(be_visible);
      });

      it("shows and hides inverted matching elements", function() {
        $('#dom').trigger('pp_setState', { logged_in:false });
        expect('.pp_not_logged_in').to(be_visible);
        $('#dom').trigger('pp_setState', { logged_in:true });
        expect('.pp_not_logged_in').to(be_hidden);
      });

      it("shows and hides AND'ed matching elements", function() {
        $('#dom').trigger('pp_setStates', { logged_in:false, admin:false });
        expect('.pp_logged_in_and_admin').to(be_hidden);
        $('#dom').trigger('pp_setState', { logged_in:true });
        expect('.pp_logged_in_and_admin').to(be_hidden);
        $('#dom').trigger('pp_setState', { admin:true });
        expect('.pp_logged_in_and_admin').to(be_visible);
      });

      it("shows and hides OR'ed matching elements", function() {
        $('#dom').trigger('pp_setStates', { logged_in:false, admin:false });
        expect('.pp_logged_in_or_admin').to(be_hidden);
        $('#dom').trigger('pp_setState', { logged_in:true });
        expect('.pp_logged_in_or_admin').to(be_visible);
        $('#dom').trigger('pp_setState', { admin:true });
        expect('.pp_logged_in_or_admin').to(be_visible);
      });
    });
    
    describe("triggering pp_toggleState events", function() {
      it("toggles a single state", function() {
        $('#dom').trigger('pp_setState', { logged_in:false });
        $('#dom').trigger('pp_toggleState', 'logged_in');
        expect('.pp_logged_in').to(be_visible);
        $('#dom').trigger('pp_toggleState', 'logged_in');
        expect('.pp_logged_in').to(be_hidden);
      });
    });
    
    describe("triggering pp_toggleStates events", function() {
      it("toggles multiple states", function() {
        $('#dom').trigger('pp_setState', { logged_in:false, admin:true });
        $('#dom').trigger('pp_toggleStates', ['logged_in', 'admin']);
        expect('.pp_logged_in').to(be_visible);
        expect('.pp_admin').to(be_hidden);
        $('#dom').trigger('pp_toggleStates', ['logged_in', 'admin']);
        expect('.pp_logged_in').to(be_hidden);
        expect('.pp_admin').to(be_visible);
      });
    });
    
    describe("fired events", function() {
      it("fires 'pp_stateChanged' everytime a page state changes (via toggling)", function() {
        $('#dom').trigger('pp_setState', {logged_in:false});
        var data = false;
        $('#dom').bind('pp_stateChange', function(e, obj) { data = obj });
        $('#dom').trigger('pp_toggleStates', 'logged_in');
        expect(data).to(equal, {name:'logged_in', value:true});
      });
      
      it("fires 'pp_stateChanged' everytime a page state changes (via switching)", function() {
        $('#dom').trigger('pp_setState', {logged_in:true});
        var data = false;
        $('#dom').bind('pp_stateChange', function(e, obj) { data = obj });
        $('#dom').trigger('pp_setState', {logged_in:false});
        expect(data).to(equal, {name:'logged_in', value:false});
      });
      
      it("doesn't fire 'pp_stateChanged' if the state hasn't changed", function() {
        $('#dom').trigger('pp_setState', {logged_in:true});
        var data = false;
        $('#dom').bind('pp_stateChange', function(e, obj) { data = true });
        $('#dom').trigger('pp_setState', {logged_in:true});
        expect(data).to(be_false);
      });
    });
    
    describe("triggering pp_toggleState events via link hash attributes", function() {
      it("binds to clicks on links and toggles with pp_toggle_logged_in", function() {
        $('#dom').trigger('pp_setState', { logged_in:false });
        $('a#toggle_logged_in_link').click();
        expect('.pp_logged_in').to(be_visible);
        $('a#toggle_logged_in_link').click();
        expect('.pp_logged_in').to(be_hidden);
      });
      
      it("works when the click event occurs on a nested attribute", function() {
        $('#dom').trigger('pp_setState', { logged_in:false });
        $('a#toggle_logged_in_link strong').click();
        expect('.pp_logged_in').to(be_visible);
        $('a#toggle_logged_in_link strong').click();
        expect('.pp_logged_in').to(be_hidden);
      });
    });
    
    describe("triggering pp_setState events via link hash attributes", function() {
      it("binds to clicks on links and switches on with pp_set_logged_in_true", function() {
        $('#dom').trigger('pp_setState', { logged_in:false });
        $('a#set_logged_in_true_link').click();
        expect('.pp_logged_in').to(be_visible);
        $('a#set_logged_in_true_link').click();
        expect('.pp_logged_in').to(be_visible);
      });
      
      it("binds to clicks on links and switches off with pp_set_logged_in_false", function() {
        $('#dom').trigger('pp_setState', { logged_in:true });
        $('a#set_logged_in_false_link').click();
        expect('.pp_logged_in').to(be_hidden);
        $('a#set_logged_in_false_link').click();
        expect('.pp_logged_in').to(be_hidden);
      });
    });
    
    describe("triggering pp_toggleState events via form action attributes", function() {
      it("binds to submit events on forms and toggles with pp_toggle_logged_in", function() {
        $('#dom').trigger('pp_setState', { logged_in:false });
        $('form#toggle_logged_in_form').submit();
        expect('.pp_logged_in').to(be_visible);
        $('form#toggle_logged_in_form').submit();
        expect('.pp_logged_in').to(be_hidden);
      });
    });
  });
});