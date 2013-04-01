define(
[], 
function (){
"use strict";
var BaseApp = function(){
	var 
	self = this,
	dummy = function(){};

	self.container = document.body;
	self.setup = dummy;
	self.update = dummy;
	self.draw = dummy;
	self.onKeyUp = dummy;
	self.onKeyDown = dummy;
	self.onMouseOver = dummy; 
	self.onMouseOut = dummy; 
	self.onMouseDown = dummy; 
	self.onMouseUp = dummy; 
	self.onMouseMove = dummy; 
	self.onClick = dummy;
	self.onDoubleClick = dummy;
	self.onResize = dummy;
	self.setFPS = dummy;
	self.enterFullscreen = dummy;
	self.exitFullscreen = dummy;
	self.toggleFullscreen = dummy;
	self.isFullscreen = dummy;
}
return BaseApp
});