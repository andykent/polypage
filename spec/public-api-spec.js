Screw.Unit(function() {
	describe("PolyPage Public API", function() {
		describe("Using the toggle box", function() {
			it("toggles elements", function() {
				$.polypage.setState('logged_in', false);
				expect('.pp_logged_in').to(be_hidden);
				$("#pp_state_switch_logged_in").trigger('click');
				expect('.pp_logged_in').to(be_visible);
				$("#pp_state_switch_logged_in").trigger('click');
				expect('.pp_logged_in').to(be_hidden);
			});
		});
		
		describe("$.polypage.setState()", function() {
			it("shows and hides matching elements", function() {
				$.polypage.setState('logged_in', false);
				expect('.pp_logged_in').to(be_hidden);
				$.polypage.setState('logged_in', true);
				expect('.pp_logged_in').to(be_visible);
			});
			
			it("shows and hides inverted matching elements", function() {
				$.polypage.setState('logged_in', false);
				expect('.pp_not_logged_in').to(be_visible);
				$.polypage.setState('logged_in', true);
				expect('.pp_not_logged_in').to(be_hidden);
			});

			it("shows and hides AND'ed matching elements", function() {
				$.polypage.setState('logged_in', false);
				$.polypage.setState('admin', false);
				expect('.pp_logged_in_and_admin').to(be_hidden);
				$.polypage.setState('logged_in', true);
				expect('.pp_logged_in_and_admin').to(be_hidden);
				$.polypage.setState('admin', true);
				expect('.pp_logged_in_and_admin').to(be_visible);
			});
			
			it("shows and hides OR'ed matching elements", function() {
				$.polypage.setState('logged_in', false);
				$.polypage.setState('admin', false);
				expect('.pp_logged_in_or_admin').to(be_hidden);
				$.polypage.setState('logged_in', true);
				expect('.pp_logged_in_or_admin').to(be_visible);
				$.polypage.setState('admin', true);
				expect('.pp_logged_in_or_admin').to(be_visible);
			});
		});
	});
});
