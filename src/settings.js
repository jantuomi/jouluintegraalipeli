var Settings = function() {}
Settings.STAGE_WIDTH = 800;
Settings.STAGE_HEIGHT = 600;
Settings.STAGE_BGCOLOR = 0xA0A0A0;
Settings.PLAYER_COUNT = 11;

var lastTime = Date.now();
var dt = 0.0;

function updateDeltaTime() {
	var last = lastTime;
	var current = Date.now();

	lastTime = current;
	dt = current - last;
}
