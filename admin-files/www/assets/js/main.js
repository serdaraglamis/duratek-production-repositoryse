
var initAOS = function() {
	var myAOS = new AOS.init({
		offset: 0,
		duration: 400,
		easing: 'ease-in-out-quart',
		delay: 300
	});
}

function closeCookieNatification() {
	var module = document.getElementById("module-50");
	module.classList.remove("opened");
}


// --

window.onscroll = function() {
	gnTightier();
};

function gnTightier() {
	var mainNavigation = document.querySelector('.global-nav');
	if(window.pageYOffset > 10) {
		if(!mainNavigation.classList.contains('tight')) {
			mainNavigation.classList.add('tight');
			document.querySelector('.gn-subnav').classList.add('tight');;
		}	
	} else {
		if(mainNavigation.classList.contains('tight')) {
			mainNavigation.classList.remove('tight');
			document.querySelector('.gn-subnav').classList.remove('tight');
		}	
	}
}



//	================================================================ //
//	Page Initialize Functions
//	================================================================ //
var init = function() {
	initAOS();	
}

document.addEventListener("DOMContentLoaded", function() {
	init();
});
