define(
[
	'happy/audio/Sound',
	'happy/utils/Network',
],
function
(
	Sound,
	Network
){
	"use strict";

	var network = new Network();

	var AudioFile = function(audioContext){
		var
		self = this,
		buffer,
		sound = new Sound(audioContext),
		// settable
		loop = false,
		gain = 1.0,
		speed = 1.0,
		sqrtSpeed = 1.0,
		// readonly
		isReady = false,
		duration = 0.0,
		// helpers
		timeAtspeedModification = 0,
		progress = 0;

		var getSound = function() {
			return sound;
		}
		var load = function(options){
			if(!options.url) return;
			isReady = false;

			options.onSuccess = options.onSuccess || function(){};
			options.onError = options.onError || function(){};
			options.context = options.context || window;

			var onErrorHandler = function(argument){
				options.onError.apply(options.context, [argument]);
			}
			var onSuccessHandler = function(argument){
				options.onSuccess.apply(options.context, [argument]);
			}

			network.ajax({
				url: options.url,
				responseType: 'arraybuffer',
				onSuccess: function(request){
					audioContext.decodeAudioData(
						request.response, 
						function(decodedBuffer) {
							setBuffer(decodedBuffer);
							onSuccessHandler();
						}, 
						onErrorHandler
					);
				},
				onError: onErrorHandler

			});
		}
		var setBuffer = function(value){
			buffer = value;
			duration = buffer.duration / sqrtSpeed;
			sound.refreshSource();
			isReady = true;
		}
		var getBuffer = function(){
			return buffer;
		}
		var setLoop = function(value) {
			loop = value;
			if(isReady)sound.source.loop = loop;
		}
		var getLoop = function() {
			return loop;
		}
		var setGain = function(value) {
			gain = value;
			if(isReady) sound.source.gain.value = gain;
		}
		var getGain = function() {
			return gain;
		}
		var setSpeed = function(value) {
			speed = value;
			sqrtSpeed = Math.sqrt(speed);
			if(isReady){
				sound.source.playbackRate.value = speed;
				duration = buffer.duration / sqrtSpeed;
				updateProgress();
				if(audioContext.currentTime < sound.scheduledPlayTime){
					timeAtspeedModification = sound.scheduledPlayTime;
				}
				else{
					timeAtspeedModification = audioContext.currentTime;
				}
					
			}
		}
		var getSpeed = function() {
			return speed;
		}
		var getIsReady = function() {
			return isReady;
		}
		var getDuration = function() {
			return duration;
		}
		var updateProgress = function() {
			if(audioContext.currentTime < sound.scheduledPlayTime){
				progress = 0.0;
			}
			else{
				var deltaTime = (audioContext.currentTime - timeAtspeedModification) * sqrtSpeed;
				var deltaProgress = deltaTime / duration;
				progress += deltaProgress;
				if(progress > 1) progress = progress - 1;
			}
		}
		var getProgress = function(){
			return progress;
		}
		var onSoundPlayed = function(){
			timeAtspeedModification = sound.scheduledPlayTime;
		}

		// Implement compatible sound.createSource function
		sound.createSource = function() {
			var source = audioContext.createBufferSource();
			source.buffer = buffer;
			source.loop = loop;
			source.gain.value = gain;
			source.playbackRate.value = speed;
			return source;
		}
		sound.played.add(onSoundPlayed);
		
		
		Object.defineProperty(self, 'load', {
			value: load
		});
		Object.defineProperty(self, 'updateProgress', {
			value: updateProgress
		});
		Object.defineProperty(self, 'sound', {
			get: getSound
		});
		Object.defineProperty(self, 'isReady', {
			get: getIsReady
		});
		Object.defineProperty(self, 'duration', {
			get: getDuration
		});
		Object.defineProperty(self, 'progress', {
			get: getProgress
		});
		Object.defineProperty(self, 'buffer', {
			get: getBuffer,
			set: setBuffer
		});
		Object.defineProperty(self, 'gain', {
			get: getGain,
			set: setGain
		});
		Object.defineProperty(self, 'speed', {
			get: getSpeed,
			set: setSpeed
		});
		Object.defineProperty(self, 'loop', {
			get: getLoop,
			set: setLoop
		});
		
	}
	return AudioFile;
});