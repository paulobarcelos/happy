define(
[],
function() {
	var CODE_TABLE = {
		"8": "BACKSPACE", //  BACKSPACE
		"9": "TAB", //  TAB
		"13": "ENTER", //  ENTER
		"16": "SHIFT", //  SHIFT
		"17": "CTRL", //  CTRL
		"18": "ALT", //  ALT
		"19": "PAUSE_BREAK", //  PAUSE/BREAK
		"20": "CAPS_LOCK", //  CAPS LOCK
		"27": "ESCAPE", //  ESCAPE
		"32": "SPACEBAR",
		"33": "PAGE_UP",         
		"34": "PAGE_DOWN", // PAGE DOWN
		"35": "END", // END
		"36": "HOME", // HOME
		"37": "LEFT_ARROW", // LEFT ARROW
		"38": "UP_ARROW", // UP ARROW
		"39": "RIGHT_ARROW", // RIGHT ARROW
		"40": "DOWN_ARROW", // DOWN ARROW
		"45": "INSERT", // INSERT
		"46": "DELETE", // DELETE
		"91": "LEFT_WINDOW", // LEFT WINDOW
		"92": "RIGHT_WINDOW", // RIGHT WINDOW
		"93": "SELECT_KEY", // SELECT KEY
		"96": "NUMPAD_0", // NUMPAD 0
		"97": "NUMPAD_1", // NUMPAD 1
		"98": "NUMPAD_2", // NUMPAD 2
		"99": "NUMPAD_3", // NUMPAD 3
		"100": "NUMPAD_4", // NUMPAD 4
		"101": "NUMPAD_5", // NUMPAD 5
		"102": "NUMPAD_6", // NUMPAD 6
		"103": "NUMPAD_7", // NUMPAD 7
		"104": "NUMPAD_8", // NUMPAD 8
		"105": "NUMPAD_9", // NUMPAD 9
		"106": "MULTIPLY", // MULTIPLY
		"107": "ADD", // ADD
		"109": "SUBTRACT", // SUBTRACT
		"110": "DECIMAL_POINT", // DECIMAL POINT
		"111": "DIVIDE", // DIVIDE
		"112": "F1", // F1
		"113": "F2", // F2
		"114": "F3", // F3
		"115": "F4", // F4
		"116": "F5", // F5
		"117": "F6", // F6
		"118": "F7", // F7
		"119": "F8", // F8
		"120": "F9", // F9
		"121": "F10", // F10
		"122": "F11", // F11
		"123": "F12", // F12
		"144": "NUM_LOCK", // NUM LOCK
		"145": "SCROLL_LOCK", // SCROLL LOCK
		"186": ",", // SEMI-COLON
		"187": "=", // EQUAL-SIGN
		"188": ",", // COMMA
		"189": "-", // DASH
		"190": ".", // PERIOD
		"191": "/", // FORWARD SLASH
		"192": "`", // GRAVE ACCENT
		"219": "[", // OPEN BRACKET
		"220": "\\", // BACK SLASH
		"221": "]", // CLOSE BRACKET
		"222": "'" // SINGLE QUOTE
	}
	var CHAR_TABLE = {};
	for(code in CODE_TABLE){
		CHAR_TABLE[CODE_TABLE[code]] = code;
	}

	var Keyboard = function(){
		var self = this;

		var codeToChar = function(code){
			var c = CODE_TABLE[code];
			if(!c) c = String.fromCharCode(code)
			return c;
		}
		var charToCode = function(char){
			return CHAR_TABLE[char];
		}

		Object.defineProperty(self, 'codeToChar', {
			value: codeToChar
		});

		Object.defineProperty(self, 'charToCode', {
			value: charToCode
		});
	}

	return Keyboard;
});