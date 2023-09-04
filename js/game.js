// create a new scene named "Game"
let gameScene = new Phaser.Scene("Game");

// some parameters for our scene
gameScene.init = function () {
	this.words = [
		{
			key: "building",
			setXY: {
				x: 100,
				y: 240,
			},
			spanish: "edificio",
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
			spanish: "casa",
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
			spanish: "automovila",
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
			spanish: "arbol",
		},
	];
};

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
	this.load.audio("buildingAudio", "assets/audio/edificio.mp3");
	this.load.audio("correct", "assets/audio/correct.mp3");
	this.load.audio("wrong", "assets/audio/wrong.mp3");
};

// executed once, after assets were loaded
gameScene.create = function () {
	this.items = this.add.group(this.words).setDepth(1);
	let bg = this.add.sprite(0, 0, "background").setOrigin(0, 0).setInteractive();
	let items = this.items.getChildren();

	for (let i = 0; i < items.length; i++) {
		let item = items[i];
		item.setInteractive();
		// creating tween - resize tween
		item.resizeTween = this.tweens.add({
			targets: item,
			scaleX: 1.5,
			scaleY: 1.5,
			duration: 300,
			paused: true,
			yoyo: true,
		});
		item.alphaTween = this.tweens.add({
			targets: item,
			alpha: 0.7,
			duration: 200,
			paused: true,
		});

		item.on(
			"pointerdown",
			function (pointer) {
				item.resizeTween.restart();
				this.ShowNextQuestion();
			},
			this
		);

		item.on("pointerover", function (pointer) {
			item.alphaTween.restart();
		});
		item.on(
			"pointerout",
			function (pointer) {
				item.alphaTween.stop();

				item.alpha = 1;
			},
			this
		);
		// create sound for each word
		this.words[i].sound = this.sound.add(this.words[i].key + "Audio");
	}

	this.ShowNextQuestion();
};

gameScene.ShowNextQuestion = function () {
	// Select a random Word
	let nextWord = Phaser.Math.RND.pick(this.words);

	// play a sound for that word
	nextWord.sound.play();
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
