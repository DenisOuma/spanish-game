// create a new scene named "Game"
let gameScene = new Phaser.Scene("Game");

// some parameters for our scene
gameScene.init = function () {};

// load asset files for our game
gameScene.preload = function () {
	this.load.image("background", "assets/images/background-city.png");
	this.load.image("building", "assets/images/building.png");
	this.load.image("car", "assets/images/car.png");
	this.load.image("house", "assets/images/house.png");
	this.load.image("tree", "assets/images/tree.png");

	// Loading Audio
	this.load.audio("treeAudio", "assets/audio/arbol.mp3");
	this.load.audio("carAudio", "assets/audio/auto.mp3");
	this.load.audio("houseAudio", "assets/audio/casa.mp3");
	this.load.audio("buildingudio", "assets/audio/edificio.mp3");
	this.load.audio("correct", "assets/audio/correct.mp3");
	this.load.audio("wrong", "assets/audio/wrong.mp3");
};

// executed once, after assets were loaded
gameScene.create = function () {
	this.items = this.add
		.group([
			{
				key: "building",
				setXY: {
					x: 100,
					y: 240,
				},
			},
			{
				key: "house",
				setXY: {
					x: 240,
					y: 280,
				},
				setScale: {
					x: 0.8,
					y: 0.8,
				},
			},
			{
				key: "car",
				setXY: {
					x: 380,
					y: 290,
				},
				setScale: {
					x: 0.8,
					y: 0.8,
				},
			},
			{
				key: "tree",
				setXY: {
					x: 500,
					y: 260,
				},
				setScale: {
					x: 0.8,
					y: 0.8,
				},
			},
		])
		.setDepth(1);
	let bg = this.add.sprite(0, 0, "background").setOrigin(0, 0).setInteractive();
	Phaser.Actions.Call(
		this.items.getChildren(),
		function (item) {
			item.setInteractive().on("pointerdown", function (pointer) {
				console.log("You clicked " + item.texture.key);
			});
		},
		this
	);
};

// our game's configuration
let config = {
	type: Phaser.AUTO,
	width: 640,
	height: 360,
	scene: gameScene,
	title: "Spanish Learning Game",
	pixelArt: false,
};

// create the game, and pass it the configuration
let game = new Phaser.Game(config);
