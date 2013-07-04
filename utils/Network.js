define(
[],
function(
){
	var Network = function(){
		var self = this;

		/**
		* Performs an ajax call, providing callbacks for success and error.
		* 
		* @param {Object} settings
		*	settings.url {String} - URL you are requesting. @default null
		*	settings.method {String} - Method for the request. @default 'GET'
		*	settings.responseType {String} - Expected response type. @default null
		*	settings.context {Object} - Context for the callbacks. @default null
		*	settings.onSuccess {Function} - Callback when call is successfull. @default null
		*	settings.onError {Function} - Callback when call fails. @default null
		*	settings.data {String} - URL encoded data string. @default null
		* @returns null
		**/
		var ajax = function(settings){
			if(!settings) return;
			if(!settings.url) return;
			settings.method = settings.method || 'GET';
			settings.headers = settings.headers || {};

			var request;
			if (window.XMLHttpRequest) {
				request = new XMLHttpRequest();
			} else if (window.ActiveXObject) {
				try {
					request = new ActiveXObject("Msxml2.XMLHTTP");
				}
				catch (e) {
					try {
						request = new ActiveXObject("Microsoft.XMLHTTP");
					} 
					catch (e) {}
				}
			}
			if(!request) return;
			request.onload = function(){
				if (request.status === 200) {
					if(settings.onSuccess) settings.onSuccess.apply(settings.context, [request]);
				}
				else{
					if(settings.onError) settings.onError.apply(settings.context, [request]);
				}
			}
			request.onerror = function(){
				if(settings.onError) settings.onError.apply(settings.context, [request]);
			}
			request.onabort = function(){
				if(settings.onError) settings.onError.apply(settings.context, [request]);
			}
			request.ontimeout = function(){
				if(settings.onError) settings.onError.apply(settings.context, [request]);
			}

			if(settings.responseType) request.responseType = settings.responseType;

			request.open(settings.method, settings.url);
			for(key in settings.headers){
				request.setRequestHeader(key, settings.headers[key]);
			}
			request.send(settings.data);
		}

		Object.defineProperty(self, 'ajax', {
			value: ajax
		});
	}

	return Network;
});