define(
[
	'happy/gl/Matrix',
],
function
(
	Matrix
){
	var World = function(gl){
		var
		self = this,
		matrix = new Matrix();

		var getMatrix = function(){
			return matrix;
		}

		Object.defineProperty(self, 'matrix', {
			get: getMatrix
		});
	}
	return World;
});