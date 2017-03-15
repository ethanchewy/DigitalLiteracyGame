$( document ).ready(function() {
	window.onscroll = function (e) {  
		// called when the window is scrolled.  
		var images = document.getElementsByClassName('profileLink');
		for (var i = 0, l = images.length; i < l; i++) {
		  images[i].innerHTML = "TEST";
		}
	};
});

//$(document).ready(myfunc);