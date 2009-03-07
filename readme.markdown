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

Toggling states from the document is possible using various methods:

    <a href="#logged_in">log in</a>
    // and
    <a href="#not_logged_in">log out</a>

    // or inside a form
    <form method="GET" action="#logged_in">
    	<input type="submit">
    </form>

    // and from everywhere using: $.polypage.setState(String name, Boolean value)
    <input type="checkbox" onchange="$.polypage.setState('logged_in', this.checked)">


MORE INFO
---------
For more help and an example open the index.html file in a web browser.

If you would prefer be using MooTools instead of jQuery then for the moment you really should checkout cheeaun's fork http://github.com/cheeaun/polypage which contains lots of MooTools goodness.

COMING SOON
-----------
- Keyboard shortcuts for toggling
- A snazzy new toggle box design

CONTRIBUTERS
------------
- Andy Kent <andy.kent@me.com> (http://adkent.com)
- Natalie Downe <nat@natbat.net> (http://notes.natbat.net)
- Phil Oye <philoye@philoye.com> (http://philoye.com)
- Lim Chee Aun <cheeaun@gmail.com> (http://cheeaun.com)
- Yoan Blanc <yoan@dosimple.ch> (http://yoan.dosimple.ch/)
