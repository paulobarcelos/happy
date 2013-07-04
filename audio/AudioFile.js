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
		loopStart = 0.0,
		loopEnd = 1.0,
		gain = 1.0,
		speed = 1.0,
		sqrtSpeed = 1.0,
		// readonly
		isReady = false,
		//isPaused = false,
		duration = 0.0,
		progress = 0.0,
		// helpers
		//pauseInitialTimeReference,
		//timeAtPause = 0.0,
		timeAtSpeedModification = 0.0;
		
		
	
		var load = function(options){
			if(!options.url) return;
			isReady = false;

			options.onSuccess = options.onSuccess || function(){};
			options.onError = options.onError || function(){};
			options.context = options.context || window;

			var onErrorHandler = function(argumentArray){
				options.onError.apply(options.context, argumentArray);
			}
			var onSuccessHandler = function(argumentArray){
				options.onSuccess.apply(options.context, argumentArray);
			}

			network.ajax({
				url: options.url,
				responseType: 'arraybuffer',
				onSuccess: function(request){
					audioContext.decodeAudioData(
						request.response, 
						function(decodedBuffer) {
							setBuffer(decodedBuffer);
							onSuccessHandler([self]);
						}, 
						function(errorArgument){
							onErrorHandler([self, errorArgument]);
						}
					);
				},
				onError: function(errorArgument){
					onErrorHandler([self, errorArgument]);
				}

			});
		}
		/**
		 * Plays the `sound` object.
		 *
		 * @param {Number} [when="0"] Start delay.
		 * @param {Number} [offset="0"] Normalized offset from the start of the buffer.
		 * @param {Number} [duration="1 - offset"] Normalized duration of the playback. 
		 **/
		var play = function(when, offset, duration){
			if(typeof when == 'undefined') when = 0;
			if(typeof offset == 'undefined') offset = 0;
			if(typeof duration == 'undefined') duration = 1 - offset;

			var offsetInSeconds = buffer.duration * offset;
			var durationInSeconds = buffer.duration * duration;

			sound.play(when, offsetInSeconds, durationInSeconds);

			//if(typeof pauseInitialTimeReference == 'undefined' ) pauseInitialTimeReference = sound.scheduledPlayTime;
		}
		var stop = function(when){
			if(typeof when == 'undefined') when = 0;

			sound.stop(when);

			//pauseInitialTimeReference = undefined;
		}
		/*var pause = function(){
			timeAtPause = audioContext.currentTime;
			isPaused = true;
			stop();
		}*/
		var connectSoundRoot = function(node){
			sound.root.connect(node);
		}
		var disconnectSoundRoot = function(node){
			sound.root.disconnect(node);
		}
		var setBuffer = function(value){
			buffer = value;
			duration = buffer.duration / sqrtSpeed;
			isReady = true;
			sound.refreshSource();
			
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
		var setLoopStart = function(value) {
			loopStart = value;
			if(isReady) sound.source.loopStart = loopStart * duration;
		}
		var getLoopStart = function() {
			return loopStart;
		}
		var setLoopEnd = function(value) {
			loopEnd = value;
			if(isReady) sound.source.loopEnd = loopEnd * duration;
		}
		var getLoopEnd = function() {
			return loopEnd;
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
					timeAtSpeedModification = sound.scheduledPlayTime;
				}
				else{
					timeAtSpeedModification = audioContext.currentTime;
				}
					
			}
		}
		var getSpeed = function() {
			return speed;
		}
		var getSound = function() {
			return sound;
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
				var deltaTime = (audioContext.currentTime - timeAtSpeedModification) * sqrtSpeed;
				var deltaProgress = (duration) ? deltaTime / duration : 0;

				progress += deltaProgress;
				console.log(deltaProgress)
				if(progress > 1) progress = progress - 1;
			}
		}
		var getProgress = function(){
			updateProgress();
			return progress;
		}
		var onSoundPlayed = function(){
			timeAtSpeedModification = sound.scheduledPlayTime;
		}

		// Implement compatible sound.createSource function
		sound.createSource = function() {
			var source = audioContext.createBufferSource();
			source.buffer = buffer;
			source.loop = loop;
			source.loopStart = loopStart * duration;
			source.loopEnd = loopEnd * duration;
			source.gain.value = gain;
			source.playbackRate.value = speed;
			return source;
		}
		sound.played.add(onSoundPlayed);
		
		
		Object.defineProperty(self, 'load', {
			value: load
		});
		Object.defineProperty(self, 'play', {
			value: play
		});
		Object.defineProperty(self, 'stop', {
			value: stop
		});
		/*Object.defineProperty(self, 'pause', {
			value: pause
		});*/
		Object.defineProperty(self, 'connectSoundRoot', {
			value: connectSoundRoot
		});
		Object.defineProperty(self, 'disconnectSoundRoot', {
			value: disconnectSoundRoot
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
		Object.defineProperty(self, 'loopStart', {
			get: getLoopStart,
			set: setLoopStart
		});
		Object.defineProperty(self, 'loopEnd', {
			get: getLoopEnd,
			set: setLoopEnd
		});
		
	}
	return AudioFile;
});