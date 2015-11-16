function GameObject(texture) {
	this.texture = PIXI.Texture.fromImage("res/" + texture + ".png");
	this.sprite = new PIXI.Sprite(this.texture);

	this.initPosition();
	this.active = true;
	this.objectType = "gameobject";
}

GameObject.prototype.initPosition = function() {
	this.sprite.anchor.x = 0.5;
	this.sprite.anchor.y = 0.5;

	this.sprite.position.x = Settings.STAGE_WIDTH * 0.5;
	this.sprite.position.y = Settings.STAGE_HEIGHT * 0.5;
}

GameObject.prototype.update = function() {

}