define(function(){
	return window.console || {
		info: function () {},
		log: function () {},
		debug: function () {},
		warn: function () {},
		error: function () {}
	};
});