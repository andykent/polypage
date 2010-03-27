PolyPage
========
Polypage was designed to ease the process of showing 
multiple page states in html mock-ups. 
By simply adding class names to a document you can 
imply state and conditional view logic.


BASIC USAGE
-----------

Initialise PolyPage...

    $(document).ready(function() {
    	$('body').polypage();
    });

Use stateful class names in your html...

    <li class="pp_admin">pp_admin</li>
    <li class="pp_not_logged_in other_test_class">pp_not_logged_in</li>
    <li class="test_class pp_logged_in_or_admin other_test_class">pp_logged_in_or_admin</li>
    <li class="pp_logged_in_and_admin">pp_logged_in_and_admin</li>
    <li class="pp_not_logged_in_and_not_admin">pp_not_logged_in_and_not_admin</li>

Use special href attributes to trigger state changes if required...

    <a href="#pp_toggle_logged_in">Log In Toggle</a>
    <a href="#pp_set_logged_in_true">Log In</a>
    <a href="#pp_set_logged_in_false">Log Out</a>


Use special form actions to trigger state changes if required...

    <form action="#pp_toggle_logged_in" method="get">
      <input type="submit" value="Log in"/>
    </form>


API
---

PolyPage makes extensive use of custom events and triggering/binding to these is the recommended way of interacting with page states programatically. Here are some examples (which assume you have bound polypage to the 'body')...

Toggle the logged in state...

    $('body').trigger('pp_toggleState', 'logged_in');

Set the logged in state...

    $('body').trigger('pp_setState', { logged_in:true });

Set the logged in state...

    $('body').trigger('pp_setState', { logged_in:true });

Listen for state changes...

    $('body').bind('pp_stateChange', function(e, state) { 
      alert("state "+ state.name + " changed to " + state.value); 
    });

See the specs for some more examples.

ADVANCED USAGE
--------------

Under the hood PolyPage is logically separated into a core library and several extensions. The currently implemented extensions are...

- Base: the core event system and bare essentials to get polypage working
- GUI: the nav bar for pre-built GUI interactions
- Events: some default event handlers for taking care of polypage formatted click and submit events automagically
- Cookies: cookie support for maintaining state across pages
- Keyboard: Keyboard shortcuts for toggling states via "ALT + first_letter_of_state_name"

Full documentation for all of the extensions will be coming soon but for now you can see the source code for available options.

Some usage examples
----------------------

Starting PolyPage without cookie support or Event helpers...

    $('body').polypage({ cookie:false, events:false });


Starting PolyPage with a 2 day cookie expiry a 'ux' prefix and no Event helpers...

    $('body').polypage({ prefix:'ux', cookie:{ expires:2 }, events:false });

Roll your own PolyPage! if you want to completely customise PolyPage then you can break away from using the polypage() function and initialize the individual components yourself...

    $(el).ppBase(opts);
    $(el).ppEvents(opts);
    $(el).ppGUI(opts);
    $(el).ppCookie(opts);
    $(el).ppKeyboard(opts);


MORE INFO
---------
For an example open the index.html file in a web browser.

If you would prefer be using MooTools instead of jQuery then for the moment you really should checkout cheeaun's fork http://github.com/cheeaun/polypage which contains lots of MooTools goodness.

CONTRIBUTERS
------------
- Andy Kent <andy.kent@me.com> (http://adkent.com)
- Natalie Downe <nat@natbat.net> (http://notes.natbat.net)
- Phil Oye <philoye@philoye.com> (http://philoye.com)
- Lim Chee Aun <cheeaun@gmail.com> (http://cheeaun.com)
- Yoan Blanc <yoan@dosimple.ch> (http://yoan.dosimple.ch/)
