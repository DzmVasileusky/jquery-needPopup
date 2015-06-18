#needPopup 1.0.0
##Do you need ease to use, clean and light popup? Here you go!

###Short facts
* Fully responsive
* Show any element in the popup just with data attribute
* Several options and callbacks
* Overwritting styles is not pain, cause there are little ammount of them
* Realy lightweight
* Browsers: Firefox, Chrome, Safari, iOS, Android, IE8+

Written by: Dzmitry Vasileuski

###License
Released under the MIT license - http://opensource.org/licenses/MIT

##Getting started

###Step 1: Add required files from dist directory

First of all the jQuery library needs to be included. 
Next, download the package from this repository and include needpopup.min.js and needpopup.min.css.

```html
<!-- jQuery -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
<!-- needPopup Javascript file -->
<script src="js/needpopup.min.js"></script>
<!-- needPopup CSS file -->
<link href="css/needpopup.min.css" rel="stylesheet" />
```

###Step 2: Create HTML markup

Add `needpopup` class to the element you want to show, then bind caller functionality to any element with `data-needpopup-show` attribute.
The value of attribute should be selector to call necessary popup (it can be id or other unique selector).

```html
<a data-needpopup-show="#popup-id">Show popup</a>
<div id='popup-id' class="needpopup">Hello! I am popup.</div>
```

###Step 3: Call needPopup initialization

Just place `needPopup.init()` in your javascript code.

```javascript
needPopup.init();
```

##Customization

First of all you need to apply `data-needpopup-options` attribute to custom popup.
```html
<div id='custom-popup' class="needpopup" data-needpopup-options="custom">
  <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
</div>
```

Then in your Javascript code add property accordingly to name used in attrubute.
```javascript
needPopup.config.custom = {
  'removerPlace': 'outside',
  'closeOnOutside': false,
  onShow: function() {
    console.log('needPopup is shown');
  },
  onHide: function() {
    console.log('needPopup is hidden');
  }
};
```

That's all. You can create as many option sets as you wish.

###Options

**removerPlace**
Where to place remover
```
default: 'inside'
options: 'inside', 'outside'
```

**closeOnOutside**
Remove popup on click outside of it
```
default: true
options: true, false
```

###Callbacks

**onShow**
Calls immediately after the popup is shown
```
default: function(){}
options: function(popup){ // your code here }
arguments:
  popup: object that contained all necessary options to control current popup (for example popup.target - current popup element)
```

**onHide**
Calls immediately after the popup is removed
```
default: function(){}
options: function(popup){ // your code here }
arguments:
  popup: object that contained all necessary options to control current popup (for example popup.target - current popup element)
```
