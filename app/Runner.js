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
		lastUpdateTime,
		runTime,
		dt,
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
		var position = dom.calculatePosition(container);
		var monitorResize = function(){
			var newSize = dom.measure(container);
			var newPosition = dom.calculatePosition(container);

			if(newSize.width != size.width || newSize.height != size.height){
				app.onResize.apply(app,[newSize, newPosition]);
			}
			size = newSize;
			
			if(newPosition.x != position.x || newPosition.y != position.y){
				app.onReposition.apply(app,[newPosition, newSize]);
			}
			position = newPosition;
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
		var enterFullscreen = function(){
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
		var exitFullscreen = function(){
			_isFullscreen = false;
			container.removeAttribute('style');
			cancelFullScreen();
		}
		var toggleFullscreen = function(){
			if(!_isFullscreen) enterFullscreen();
			else exitFullscreen();
		}
		var getIsFullscreen = function(){
			return _isFullscreen;
		}

		// Time functions&  FPS control
		var setDesiredFPS = function(value){
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
		var getFPS = function(){
			return 1/dt;
		}
		var getTime;
		if (window.performance && window.performance.now) getTime = function() { return window.performance.now() * 0.001; };
		else if (window.performance && window.performance.webkitNow) getTime = function() { return window.performance.webkitNow() * 0.001; };
		else getTime = function() { return new Date().getTime() * 0.001 ; };
		var getStartTime = function(){
			return	startTime;
		}
		var getRuntime = function(){
			return	getTime() - startTime;
		}
		var getDeltaTime = function(){
			return	dt;
		}

		// Register methods
		Object.defineProperty(app, 'setDesiredFPS', {
			value: setDesiredFPS
		});
		Object.defineProperty(app, 'enterFullscreen', {
			value: enterFullscreen
		});
		Object.defineProperty(app, 'exitFullscreen', {
			value: exitFullscreen
		});
		Object.defineProperty(app, 'toggleFullscreen', {
			value: toggleFullscreen
		});
		Object.defineProperty(app, 'isFullscreen', {
			get: getIsFullscreen
		});
		Object.defineProperty(app, 'time', {
			get: getTime
		});
		Object.defineProperty(app, 'startTime', {
			get: getStartTime
		});
		Object.defineProperty(app, 'runTime', {
			get: getRuntime
		});	
		Object.defineProperty(app, 'deltaTime', {
			get: getDeltaTime
		});		
		Object.defineProperty(app, 'fps', {
			get: getFPS
		});
		Object.defineProperty(app, 'position', {
			get: function(){ return position; }
		});
		Object.defineProperty(app, 'size', {
			get: function(){ return size; }
		});


		// Kickoff initial settings
		setDesiredFPS('auto');
		startTime = getTime();
		app.setup.apply(app);
		app.onReposition.apply(app,[position, size]);
		app.onResize.apply(app,[size, position]);
		lastUpdateTime = startTime; 
		runTime = 0;
		dt;

		function loop(){
			currentRequestUpdate(loop);
			var newTime = getTime();
			dt = (newTime - lastUpdateTime);
			lastUpdateTime = newTime;
			var runTime = newTime - startTime;
			app.update.apply(app, [dt, runTime]);
			app.draw.apply(app, [dt, runTime]);
		}
		loop();
	}
	return Runner;
});