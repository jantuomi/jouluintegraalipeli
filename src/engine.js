var MENU		= 1;
var GAME		= 2;
var GAMEOVER	= 3;

var appRunning = true;
var Engine = function() {

	Engine.instance = this;

	this.sound = new Sound();

	this.state = MENU;

	this.stage = new PIXI.Container();
	this.renderer = PIXI.autoDetectRenderer(Settings.stage_WIDTH, Settings.stage_HEIGHT);

	this.mapContainer = new PIXI.Container(),
    this.unitsContainer = new PIXI.Container(),
    this.menuContainer = new PIXI.Container();
    this.clickableContainer = new PIXI.Container();

    this.mapContainer.zIndex = 4;
	this.unitsContainer.zIndex = 3;
	this.menuContainer.zIndex = 2;
	this.clickableContainer.zIndex = 1;

	this.stage.addChild(this.mapContainer);
	this.stage.addChild(this.menuContainer);
	this.stage.addChild(this.unitsContainer);
	this.stage.addChild(this.clickableContainer);

	this.stage.updateLayersOrder = function () {
	    this.children.sort(function(a,b) {
	        a.zIndex = a.zIndex || 0;
	        b.zIndex = b.zIndex || 0;
	        return b.zIndex - a.zIndex
	    });
	};
	this.makeStageClickable();

	this.setupGameObjects();
	this.integralSpawnTimer = 0;
	this.gameOverTimer = 0;

	return this;
}

Engine.prototype.makeStageClickable = function() {
	this.clickLayer = new PIXI.Graphics();
	this.clickLayer.beginFill(0x000000, 0.0);
	this.clickLayer.drawRect(0, 0, Settings.STAGE_WIDTH, Settings.STAGE_HEIGHT);
	this.clickLayer.interactive = true;

	this.clickableContainer.addChild(this.clickLayer);

	this.clickLayer.touchstart = this.clickLayer.mousedown = this.buttonPressed.bind(this);
}

Engine.prototype.randomizePlayer = function() {
    this.removeSprite(player.sprite);
    var number = Math.floor((Math.random() * Settings.PLAYER_COUNT) + 1); 
	var newTexture = PIXI.Texture.fromImage("res/players/player" + number + ".png");
	player.sprite = new PIXI.Sprite(newTexture);
    this.unitsContainer.addChild(player.sprite);
}

Engine.prototype.activateMenu = function() {
	this.state = MENU;

    this.randomizePlayer();

	player.score = 0
	console.log("changed to menu!");
	logo1.sprite.visible = true;
	logo2.sprite.visible = true;
	this.resetPositions();
	player.active = false;
	scoreText.visible = false;
	gameOverText.visible = false;
	scoreBg.visible = false;

	for (var i = 0; i < this.gameObjectList.length; i++) {
		if (this.gameObjectList[i].objectType == "integral")
			this.removeIntegral(this.gameObjectList[i])
	}
}

Engine.prototype.activateGame = function() {
	this.state = GAME;
	console.log("game starting...")
	player.active = true;
	logo1.sprite.visible = false;
	logo2.sprite.visible = false;
	scoreText.moveToCorner();
	scoreText.visible = true;
	this.sound.play("start")
}

Engine.prototype.activateGameOver = function() {
	this.state = GAMEOVER;
	console.log("game over");
	player.active = false;
	logo1.sprite.active = true;
	scoreText.moveToCenter();
	this.gameOverTimer = 50;
	gameOverText.visible = true;
	scoreBg.visible = true;
	this.sound.play("explosion")
}

Engine.prototype.removeSprite = function(sprite) {
	this.unitsContainer.removeChild(sprite);
}

Engine.prototype.removeIntegral = function(integral) {
	var i = this.gameObjectList.indexOf(integral);
	this.gameObjectList.splice(i, 1);
	this.unitsContainer.removeChild(integral.sprite);
	delete integral;
}

Engine.prototype.testForGameover = function() {
	if (player.outOfScreen()) {
		this.activateGameOver();
	}

	// collision detection
	var g = this.gameObjectList;
	var p = player.sprite
	for (var i = 0; i < g.length; i++) {
		if (g[i].objectType == "integral") {
			var obj = g[i].sprite;

			var xdist = obj.position.x - p.position.x;

			if (xdist > -0.3 * obj.width && xdist < 0.2 * obj.width) {
				var ydist = obj.position.y - p.position.y;
			
				if (ydist > -obj.height / 2 && ydist < obj.height / 2) {
					this.activateGameOver();
				}
			}
		}
	}
}

Engine.prototype.spawnIntegral = function() {
	var i = new Integral(Math.random() * Settings.STAGE_HEIGHT);
	this.gameObjectList.push(i);
	this.unitsContainer.addChild(i.sprite);
}

Engine.prototype.updateSpawns = function() {
	this.integralSpawnTimer -= 1;

	if (this.integralSpawnTimer < 0) {
		this.spawnIntegral();
		this.integralSpawnTimer = 30 + Math.random() * 100;
	}
}

Engine.prototype.update = function() {
	updateDeltaTime();
	if (this.state == GAME)
		this.updateSpawns();

	if (this.state == GAME || this.state == MENU) {
		this.testForGameover();
		for (var i = 0; i < this.gameObjectList.length; i++) {
			var obj = this.gameObjectList[i];
			obj.update();

			// check if integral object has left the screen
			if (obj.objectType == "integral") {
				if (obj.sprite.x < -obj.sprite.width)
					this.removeIntegral(obj);
			}
		}
	}

	if (this.state == GAMEOVER) {
		this.gameOverTimer -= 1;
	}

	scoreText.update();

	this.renderer.render(this.stage);
}

Engine.prototype.resetPositions = function() {
	for (var i = 0; i < this.gameObjectList.length; i++) {
		this.gameObjectList[i].initPosition();
	}
}

Engine.prototype.buttonPressed = function() {
	player.boost();

	if (this.state == MENU) {
		this.activateGame();
		player.boost();
	}
	else if (this.state == GAME) {
		player.boost();
	}
	else if (this.state == GAMEOVER) {
		if (this.gameOverTimer < 0)
			this.activateMenu();
	}
}

Engine.prototype.setupGameObjects = function() {
	// add player to gameobjectlist
	this.gameObjectList = [];


	this.unitsContainer.addChild(player.sprite);
	this.menuContainer.addChild(logo1.sprite);
	this.menuContainer.addChild(logo2.sprite);
	this.mapContainer.addChild(bg1.sprite);
	this.mapContainer.addChild(bg2.sprite);
	this.menuContainer.addChild(scoreBg);
	this.menuContainer.addChild(scoreText);
	this.menuContainer.addChild(gameOverText);

	this.gameObjectList = this.gameObjectList.concat([player, logo1, logo2, bg1, bg2]);

	k_space.press = this.buttonPressed.bind(this);

	this.stage.updateLayersOrder();
}

var engine = new Engine();
