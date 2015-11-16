// bg
function Background(x_offset) {
	GameObject.call(this, "bg");
	this.x_offset = x_offset;
	this.initPosition();

	this.x_speed = 10
	this.objectType = "background";
}

Background.prototype = Object.create(GameObject.prototype);
Background.prototype.constructor = Background;

Background.prototype.update = function() {
	this.sprite.position.x -= this.x_speed

	if (this.sprite.position.x < -Settings.STAGE_WIDTH) {
		this.sprite.position.x = Settings.STAGE_WIDTH - this.x_speed;
	}
}

Background.prototype.initPosition = function() {
	this.sprite.position.x = this.x_offset;
	this.sprite.position.y = 0;
	this.sprite.anchor.x = 0;
	this.sprite.anchor.y = 0;
}

var bg1 = new Background(0);
var bg2 = new Background(Settings.STAGE_WIDTH);

// logo
var logo1 = new GameObject("logo1");
logo1.update = function() {
	this.sprite.rotation = 0.1 * Math.sin(0.001 * Date.now());
}

logo1.initPosition = function() {
	logo1.sprite.position.y = Settings.STAGE_WIDTH * 0.2
}
logo1.initPosition();

// press space to play text
var logo2 = new GameObject("logo2");
logo2.initPosition = function() {
	this.sprite.position.y = Settings.STAGE_HEIGHT * 0.6;
}
logo2.initPosition();

// background box for score display at gameover
var scoreBg = new PIXI.Graphics();
scoreBg.beginFill(0xAAAAAA, 1.0);
scoreBg.visible = false;

// score display
var scoreText = new PIXI.Text("W", { font: '35px Arial', fill: 'black', align: 'left' });
scoreText.visible = false;
scoreText.update = function() {
	this.text = "W = " + player.score + " J";
}

scoreText.moveToCorner = function() {
	this.position.x = Settings.STAGE_WIDTH * 0.7;
	this.position.y = Settings.STAGE_HEIGHT * 0.1;
}

scoreText.moveToCenter = function() {
	this.position.x = Settings.STAGE_WIDTH * 0.5 - this.width / 2;
	this.position.y = Settings.STAGE_HEIGHT * 0.5 - this.height / 2;
}
scoreText.moveToCorner();

// gameover screen title text
var gameOverText = new PIXI.Text("Nettovoiman tekemä työ:", { font: '35px Arial', fill: 'black', align: 'center' });
gameOverText.visible = false;
gameOverText.position.x = Settings.STAGE_WIDTH * 0.5 - gameOverText.width / 2;;
gameOverText.position.y = Settings.STAGE_HEIGHT * 0.4 - gameOverText.height / 2;;

// move the gameover bg box now that we now the width of the text
var yDiff = scoreText.position.y - gameOverText.position.y + gameOverText.height;
scoreBg.drawRect(gameOverText.position.x - 10, gameOverText.position.y - 10, gameOverText.width + 20, -yDiff);

// integral sign
function Integral(y) {
	GameObject.call(this, "int");

	this.initPosition()
	this.sprite.position.y = y;

	this.speed = -10;
	this.objectType = "integral";

}

Integral.prototype = Object.create(GameObject.prototype);
Integral.prototype.constructor = Integral;

Integral.prototype.initPosition = function() {
	this.sprite.position.x = Settings.STAGE_WIDTH + this.sprite.width;
	this.sprite.position.y = Settings.STAGE_HEIGHT + this.sprite.height;
	this.sprite.anchor.x = 0;
	this.sprite.anchor.y = 0.5;
}

Integral.prototype.update = function() {
	this.sprite.position.x += this.speed;
}