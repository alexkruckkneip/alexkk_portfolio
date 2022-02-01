// ---------- ---------- ---------- ---------- ----------
// loader
// ---------- ---------- ---------- ---------- ----------


// Fade Out function
// ---------- ---------- ---------- ---------- ----------
function fadeOut(ms, el) {
  var opacity  = 1,
      interval = 50,
      gap      = interval / ms;

  function func() {
    opacity -= gap;
    el.style.opacity = opacity;

    if(opacity <= 0) {
      window.clearInterval(fading);
      el.style.display = 'none';
    }
  }
  var fading = window.setInterval(func, interval);
}

// Define transition function
// ---------- ---------- ---------- ---------- ----------
function loaded() {
  // Define our variables
  var docBody  = document.body,
      anchors  = document.getElementsByTagName('a');

  // Add loaded class to body
  docBody.className += ' loaded';

  // For each link
  for (var i = 0; i < anchors.length; i++) {

    // Click function
    anchors[i].onclick = function(e) {

      // Cache our anchor
      var el = this;

      // Stop default action
      e.preventDefault();

      // Fade out body
      fadeOut(150, docBody);

      // Change page after fade out
      setTimeout( function() { location = el.href }, 150 );
    }
  }
}

// Fire transition function
window.onload = loaded;


// ---------- ---------- ---------- ---------- ----------
// smooth scrolling
// ---------- ---------- ---------- ---------- ----------

// Tania - https://codepen.io/taniarascia/
// https://codepen.io/taniarascia/pen/MJEXZj
$(function() {
  $("button[href^='#']").click(function(e) {
  	e.preventDefault();

  	var position = $($(this).attr("href")).offset().top;

  	$("body, html").animate({
  		scrollTop: position
  	} , 1200 );
  });
});


// ---------- ---------- ---------- ---------- ----------
// scroll trigger event
// ---------- ---------- ---------- ---------- ----------

(function($) {

  /**
   * Copyright 2012, Digital Fusion
   * Licensed under the MIT license.
   * http://teamdf.com/jquery-plugins/license/
   *
   * @author Sam Sehnert
   * @desc A small plugin that checks whether elements are within
   *     the user visible viewport of a web browser.
   *     only accounts for vertical position, not horizontal.
   */

  $.fn.visible = function(partial) {

      var $t            = $(this),
          $w            = $(window),
          viewTop       = $w.scrollTop(),
          viewBottom    = viewTop + $w.height(),
          _top          = $t.offset().top,
          _bottom       = _top + $t.height(),
          compareTop    = partial === true ? _bottom : _top,
          compareBottom = partial === true ? _top : _bottom;

    return ((compareBottom <= viewBottom) && (compareTop >= viewTop));

  };

})(jQuery);

$(window).scroll(function(event) {

  // Opens the gate on the start page when scrolling down
  $(document).ready(function() {
  $(window).scroll(function() {
    if ($(document).scrollTop() > 50) {
        $(".start__gate").removeClass("start__gate--closed");
      } else {
        $(".start__gate").addClass("start__gate--closed");
      }
    });
  });

  // hide start gate elements
  $(document).ready(function() {
  $(window).scroll(function() {
    if ($(document).scrollTop() > (window.innerHeight - 20) ) {
        $(".start__gate").removeClass("start__gate--visible");
      } else {
        $(".start__gate").addClass("start__gate--visible");
      }
    });
  });

  // Animate the devices
  $(".device__body").each(function(i, el) {
    var el = $(el);
    if (el.visible(true)) {
      el.addClass("visible");
    } else {
      el.removeClass("visible");
    }
  });

  // Show the button to scroll down to the next slide
  $(".text__wrapper").each(function(i, el) {
    var el = $(el);
    if (el.visible(true)) {
      el.addClass("active");
    } else {
      el.removeClass("active");
    }
  });

});

// Full screen in example in devices

$(function() {
  $("button.button__full-screen").click(function() {
    $(this).closest(".device__body").toggleClass("device__zoom--full");
 });
});


// ---------- ---------- ---------- ---------- ----------
// Open Menu
// ---------- ---------- ---------- ---------- ----------

$(function() {
  $("button.navbar__toggler").click(function() {
		$('#navbar__menu__nav').toggleClass("navbar__collapse--open");
    $(this).toggleClass("navbar__toggler--open");
 });
 $(".navbar__close-area").click(function() {
   $('#navbar__menu__nav').removeClass("navbar__collapse--open");
   $('button.navbar__toggler').removeClass("navbar__toggler--open");
 });
});
