Screw.Unit(function() {
  describe("PolyPage Events", function() {
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