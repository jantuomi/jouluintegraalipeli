var Sound = function() {
	// start music
	this.bgMusic = new Howl({
		urls: ['/res/bg.mp3'],
		autoplay: true,
		loop: true,
		volume: 1,
		buffer: true
	});

	this.sounds = {jump: 		new Howl({ urls: ['res/jump.wav'], buffer: true }),
			  	   start: 		new Howl({ urls: ['res/start.wav'], buffer: true }),
			       explosion: 	new Howl({ urls: ['res/explosion.wav'], buffer: true })};

	this.play = function(effect) {
		this.sounds[effect].play()
	}

	return this;
}