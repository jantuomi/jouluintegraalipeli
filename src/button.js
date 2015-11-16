function Button() {
	this.graphics = new PIXI.Graphics();
	 
	this.graphics.beginFill(0xFFFF00);
	 
	// set the line style to have a width of 5 and set the color to red
	this.graphics.lineStyle(5, 0xFF0000);
	 
	// draw a rectangle
	this.graphics.drawRect(100, 150, 50, 50);	
	
	// make the button interactive..		
	this.graphics.setInteractive(true);
		
	this.graphics.click = function(data) {
		console.log('hit rect');
	}
}