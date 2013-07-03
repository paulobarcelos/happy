define(
[
	'happy/polyfill/console',
	'happy/_libs/signals'
],
function(
	console,
	Signal
){
	"use strict";
	var ID_FACTORY = 0;

	var Connection = function(node, outputIndex, inputIndex){
		this.outputIndex = outputIndex;
		this.inputIndex = inputIndex;
		this.node = node;
	}

	var Node = function(nativeNode){
		var
		self = this,
		id = ID_FACTORY++,
		inputs = [],
		outputs = [],
		connected = new Signal(),
		disconnected = new Signal();

		var connect = function(node, outputIndex, inputIndex) {
			outputIndex = outputIndex || 0;
			inputIndex = inputIndex || 0;
			
			// connect the native nodes
			nativeNode.connect(node.native, outputIndex, inputIndex);
			// notify the node we are connecting to
			node.handleInputConnection(self, outputIndex, inputIndex);
			// store the ouputs
			var connection = new Connection(node, outputIndex, inputIndex);
			outputs.push(connection);
			// dispatch the signal
			connected.dispatch(self, node);

			// return node to allow chaining
			return node;
		}
		var disconnect = function(node) {
			var connection;
			for (var i = outputs.length - 1; i >= 0; i--) {
				if(outputs[i].node.id == node.id){
					// store the connection
					connection = outputs[i]
					// remove it from the array
					outputs.splice(i, 1);
					break;
				}
			}
			if(connection){
				// disconnect the native nodes
				// this is a turn off...
				// In the current implementation, disconnect will close ALL
				// connections in the specified input, so all this logic here
				// seems a bit useless now, but anyway let's keep it here
				// hopping it will be implmented in the future
				nativeNode.disconnect(connection.index); // should be -> nativeNode.disconnect(connection.node.native, connection.index); 
				// notify the output we are disconnecting from it
				connection.node.handleInputDisconnection(self);
				// dispatch the signal
				disconnected.dispatch(self, node);
			}
		}
		var disconnectAll = function () {
			for (var i = 0; i < outputs.length; i++) {
				if(outputs[i]) disconnect(outputs[i].node);
			}
			outputs = [];
		}
		var handleInputConnection = function(node, outputIndex, inputIndex) {
			var connection = new Connection(node, outputIndex, inputIndex);
			inputs.push(connection);
		}
		var handleInputDisconnection = function(node) {
			for (var i = inputs.length - 1; i >= 0; i--) {
				if(inputs[i].id  === node.id){
					inputs[i].splice(i, 1);
					break
				}
			};
		}
		var toString = function() {
			return '[Node ' + id + ']';
		}
		var getInputs = function() {
			return inputs;
		}
		var getOutputs = function() {
			return outputs;
		}
		var getId = function() {
			return id;
		}
		var getNative = function() {
			return nativeNode;
		}
		var getConnectedSignal = function(){
			return connected;
		}
		var getDisconnectedSignal = function(){
			return disconnected;
		}

		Object.defineProperty(self, 'connect', {
			value: connect
		});
		Object.defineProperty(self, 'disconnect', {
			value: disconnect
		});
		Object.defineProperty(self, 'disconnectAll', {
			value: disconnectAll
		});
		Object.defineProperty(self, 'handleInputConnection', {
			value: handleInputConnection
		});
		Object.defineProperty(self, 'handleInputDisconnection', {
			value: handleInputDisconnection
		});
		Object.defineProperty(self, 'toString', {
			value: toString
		});
		Object.defineProperty(self, 'inputs', {
			get: getInputs
		});
		Object.defineProperty(self, 'outputs', {
			get: getOutputs
		});
		Object.defineProperty(self, 'id', {
			get: getId
		});
		Object.defineProperty(self, 'native', {
			get: getNative
		});
		// also make the signals available
		Object.defineProperty(self, 'connected', {
			get: getConnectedSignal
		});
		Object.defineProperty(self, 'disconnected', {
			get: getDisconnectedSignal
		});
	}
	return Node;
});