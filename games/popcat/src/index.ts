import { Application, Assets, Sprite, Text } from 'pixi.js';
import { Howl } from 'howler';

(async () => {
  // Create a new application
  const app = new Application();

  // Initialize the application
  await app.init({ background: 0xffffff, resizeTo: window });

  // Append the application canvas to the document body
  document.body.appendChild(app.canvas);

  // prepare the popcat images
  Assets.add({ alias: 'popcat', src: 'assets/popcat.png' });
  Assets.add({ alias: 'popcat_wow', src: 'assets/popcat_wow.png' });

  const { popcat: popcatTexture, popcat_wow: popcatWowTexture } =
    await Assets.load(['popcat', 'popcat_wow']);

  // prepare the pop sound
  const popSound = new Howl({
    src: ['assets/pop.mp3'],
    volume: 1.25,
  });

  // create initial popcat sprite, center of the screen
  const popcatSprite = new Sprite(popcatTexture);
  popcatSprite.anchor.set(0.5);
  popcatSprite.x = app.screen.width / 2;
  popcatSprite.y = app.screen.height / 2;
  popcatSprite.scale = 0.3;
  popcatSprite.interactive = true;
  app.stage.addChild(popcatSprite);

  // Create a text object for displaying the score, center to the screen
  const scoreText = new Text({
    text: 'Score: 0',
    style: {
      fontFamily: 'Chalkduster',
      fontSize: 36,
      fill: 0x000000,
      align: 'center',
    },
  });
  scoreText.anchor.set(0.5);
  scoreText.x = app.screen.width / 2;
  scoreText.y = 50;
  app.stage.addChild(scoreText);

  // track the score
  let score = 0;

  // when pointer down, show the popcat_wow, play the pop sound and increment the score
  popcatSprite.on('pointerdown', () => {
    popcatSprite.texture = popcatWowTexture;
    score++;
    scoreText.text = `Score: ${score}`;
    popSound.play();
  });

  // when pointer up, show the initial popcat image
  popcatSprite.on('pointerup', () => {
    popcatSprite.texture = popcatTexture;
  });
  // show the initial popcat image even when pointer is released outside of the sprite
  app.canvas.addEventListener('pointerup', () => {
    popcatSprite.texture = popcatTexture;
  });

  window.addEventListener('resize', () => {
    console.log('resized');
    app.renderer.resize(window.innerWidth, window.innerHeight);

    popcatSprite.x = app.renderer.width / 2;
    popcatSprite.y = app.renderer.height / 2;

    scoreText.x = app.renderer.width / 2;
  });
})();
