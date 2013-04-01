define(
[],
function(){

	var DOM = function(){
		var self = this;

		var hasClass = function (element,cls) {
			return element.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'));
		}
		var addClass = function (element,cls) {
			if (!this.hasClass(element,cls)) element.className += " "+cls;
		}
		var removeClass = function (element,cls) {
			if (hasClass(element,cls)) {
				var reg = new RegExp('(\\s|^)'+cls+'(\\s|$)');
				element.className = element.className.replace(reg,' ');
			}
		}
		var empty = function(element) {
			while (element.hasChildNodes()) element.removeChild(element.lastChild);
		}
		var measure = function(element){
			var width = element.offsetWidth;
			var height = element.offsetHeight;
			return {
				width: width,
				height: height
			}
		}

		Object.defineProperty(self, 'hasClass', {
			value: hasClass
		});

		Object.defineProperty(self, 'addClass', {
			value: addClass
		});

		Object.defineProperty(self, 'removeClass', {
			value: removeClass
		});

		Object.defineProperty(self, 'empty', {
			value: empty
		});

		Object.defineProperty(self, 'measure', {
			value: measure
		});
	}
	
	return DOM;
});