define(
[
	'happy/audio/Node',
	'happy/polyfill/console',
	'happy/_libs/signals'
],
function
(
	Node,
	console,
	Signal
){
	"use strict";
	var Sound = function(audioContext){
		var
		self = this,
		rootNode,
		source,
		scheduledPlayTime,
		scheduledStopTime,
		played = new Signal(),
		stopped = new Signal();


		var play = function(when, offset, duration){
			when = when || 0;
			scheduledPlayTime = audioContext.currentTime + when;

			// Implementation of AudioBufferSourceNode.start() seems 
			// a bit wonky regarding the default values, hence this
			// dirty trick to make sure we don't pass in faulty 
			// undefined parameters
			if(typeof offset == 'undefined' && typeof duration == 'undefined' ){
				source.start(scheduledPlayTime);
			}
			else if(typeof duration == 'undefined' ){
				source.start(scheduledPlayTime, offset);
			}
			else {
				source.start(scheduledPlayTime, offset, duration);
			}
	
			played.dispatch(self);
		}
		var stop = function(when){
			when = when || 0;
			scheduledStopTime = audioContext.currentTime + when;
			source.stop(scheduledStopTime);
			stopped.dispatch(self);

			refreshSource();	
		}
		var refreshSource = function() {
			// Store current outputs
			var outputs = [];

			if(rootNode){
				outputs = rootNode.outputs.slice();
				rootNode.disconnectAll();
			}
			// Regenerate the source and create a fresh
			// rootNode from that source

			/**
			 * The self.createSource needs to be implement by
			 * whatever the interface which is manipulating the 
			 * sound. @see AudioFile.js -> sound.createSource  for
			 * an example.
			 **/
			if(self.createSource) source = self.createSource();
			else source = defaultCreateSource();
			
			rootNode = new Node(source);
			
			// If there were any previous outputs, connect to them
			for (var i = 0; i < outputs.length; i++) {
				var output = outputs[i];

				rootNode.connect(output.node, output.outputIndex, output.inputIndex);
			}
		}
		var getSource = function(){
			return source;
		}
		var setSource = function(value){
			source = value;
		}
		var getRoot = function() {
			return rootNode;
		}
		var setRoot = function(value) {
			rootNode = value;
		}
		var getTerminals = function() {
			var terminalNodes = [];
			var startOutputs = [rootNode];
			transverseTerminalNodes(startOutputs, function(node) {
				terminalNodes.push(node);
			});
			return terminalNodes;
		}
		var getScheduledPlayTime = function() {
			return scheduledPlayTime;
		}
		var getScheduledStopTime = function() {
			return scheduledStopTime;
		}
		var getPlayedSignal = function() {
			return played;
		}
		var getStoppedSignal = function() {
			return stopped;
		}
		var transverseTerminalNodes = function(array, callback) {
			for (var i = 0; i < array.length; i++) {
				var outputs = array[i].outputs;
				if(!outputs.length){
					callback.apply(self, [array[i]]);
				}			
				else{
					transverseTerminalNodes(outputs, callback);
				}
					
			}
		}
		var defaultCreateSource = function () {
			console.log('createSource Function not implemented, source will be set to null.');
		}

		Object.defineProperty(self, 'play', {
			value: play
		});
		Object.defineProperty(self, 'stop', {
			value: stop
		});
		Object.defineProperty(self, 'refreshSource', {
			value: refreshSource
		});
		Object.defineProperty(self, 'source', {
			get: getSource,
			set: setSource
		});
		Object.defineProperty(self, 'root', {
			get: getRoot,
			set: setRoot
		});
		Object.defineProperty(self, 'terminals', {
			get: getTerminals,
		});
		Object.defineProperty(self, 'scheduledPlayTime', {
			get: getScheduledPlayTime,
		});
		Object.defineProperty(self, 'scheduledStopTime', {
			get: getScheduledStopTime,
		});
		// expose signals
		Object.defineProperty(self, 'played', {
			get: getPlayedSignal,
		});
		Object.defineProperty(self, 'stopped', {
			get: getStoppedSignal,
		});
	}
	return Sound;
});