document.body.appendChild(Engine.instance.renderer.view);

requestAnimationFrame(animate);

function animate() {
	requestAnimationFrame(animate);

	Engine.instance.update();
}