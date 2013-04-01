define(
[
	'happy/_libs/glmatrix',
],
function
(
	math
){
	var Matrix = function(){
		var
		self = this,
		nativeMatrix = math.mat4.create(),
		stack = [];

		var push = function() {
			var copy = math.mat4.create();
			math.mat4.set(nativeMatrix, copy);
			stack.push(copy);
		}
		var pop = function() {
			if (stack.length == 0) {
				throw "Invalid popMatrix!";
			}
			nativeMatrix = stack.pop();
		}
		var reset = function(){
			math.mat4.identity(nativeMatrix);
		}
		var perspective = function(verticalFOV, aspect, nearClip, farClip){
			math.mat4.perspective(verticalFOV, aspect, nearClip, farClip, nativeMatrix);
		}
		var scaleX = function(value){
			scale([value,1,1]);
		}
		var scaleY = function(value){
			scale([1,value,1]);
		}
		var scaleZ = function(value){
			scale([1,1,value]);
		}
		var scaleAll = function(value){
			scale([value,value,value]);
		}
		var scale = function(vec){
			math.mat4.scale(nativeMatrix, vec);
		}
		var rotateX = function(angleRadians){
			math.mat4.rotateX(nativeMatrix, angleRadians);
		}
		var rotateY = function(angleRadians){
			math.mat4.rotateY(nativeMatrix, angleRadians);
		}
		var rotateZ = function(angleRadians){
			math.mat4.rotateZ(nativeMatrix, angleRadians);
		}
		var rotate = function(angleRadians, axis){
			math.mat4.rotate(nativeMatrix, angleRadians, axis);
		}
		var translateX = function(value){
			translate([value,0,0]);
		}
		var translateY = function(value){
			translate([0,value,0]);
		}
		var translateZ = function(value){
			translate([0,0,value]);
		}
		var translate = function(position){
			math.mat4.translate(nativeMatrix, position);
		}
		var getNative = function(){
			return nativeMatrix;
		}
		var setNative = function(m){
			nativeMatrix = m;
		}
		var getInverse = function(){
			var inverse = math.mat4.create();
			return math.mat4.inverse(nativeMatrix, inverse);
		}

		reset();

		Object.defineProperty(self, 'push', {
			value: push
		});
		Object.defineProperty(self, 'pop', {
			value: pop
		});
		Object.defineProperty(self, 'reset', {
			value: reset
		});
		Object.defineProperty(self, 'perspective', {
			value: perspective
		});
		Object.defineProperty(self, 'scaleX', {
			value: scaleX
		});
		Object.defineProperty(self, 'scaleY', {
			value: scaleY
		});
		Object.defineProperty(self, 'scaleZ', {
			value: scaleZ
		});
		Object.defineProperty(self, 'scaleAll', {
			value: scaleAll
		});
		Object.defineProperty(self, 'scale', {
			value: scale
		});
		Object.defineProperty(self, 'rotateX', {
			value: rotateX
		});
		Object.defineProperty(self, 'rotateY', {
			value: rotateY
		});
		Object.defineProperty(self, 'rotateZ', {
			value: rotateZ
		});
		Object.defineProperty(self, 'rotate', {
			value: rotate
		});
		Object.defineProperty(self, 'translateX', {
			value: translateX
		});
		Object.defineProperty(self, 'translateY', {
			value: translateY
		});
		Object.defineProperty(self, 'translateZ', {
			value: translateZ
		});
		Object.defineProperty(self, 'translate', {
			value: translate
		});
		Object.defineProperty(self, 'native', {
			get: getNative,
			set: setNative
		});
		Object.defineProperty(self, 'inverse', {
			get: getInverse
		});
	}
	return Matrix;
});