define(
[
	'../utils/DOM',
	'../utils/Vendor',
	'../_libs/mout/object/merge',
], 
function (
	DOM,
	Vendor,
	merge
){
	"use strict";

	var vendor = new Vendor();
	var dom = new DOM();
	var requestAnimationFrame = vendor.validateMethod('requestAnimationFrame');
	var MutationObserver = vendor.validateConstructor('MutationObserver');

	var Runner = function(app){
		var 
		self = this,
		container = app.container,
		startTime,
		time,
		runtime,
		currentRequestUpdate;

		// Set container
		container.tabIndex = '1';
	
		// add event listeners
		container.addEventListener('keyup', function(e){
			app.onKeyUp.apply(app,[e]);
		}, false);
		container.addEventListener('keydown', function(e){
			app.onKeyDown.apply(app,[e]);
		}, false);
		container.addEventListener('mouseover', function(e){
			app.onMouseOver.apply(app,[e]);
		}, false);
		container.addEventListener('mouseout', function(e){
			app.onMouseOut.apply(app,[e]);
		}, false);
		container.addEventListener('mousedown', function(e){
			app.onMouseDown.apply(app,[e]);
		}, false);
		container.addEventListener('mouseup', function(e){
			app.onMouseUp.apply(app,[e]);
		}, false);
		container.addEventListener('mousemove', function(e){
			app.onMouseMove.apply(app,[e]);
		}, false);
		container.addEventListener('click', function(e){
			app.onClick.apply(app,[e]);
		}, false);
		container.addEventListener('dblclick', function(e){
			app.onDoubleClick.apply(app,[e]);
		}, false);
		
		// Monitor the object resizing is a bit more complex
		var size = dom.measure(container);
		var monitorResize = function(){
			var newSize = dom.measure(container);
			if(newSize.width != size.width || newSize.height != size.height){
				app.onResize.apply(app,[newSize]);
			}
			size = newSize;			
		}
		window.addEventListener('resize', monitorResize, false);
		window.addEventListener('scroll', monitorResize, false);
		if(MutationObserver){
			var mutationObserver = new MutationObserver(monitorResize);
			mutationObserver.observe(
				document.body,
				{
					subtree: true,
					childList: true,
					characterData: true,
					attribute: true
				}
			);
		}		

		// Fullscreen controls
		var cancelFullScreen = function(){
			vendor.validateMethod('cancelFullScreen', document).apply(document);
		}
		var requestFullScreen = function(){
			vendor.validateMethod('requestFullScreen', container).apply(container, [Element.ALLOW_KEYBOARD_INPUT]);
		}
		var _isFullscreen = false;
		app.enterFullscreen = function(){
			_isFullscreen = true;
			requestFullScreen();
			container.style.position = "fixed";
			container.style.top = "0";
			container.style.left = "0";
			container.style.width = "100%";
			container.style.height = "100%";
			container.style.minWidth = "100%";
			container.style.minHeight = "100%";
			container.style.maxWidth = "100%";
			container.style.maxHeight = "100%";
		}
		app.exitFullscreen = function(){
			_isFullscreen = false;
			container.removeAttribute('style');
			cancelFullScreen();
		}
		app.toggleFullscreen = function(){
			if(!_isFullscreen) app.enterFullscreen();
			else app.exitFullscreen();
		}
		app.isFullscreen = function(){
			return _isFullscreen;
		}

		// FPS control
		app.setFPS = function(value){
			if(value < 0) value = 0;
			switch(value){
				case 'auto':
					if(requestAnimationFrame){
						currentRequestUpdate = requestAnimationFrame;
					}
					else{
						currentRequestUpdate = function(request){
							setTimeout(request, 1000 / 60);
						}
					}					
					break;
				case 0:
					currentRequestUpdate = function(request){}
					break;
				default:
					currentRequestUpdate = function(request){
						setTimeout(request, 1000 / value);
					}
					break;
			}
		}

		// create a high performance timer
		var getTime;
		if (window.performance && window.performance.now) getTime = function() { return window.performance.now() * 0.001; };
		else if (window.performance && window.performance.webkitNow) getTime = function() { return window.performance.webkitNow() * 0.001; };
		else getTime = function() { return new Date().getTime() * 0.001 ; };

		function loop(){
			currentRequestUpdate(loop);
			var newTime = getTime();
			var dt = (newTime - time);
			time = newTime;
			runtime = time - startTime;
			app.update.apply(app, [dt, runtime]);
			app.draw.apply(app, [dt, runtime]);
		}
		app.setFPS('auto');
		app.setup.apply(app);
		app.onResize.apply(app,[size]);
		startTime = getTime();
		time = startTime; 
		runtime = 0;
		loop();
	}
	return Runner;
});