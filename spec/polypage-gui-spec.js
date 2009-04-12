Screw.Unit(function() {
  describe("PolyPage GUI", function() {
    describe("redrawing", function() {
      it("fires a pp_gui_redrawBegin event when redrawing begins", function() {
        var redraw = false;
        $('#dom').bind('pp_gui_redrawBegin', function(e) { redraw = true });
        $('#dom').data('ppGUI').redraw();
        expect(redraw).to(be_true);
      });
      
      it("fires a pp_gui_redrawComplete event when redrawing finishes", function() {
        var redraw = false;
        $('#dom').bind('pp_gui_redrawComplete', function(e) { redraw = true });
        $('#dom').data('ppGUI').redraw();
        expect(redraw).to(be_true);
      });
      
      it("redraws when a page state changes", function() {
        var redraw = false;
        $('#dom').bind('pp_gui_redrawBegin', function(e) { redraw = true });
        $('#dom').trigger('pp_toggleState', 'logged_in');
        expect(redraw).to(be_true);
      });
    });
    
    describe("toggling", function() {
      it("allows state toggling by clicking on the links", function() {
        $('#dom').trigger('pp_setState', { logged_in:false });
        $('#pp_state_toggle_logged_in').click();
        expect('.pp_logged_in').to(be_visible);
        $('#pp_state_toggle_logged_in').click();
        expect('.pp_logged_in').to(be_hidden);
      });
    });
  });
});