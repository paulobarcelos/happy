define(
[
	'../polyfill/console',
	'../_libs/mout/array/forEach',
	'../_libs/mout/array/combine',
	'../_libs/mout/string/pascalCase'
],
function(
	console,
	forEach,
	combine,
	pascalCase
) {	
	var prefixes = [
		'WebKit',
		'Moz',
		'O',
		'Ms'
	];

	// cache prefix variations
	var
	classPrefixes = [],
	methodPrefixes = [];
	forEach(prefixes, function(prefix){
		classPrefixes.push(pascalCase(prefix));
		methodPrefixes.push(prefix.toLowerCase());
	});
	var allPrefixes = combine(classPrefixes, methodPrefixes);

	var Vendor = function(){
		var self = this;

		var validate = function(standard, context) {
			if(!standard) return;
			var pascalStandard = pascalCase(standard);
			context = context || window;

			var name = standard;
			var valid = context[name];
			if(typeof valid === "undefined"){
				for (var i = 0; i < allPrefixes.length; i++) {
					name = allPrefixes[i] + pascalStandard;
					valid = context[name];
					if(typeof valid !== "undefined") break;
				};
			}
			if(typeof valid === "undefined"){
				console.log(standard + ' is not implemented.');
				return;
			}
			return {
				name: name,
				context: context
			}
		}

		var validateMethod = function(standard, context) {
			var result = validate(standard, context);
			if(!result) return;
			return function () {
				result.context[result.name].apply(result.context, arguments);
			}
		}
		var validateConstructor = function(standard, context) {
			var result = validate(standard, context);
			if(!result) return;
			return result.context[result.name];
		}
		var validateName = function(standard, context) {
			var result = validate(standard, context);
			if(!result) return;
			return result.name; 
		}

		Object.defineProperty(self, 'validateMethod', {
			value: validateMethod
		});
		Object.defineProperty(self, 'validateConstructor', {
			value: validateConstructor
		});
		Object.defineProperty(self, 'validateName', {
			value: validateName
		});

	}
	
	return Vendor;
});