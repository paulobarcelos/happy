define(
[
	'happy/gl/Matrix',
],
function
(
	Matrix
){
	"use strict";
	var PerspectiveCamera = function(){
		var
		self = this,
		matrix = new Matrix(),
		verticalFOV = 45,
		aspect = 16/9,
		nearClip = 0.0001,
		farClip = 1000;

		var update = function(){
			matrix.reset();
			matrix.perspective(verticalFOV, aspect, nearClip, farClip);
		}
		var setVerticalFOV = function(value){
			verticalFOV = value;
		}
		var getVerticalFOV = function(){
			return verticalFOV;
		}
		var setAspect = function(value){
			aspect = value;
		}
		var getAspect= function(){
			return aspect;
		}
		var setNearClip = function(value){
			nearClip = value;
		}
		var getNearClip = function(){
			return nearClip;
		}
		var setFarClip = function(value){
			farClip = value;
		}
		var getFarClip = function(){
			return farClip;
		}
		var getMatrix = function(){
			return matrix;
		}

		update();

		Object.defineProperty(self, 'update', {
			value: update
		});
		Object.defineProperty(self, 'verticalFOV', {
			get: getVerticalFOV,
			set: setVerticalFOV
		});
		Object.defineProperty(self, 'aspect', {
			get: getAspect,
			set: setAspect
		});
		Object.defineProperty(self, 'nearClip', {
			get: getNearClip,
			set: setNearClip
		});
		Object.defineProperty(self, 'farClip', {
			get: getFarClip,
			set: setFarClip
		});
		Object.defineProperty(self, 'matrix', {
			get: getMatrix
		});

	}
	return PerspectiveCamera;
});