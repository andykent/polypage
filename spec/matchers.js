Screw.Matchers["be_visible"] = {
	match: function(expected, actual) {
		if (!(actual instanceof jQuery)) actual = jQuery(actual)
		if(actual.length==0) throw "Unable to determine visibility as no elements matched "+actual.toString();
		return actual.is(':visible');
	},
	failure_message: function(expected, actual, not) {
		return 'expected ' + $.print(actual) + (not ? ' not' : '') + ' to be visible';
	}
};

Screw.Matchers["be_hidden"] = {
	match: function(expected, actual) {
		if (!(actual instanceof jQuery)) actual = jQuery(actual)
		if(actual.length==0) throw "Unable to determine visibility as no elements matched "+actual.toString();
		return actual.is(':hidden');
	},
	failure_message: function(expected, actual, not) {
		return 'expected ' + $.print(actual) + (not ? ' not' : '') + ' to be hidden';
	}
}