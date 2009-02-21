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
There aren't many!
It mostly just works. 

Having said that feel free to modify the css styling to work 
with your wireframes. The initial jQuery collection (the 'body'
element in these examples) is used to decide where the toggle
bar is appended to in the source code.

If you want to force a state to be active when the page 
loads then you can pass it in as an Array to the init 
function like so...

    $('body').polypage([ 'logged_in', 'admin' ]);    

If you want to set a custom label it can be done using the
label option like this...

    $('body').polypage([], { label: 'My Label Here' });

If you wish to change the class prefix from 'pp' this is possible
by setting the 'prefix' option...

    $('body').polypage([], { prefix: 'MyPrefix' });
    // class names should now look like "MyPrefix_logged_in_and_admin"

Even the whitespace separator can be changed using the 'separator'
option (note only single characters work at the moment)... 

    $('body').polypage([], { separator: '-' });
    // class names should now look like "pp-logged-in-and-admin"

MORE INFO
---------
For more help and an example open the index.html file in a web browser.

COMING SOON
-----------
- Keyboard shortcuts for toggling
- An API for triggering state changes programatically
- A snazzy new toggle box design

CONTRIBUTERS
------------
Andy Kent <andy.kent@me.com> (http://adkent.com/)
Natalie Downe <nat@natbat.net> (http://notes.natbat.net/)
Phil Oye <philoye@philoye.com> (http://philoye.com)
