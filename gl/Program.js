define(
[],
function
(){
	"use strict";
	var Program = function(gl){
		var
		self = this,
		nativeProgram,
		vshader,
		fshader,
		attributesLocation = {},
		uniformsLocation = {};

		var cacheAttributeLocation = function (attribute){
			attributesLocation[attribute] = gl.getAttribLocation(nativeProgram, attribute);
			gl.enableVertexAttribArray(attributesLocation[attribute]);
		}
		var cacheUniformLocation = function (uniform){
			uniformsLocation[uniform] = gl.getUniformLocation(nativeProgram, uniform);
		}
		var createShader = function (str, type) {
			var shader = gl.createShader(type);
			gl.shaderSource(shader, str);
			gl.compileShader(shader);
			if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
				throw gl.getShaderInfoLog(shader);
			}
			return shader;
		}
		var createFromSource = function (vstr, fstr) {
			nativeProgram = gl.createProgram();
			vshader = createShader(vstr, gl.VERTEX_SHADER);
			fshader = createShader(fstr, gl.FRAGMENT_SHADER);
			link();
		}
		var link = function () {
			gl.attachShader(nativeProgram, vshader);
			gl.attachShader(nativeProgram, fshader);
			gl.linkProgram(nativeProgram);
			if (!gl.getProgramParameter(nativeProgram, gl.LINK_STATUS)) {
				throw gl.getProgramInfoLog(nativeProgram);
			}
		}
		var getNative = function () {
			return nativeProgram;
		}
		var setNative = function (value) {
			nativeProgram = value;
		}
		var use = function () {
			gl.useProgram(nativeProgram);
		}
		var getAttributeLocation = function(name) {
			if(!attributesLocation[name]) cacheAttributeLocation(name);
			return attributesLocation[name];
		}
		var getUniformLocation = function(name) {
			if(!uniformsLocation[name]) cacheUniformLocation(name);
			return uniformsLocation[name];
		}
		var setUniform = function(){
			var type,
			args = [];
			for (var i = 0; i < arguments.length; i++) {
				if(i == 0) type = arguments[i];
				else if(i == 1) args.push(getUniformLocation(arguments[i]));
				else args.push(arguments[i]);
			};
			gl['uniform' + type].apply(gl, args);
		}
		var setAttribute = function(){
			var type,
			args = [],
			buffer;
			for (var i = 0; i < arguments.length; i++) {
				if(i == 0) type = arguments[i];
				else if(i == 1)	args.push(getAttributeLocation(arguments[i]));
				else if(i == 2 && type === "Pointer"){
					buffer = arguments[i];
					args.push(buffer.itemSize);
				}
				else args.push(arguments[i]);
			};
			if(buffer) gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
			gl['vertexAttrib' + type].apply(gl, args);
		}
		
		Object.defineProperty(self, 'createFromSource', {
			value: createFromSource
		});
		Object.defineProperty(self, 'cacheUniformLocation', {
			value: cacheUniformLocation
		});
		Object.defineProperty(self, 'cacheAttributeLocation', {
			value: cacheAttributeLocation
		});
		Object.defineProperty(self, 'createShader', {
			value: createShader
		});
		Object.defineProperty(self, 'link', {
			value: link
		});
		Object.defineProperty(self, 'use', {
			value: use
		});
		Object.defineProperty(self, 'getAttributeLocation', {
			value: getAttributeLocation
		});
		Object.defineProperty(self, 'getUniformLocation', {
			value: getUniformLocation
		});
		Object.defineProperty(self, 'setUniform', {
			value: setUniform
		});
		Object.defineProperty(self, 'setAttribute', {
			value: setAttribute
		});
		Object.defineProperty(self, 'native', {
			get: getNative,
			set: setNative
		});
	}
	return Program;
});