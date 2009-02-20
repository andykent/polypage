PolyPage
========
Polypage was designed to ease the process of showing 
multiple page states in html mock-ups. 
By simply adding class names to a document you can 
imply state and conditional view logic.


BASIC USAGE
-----------
    $(document).ready(function() {
    	$('body').polypage();
    });


SETTINGS
--------
There aren't any!
It just works. 

Having said that feel free to modify the css styling to work 
with your wireframes. The initial jQuery collection (the 'body'
element in these examples) is used to decide where the toggle
bar is appended to in the source code.

If you want to force a state to be active when the page 
loads then you can pass it in as an Array to the init 
function like so...

    $('body').polypage([ 'logged_in', 'admin' ]);

MORE INFO
---------
For more help and an example open the index.html file in a web browser.

CONTRIBUTERS
------------
Andy Kent <andy.kent@me.com> (http://adkent.com/)
Natalie Downe <nat@natbat.net> (http://notes.natbat.net/)
