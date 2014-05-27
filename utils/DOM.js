define(
[],
function(){

	var DOM = function(){
		var self = this;

		var hasClass = function (element,clss) {
			if(typeof element.classList === 'undefined') return element.className.match(new RegExp('(\\s|^)'+clss+'(\\s|$)'));
			else return element.classList.contains(clss)
		}
		var addClass = function (element,clss) {
			if(typeof element.classList === 'undefined'){
				if (!this.hasClass(element,clss)) element.className += " "+clss;
			}
			else{
				element.classList.add(clss)
			}			
		}
		var removeClass = function (element,clss) {
			if(typeof element.classList === 'undefined'){
				if (hasClass(element,clss)) {
					var reg = new RegExp('(\\s|^)'+clss+'(\\s|$)');
					element.className = element.className.replace(reg,' ');
				}
			}
			else{
				element.classList.remove(clss)
			}
		}
		var empty = function(element) {
			while (element.lastChild) element.removeChild(element.lastChild);
		}
		var measure = function(element){
			var width = element.offsetWidth;
			var height = element.offsetHeight;
			return {
				width: width,
				height: height
			}
		}
		var calculatePosition = function(element) {
			var curleft = 0;
			var curtop = 0;
			if (element && element.offsetParent) {
				do {
					curleft += element.offsetLeft;
					curtop += element.offsetTop;
				} while (element = element.offsetParent);
			}
			return { x: curleft, y: curtop };
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

		Object.defineProperty(self, 'calculatePosition', {
			value: calculatePosition
		});
	}
	
	return DOM;
});