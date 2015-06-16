/*!
 * needPopup: responsive popup
 *
 * Copyright (c) 2014 Dzmitry Vasileuski
 * Licensed under the MIT License
 *
 * Version: 1.0.0
 */

// popups init

var needPopup = (function() {

	// namespace
	var popup = {};
	// cached nodes
	popup.html = document.documentElement,
  popup.body = document.body,
  popup.window = window,
  // state variables
	popup.target = 0, 
	// window scroll top
  popup.scrollTopVal = 0,
  // window scroll height
  popup.scrollHeight = popup.body.scrollHeight > popup.html.scrollHeight ? popup.body.scrollHeight : popup.html.scrollHeight,
  // html class when popup is opened
  popup.openHtmlClass = popup.scrollHeight > popup.window.innerHeight ? 'needpopup-opened needpopup-scrolled' : 'needpopup-opened';

	// global
	return {

		// init popups
		init : function() {

			// set default config
			popup.options = needPopup.config.default;

			// bind popup show to data-popupshow nodes
			$(popup.body).on('click','[data-needpopup-show]', function(event) {
				event.preventDefault();
				needPopup.show($(this).data('needpopupShow'));
			})

			// bind popup hide to removers
			$(popup.body).on('click','.needpopup_wrapper .close', function(event) {
				event.preventDefault();
				needPopup.hide();
			})

			// bind popup hide if clicked outside
			$(popup.body).on('click','.needpopup_wrapper', function(event) {
				event.preventDefault();
				event.stopPropagation();
				if (!popup.options.closeOnOutside) return;
				
				// check if clicked outside of popup window
				if ($(event.target).closest('.needpopup-opened').length || $(event.target).is('.needpopup-opened, .close')) return;

				needPopup.hide();
			})

			// hide popup on Esc
			$(document).keydown(function(event){
				if (event.which == 27) {
					needPopup.hide();
				}
			})

			// corrections on window resize
			$(popup.window).on('resize',function() {
				// centrify popup
				needPopup.centrify();
				// recalculate window scroll height
				popup.scrollHeight = popup.body.scrollHeight > popup.html.scrollHeight ? popup.body.scrollHeight : popup.html.scrollHeight,
				// change open htmml class if needed
		 		popup.openHtmlClass = popup.scrollHeight > popup.window.innerHeight ? 'needpopup-opened needpopup-scrolled' : 'needpopup-opened';
			})

			// create popup wrapper
			popup.wrapper = document.createElement('div');
			popup.wrapper.className = 'needpopup_wrapper';
			popup.body.appendChild(popup.wrapper);
			popup.wrapper = $(popup.wrapper);
		},

		// show popup
		show : function(_target) {

			// hide already opened popup
			if (popup.target)
				needPopup.hide(true);

			// set target popup
			popup.target = $(_target);

			// reset options if defined
			if (!!popup.target.data('needpopupOptions'))
				popup.options = needPopup.config[popup.target.data('needpopupOptions')];

			// recalculate window scroll top
			popup.scrollTopVal = popup.window.pageYOffset;

			// block page scroll
			$(popup.body).css({'top': -popup.scrollTopVal});
			$(popup.html).addClass(popup.openHtmlClass);

			// create layout
			popup.wrapper.append(popup.target);
			if (popup.options.removerPlace == 'outside')
				popup.target.after('<a href="#" class="close needpopup_remover">×</a>');
			else if (popup.options.removerPlace == 'inside')
				popup.target.append('<a href="#" class="close needpopup_remover">×</a>');
			
			// display popup
			popup.target.show();
			// centrify popup
			needPopup.centrify();
			// add opened class to popup (timeout for transitions)
			setTimeout(function(){
				popup.target.addClass('opened');

				// on show callback
				popup.options.onShow.call(popup);
			},10);
		},

		// hide popup
		hide : function(_partial) {

			// hide popup and unset property
			popup.target.hide().removeClass('opened');
			popup.target = 0;
			// remove close
			$('.needpopup_remover').remove();

			// full hiding
			if (!_partial) {

				// unblock page scroll
				$(popup.html).removeClass(popup.openHtmlClass);
				$(popup.body).css({'top': 0}).scrollTop(popup.scrollTopVal);
				$(popup.html).scrollTop(popup.scrollTopVal);
			}

			// on hide callback
			popup.options.onHide.call(popup);
		},

		// centrify popup
		centrify: function() {
			if (popup.target)
				if (popup.target.outerHeight() > popup.window.innerHeight)
					popup.target.addClass('stacked').css({'margin-top':'0', 'top':'0'});
				else
					popup.target.removeClass('stacked').css({'margin-top':-popup.target.outerHeight()/2, 'top':'50%'});
		},

		// configuration object which contains all options sets
		'config': {
			'default' : { 
				// 'outside' to place in wrapper and 'inside' to place in popup
				'removerPlace': 'outside',
				// close on click outside popup
				'closeOnOutside': true,
				// on show callback
				onShow: function() {},
				// on hide callback
				onHide: function() {}
			}
		}
	}
})();
