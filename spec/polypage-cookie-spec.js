Screw.Unit(function() {
  describe("PolyPage Cookie", function() {
    it("stores state in a cookie when switched on", function() {
      $('#dom').trigger('pp_setState', { logged_in:false });
      $('#dom').trigger('pp_setState', { logged_in:true });
      expect($.cookie('pp_logged_in')).to(equal, 'yes');
    });
    
    it("stores forgets state in a cookie when switched off", function() {
      $('#dom').trigger('pp_setState', { logged_in:true });
      $('#dom').trigger('pp_setState', { logged_in:false });
      expect($.cookie('pp_logged_in')).to(equal, null);
    });
    
    it("stores state in a cookie when toggled", function() {
      $('#dom').trigger('pp_toggleState', 'logged_in');
      expect($.cookie('pp_logged_in')).to(equal, 'yes');
      $('#dom').trigger('pp_toggleState', 'logged_in');
      expect($.cookie('pp_logged_in')).to(equal, null);
    });
  });
});