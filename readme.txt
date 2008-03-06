PolyPage																				by Andy Kent
------------------------------------------------------------
Polypage was designed to ease the process of showing 
multiple page states in html mock-ups. 
By adding simply adding class names to a document you can 
imply state and conditional view logic.


BASIC USAGE
------------------------------------------------------------
$(document).ready(function() {
	$.polypage.init();
});


SETTINGS
------------------------------------------------------------

There aren't any!
It just works. 

Having said that feel free to modify the css styling to work 
with your wireframes.

If you want to force a state to be active when the page 
loads then you can pass it in as an Array to the init 
function like so...

$.polypage.init([ 'logged_in', 'admin' ]);


CONTRIBUTERS
------------------------------------------------------------
Andy Kent <andrew.d.kent@gmail.com>
Natalie Downe <nat@natbat.net> (http://notes.natbat.net/)

