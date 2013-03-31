define(
[
],
function (
){
	if(window.FormData) return window.FormData;
	
	var FormData = function(){
		var 
		self = this,
		fake,
		boundary,
		fields;

		var init = function(){
			fake = true;
			boundary = "--------FormData" + Math.random();
			fields = [];
		}
		var append = function(key, value) {
			fields.push([key, value]);
		}
		var toString = function() {
			var body = "";
			fields.forEach(function(field) {
				body += "--" + boundary + "\r\n";
				// file upload
				if (field[1].name) {
					var file = field[1];
					body += "Content-Disposition: form-data; name=\""+ field[0] +"\"; filename=\""+ file.name +"\"\r\n";
					body += "Content-Type: "+ file.type +"\r\n\r\n";
					body += file.getAsBinary() + "\r\n";
				} else {
					body += "Content-Disposition: form-data; name=\""+ field[0] +"\";\r\n\r\n";
					body += field[1] + "\r\n";
				}
			});
			body += "--" + boundary +"--";
			return body;
		}
		var getFake = function(){
			return fake;
		}

		Object.defineProperty(self, 'append', {
			value: append
		});
		Object.defineProperty(self, 'toString', {
			value: toString
		});
		Object.defineProperty(self, 'fake', {
			get: getFake
		});

		init();
	}
	return FormData;
});