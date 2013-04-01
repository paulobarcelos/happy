define(
[
	'happy/gl/Matrix',
],
function
(
	Matrix
){
	"use strict";
	var Model = function(gl){
		var
		self = this,
		vertices = [],
		colors = [],
		textureCoordinates = [],
		vertexBuffer = gl.createBuffer(),
		colorBuffer = gl.createBuffer(),
		textureCoordinateBuffer = gl.createBuffer(),
		matrix = new Matrix();

		var draw = function(mode){
			gl.drawArrays(mode, 0, vertexBuffer.numItems);
		}
		var setVertices = function(data){
			vertices = data;
			gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
			gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);
			vertexBuffer.itemSize = 3;
			vertexBuffer.numItems = data.length / vertexBuffer.itemSize ;
		}
		var getVertices = function(){
			return vertices;
		}
		var setColors = function(data){
			colors = data;
			gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
			gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);
			colorBuffer.itemSize = 4;
			colorBuffer.numItems = data.length / colorBuffer.itemSize ;
		}
		var getColors = function(){
			return colors;
		}
		var setTextureCoordinates = function(data){
			textureCoordinates = data;
			gl.bindBuffer(gl.ARRAY_BUFFER, textureCoordinateBuffer);
			gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);
			textureCoordinateBuffer.itemSize = 2;
			textureCoordinateBuffer.numItems = data.length / textureCoordinateBuffer.itemSize ;
		}
		var getTextureCoordinates = function(){
			return textureCoordinates;
		}
		var getVertexBuffer = function(){
			return vertexBuffer;
		}
		var getColorBuffer = function(){
			return colorBuffer;
		}
		var getTextureCoordinateBuffer = function(){
			return textureCoordinateBuffer;
		}		
		var getMatrix = function(){
			return matrix;
		}
		

		// initialize with empty data
		setVertices([]);
		setColors([]);

		Object.defineProperty(self, 'draw', {
			value: draw
		});
		Object.defineProperty(self, 'vertices', {
			get: getVertices,
			set: setVertices
		});
		Object.defineProperty(self, 'colors', {
			get: getColors,
			set: setColors
		});
		Object.defineProperty(self, 'textureCoordinates', {
			get: getTextureCoordinates,
			set: setTextureCoordinates
		});
		Object.defineProperty(self, 'vertexBuffer', {
			get: getVertexBuffer
		});
		Object.defineProperty(self, 'colorBuffer', {
			get: getColorBuffer
		});
		Object.defineProperty(self, 'textureCoordinateBuffer', {
			get: getTextureCoordinateBuffer
		});
		Object.defineProperty(self, 'matrix', {
			get: getMatrix
		});
	}
	return Model;
});