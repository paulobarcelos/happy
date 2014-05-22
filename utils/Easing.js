define(
[
],
function (
){
	"use strict";

	var easing = function(){
		var self = this;


		var functions = {};


		functions['inQuad'] = function(t, b, c, d) {
			return c*(t/=d)*t + b;
		}
		functions['outQuad'] = function(t, b, c, d) {
			return -c *(t/=d)*(t-2) + b;
		}
		functions['inOutQuad'] = function(t, b, c, d) {
			if ((t/=d/2) < 1) return c/2*t*t + b;
			return -c/2 * ((--t)*(t-2) - 1) + b;
		}
		functions['inCubic'] = function(t, b, c, d) {
			return c*(t/=d)*t*t + b;
		}
		functions['outCubic'] = function(t, b, c, d) {
			return c*((t=t/d-1)*t*t + 1) + b;
		}
		functions['inOutCubic'] = function(t, b, c, d) {
			if ((t/=d/2) < 1) return c/2*t*t*t + b;
			return c/2*((t-=2)*t*t + 2) + b;
		}
		functions['inQuart'] = function(t, b, c, d) {
			return c*(t/=d)*t*t*t + b;
		}
		functions['outQuart'] = function(t, b, c, d) {
			return -c * ((t=t/d-1)*t*t*t - 1) + b;
		}
		functions['inOutQuart'] = function(t, b, c, d) {
			if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
			return -c/2 * ((t-=2)*t*t*t - 2) + b;
		}
		functions['inQuint'] = function(t, b, c, d) {
			return c*(t/=d)*t*t*t*t + b;
		}
		functions['outQuint'] = function(t, b, c, d) {
			return c*((t=t/d-1)*t*t*t*t + 1) + b;
		}
		functions['inOutQuint'] = function(t, b, c, d) {
			if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
			return c/2*((t-=2)*t*t*t*t + 2) + b;
		}
		functions['inSine'] = function(t, b, c, d) {
			return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
		}
		functions['outSine'] = function(t, b, c, d) {
			return c * Math.sin(t/d * (Math.PI/2)) + b;
		}
		functions['inOutSine'] = function(t, b, c, d) {
			return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
		}
		functions['inExpo'] = function(t, b, c, d) {
			return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
		}
		functions['outExpo'] = function(t, b, c, d) {
			return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
		}
		functions['inOutExpo'] = function(t, b, c, d) {
			if (t==0) return b;
			if (t==d) return b+c;
			if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
			return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
		}
		functions['inCirc'] = function(t, b, c, d) {
			return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
		}
		functions['outCirc'] = function(t, b, c, d) {
			return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
		}
		functions['inOutCirc'] = function(t, b, c, d) {
			if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
			return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
		}
		functions['inElastic'] = function(t, b, c, d) {
			var s=1.70158;var p=0;var a=c;
			if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
			if (a < Math.abs(c)) { a=c; var s=p/4; }
			else var s = p/(2*Math.PI) * Math.asin (c/a);
			return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
		}
		functions['outElastic'] = function(t, b, c, d) {
			var s=1.70158;var p=0;var a=c;
			if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
			if (a < Math.abs(c)) { a=c; var s=p/4; }
			else var s = p/(2*Math.PI) * Math.asin (c/a);
			return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
		}
		functions['inOutElastic'] = function(t, b, c, d) {
			var s=1.70158;var p=0;var a=c;
			if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
			if (a < Math.abs(c)) { a=c; var s=p/4; }
			else var s = p/(2*Math.PI) * Math.asin (c/a);
			if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
			return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
		}
		functions['inBack'] = function(t, b, c, d, s) {
			if (s == undefined) s = 1.70158;
			return c*(t/=d)*t*((s+1)*t - s) + b;
		}
		functions['outBack'] = function(t, b, c, d, s) {
			if (s == undefined) s = 1.70158;
			return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
		}
		functions['inOutBack'] = function(t, b, c, d, s) {
			if (s == undefined) s = 1.70158; 
			if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
			return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
		}
		functions['inBounce'] = function(t, b, c, d) {
			return c - functions['outBounce'](d-t, 0, c, d) + b;
		}
		functions['outBounce'] = function(t, b, c, d) {
			if ((t/=d) < (1/2.75)) {
				return c*(7.5625*t*t) + b;
			} else if (t < (2/2.75)) {
				return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
			} else if (t < (2.5/2.75)) {
				return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
			} else {
				return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
			}
		}
		functions['inOutBounce'] = function(t, b, c, d) {
			if (t < d/2) return functions['inBounce'](t*2, 0, c, d) * .5 + b;
			return functions['outBounce'](t*2-d, 0, c, d) * .5 + c*.5 + b;
		}

		for (var name in functions){
			Object.defineProperty(
				self,
				name,
				{	
					value: functions[name]
				}
			);
			Object.defineProperty(
				self,
				name + 'Shape',
				{	
					value: (function(equasion){
						return function(v){
							var result = equasion(v,0,1,1);
							return result;
						}
						
					})(functions[name])
					
				}
			);
		}
	}
	var easing = new easing();
	return easing;
});