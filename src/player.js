function Player(texture) {
	GameObject.call(this, texture);
	this.active = false;
	this.acceleration = 18;
	this.boost_velocity = -70;
	this.velocity = 0.0;
	this.terminal_velocity = 60;

	this.score = 0;

	this.initPosition();

	// bind space bar to boost up
	//k_space.press = this.boost.bind(this);
}

Player.prototype = Object.create(GameObject.prototype);
Player.prototype.constructor = Player;

Player.prototype.initPosition = function() {
	GameObject.prototype.initPosition.call(this);

	this.sprite.position.x = Settings.STAGE_WIDTH * 0.1;
	this.sprite.position.y = Settings.STAGE_HEIGHT * 0.6;
	this.sprite.rotation = 0;
}

Player.prototype.updatePhysics = function() {
	// update velocity
	this.velocity += 0.01 * this.acceleration * dt;
	if (this.velocity >= this.terminal_velocity) {
		this.velocity = this.terminal_velocity;
	}

	// update position
	this.sprite.position.y += 0.01 * this.velocity * dt;

	// limit going upwards
	this.sprite.position.y = Math.max(0, this.sprite.position.y);
}

Player.prototype.updateControls = function() {
	// TODO
}

Player.prototype.boost = function() {
	this.velocity = this.boost_velocity;
	engine.sound.play("jump");
}

Player.prototype.outOfScreen = function() {
	return this.sprite.position.y > Settings.STAGE_HEIGHT;
}

Player.prototype.update = function() {
	GameObject.prototype.update.call(this);

	this.sprite.rotation += 0.1;

	if (this.active) {
		this.score += 1;
		this.updatePhysics();
		this.updateControls();
	}
}

var player = new Player("player");