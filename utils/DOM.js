define(
[],
function(){

	var DOM = function(){
		var self = this;

		var hasClass = function (element,class) {
			if(typeof element.classList === 'undefined') return element.className.match(new RegExp('(\\s|^)'+class+'(\\s|$)'));
			else return element.classList.contains(class)
		}
		var addClass = function (element,class) {
			if(typeof element.classList === 'undefined'){
				if (!this.hasClass(element,class)) element.className += " "+class;
			}
			else{
				element.classList.add(class)
			}			
		}
		var removeClass = function (element,class) {
			if(typeof element.classList === 'undefined'){
				if (hasClass(element,class)) {
					var reg = new RegExp('(\\s|^)'+class+'(\\s|$)');
					element.className = element.className.replace(reg,' ');
				}
			}
			else{
				element.classList.remove(class)
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