
var SESSION_COOKIE = "session";
var PRO_ROL = 'pro-rol';
var EST_ROL = 'est-rol';
var ADM_ROL = 'adm-rol';
var SAD_ROL = 'sad-rol';
var CON_URL = "http://ranking.indesap.com/server/WebService.asmx/entry";

(function($) {

	skel.breakpoints({
		wide: '(min-width: 961px) and (max-width: 1880px)',
		normal: '(min-width: 961px) and (max-width: 1620px)',
		narrow: '(min-width: 961px) and (max-width: 1320px)',
		narrower: '(max-width: 960px)',
		mobile: '(max-width: 736px)'
	});

	$('body').removeClass('in-login');
	$('#cont').load('views/main.html');

})(jQuery);

function utf8_to_b64( str ) {
  return window.btoa(unescape(encodeURIComponent( str )));
}

function b64_to_utf8( str ) {
  return decodeURIComponent(escape(window.atob( str )));
}