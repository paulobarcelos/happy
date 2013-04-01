define(
[
	'happy/audio/AudioFile',
	'happy/polyfill/console'
],	
function
(
	AudioFile,
	console
){
	"use strict";

	var AudioFileFactory = function(audioContext){
		var
		self = this,
		resgistry = {},
		isReady,
		productionTolerance = 0.0,
		productionRequestsControl = {}; 

		var register = function(array) {
			for (var i = 0; i < array.length; i++) {
				resgistry[array[i].id] = {
					id: array[i].id,
					url: array[i].url,
					helper: new AudioFile(audioContext)
				}
			};		
		}
		var load = function(options){
			options = options || {};
			options.onSuccess = options.onSuccess || function(){};
			options.onError = options.onError || function(){};
			options.context = options.context || window;
			for(var id in resgistry){
				var entry = resgistry[id];
				if(!entry.isReady){
					entry.helper.load({
						url: entry.url,
						onSuccess: function(){
							onAudioLoaded(entry.id, options.onSuccess, options.context);
						},
						onError: options.onError,
						context: options.context
					});
				}
			}
		}
		var onAudioLoaded = function(id, callback, context){
			var allLoaded = true;
			for(id in resgistry){
				var entry = resgistry[id];
				if(!entry.helper.isReady){
					allLoaded = false;
					break;
				}
			}
			if(allLoaded){
				callback.apply(context);
			}
		}
		var produce = function(id){
			if(productionRequestsControl[id]){
				var control = audioContext.currentTime - productionRequestsControl[id];
				if(control < productionTolerance){
					return;
				}
			}
			productionRequestsControl[id] = audioContext.currentTime;

			var entry = resgistry[id];
			if(!entry){
				console.log(id + ' is not a valid id.');
				return;
			}
			else if(!entry.helper.isReady){
				console.log(id + ' is not ready.');
				return;
			}
			var audioFile = new AudioFile(audioContext);
			audioFile.buffer = entry.helper.buffer;
			return audioFile;
		}

		var setProductionTolerance = function(value){
			productionTolerance = value;
		}
		var getProductionTolerance = function(){
			return productionTolerance
		}
		
		Object.defineProperty(self, 'register', {
			value: register
		});
		Object.defineProperty(self, 'load', {
			value: load
		});
		Object.defineProperty(self, 'produce', {
			value: produce
		});
		Object.defineProperty(self, 'productionTolerance', {
			get: getProductionTolerance,
			set: setProductionTolerance
		});
	}
	return AudioFileFactory;
});