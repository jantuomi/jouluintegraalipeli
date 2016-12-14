function GameObject(texture) {
    this.updateTexture(texture);

	this.initPosition();
	this.active = true;
	this.objectType = "gameobject";
}

GameObject.prototype.updateTexture = function(name) {
	this.texture = PIXI.Texture.fromImage("res/" + name + ".png");
	this.sprite = new PIXI.Sprite(this.texture);
}

GameObject.prototype.initPosition = function() {
	this.sprite.anchor.x = 0.5;
	this.sprite.anchor.y = 0.5;

	this.sprite.position.x = Settings.STAGE_WIDTH * 0.5;
	this.sprite.position.y = Settings.STAGE_HEIGHT * 0.5;
}

GameObject.prototype.update = function() {

}
