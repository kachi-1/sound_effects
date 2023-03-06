let osc = new Tone.AMOscillator(600,'sine','sine').start();
let gain = new Tone.Gain(4).toDestination();
let pan = new Tone.Panner().connect(gain);
const distortion = new Tone.Distortion(1);
const reverb = new Tone.Freeverb(0.7, 300000);
reverb.wet.value = 0.6;
const chorus = new Tone.Chorus(4, 2.5, 0.5);
let ampEnv = new Tone.AmplitudeEnvelope({
  attack: 0.25,
  decay: 1.5,
  release: 0.5
}).connect(pan);
osc.connect(ampEnv);
let initTone = true;
let oscFreq = 0;
let pitch = 0;
let showImg = false;

let noise = new Tone.Noise().start();
let noiseEnv = new Tone.AmplitudeEnvelope({
  attack: 0.25,
  decay: 0.5,
  sustain: 0.5,
  release: 0.5
}).connect(gain);
ampEnv.chain(reverb, distortion, chorus);

let noiseFilter = new Tone.Filter(800,"lowpass").connect(noiseEnv);
noise.connect(noiseFilter);

function preload() {
  soundImage = loadImage("img/jedi.jpeg");
}

function setup() {
  createCanvas(800, 800);
  imageMode(CENTER);
}

function draw() {
  
  
  
  if(!showImg) {
    background(300);
    text('press spacebar to initialize audio:',100, 150);
    if (initTone === false) {
      text('Initialized',280, 150);
    }
    text('press mouse to bear witness',100, 250);

  }else {
    scale(0.5,0.5);
    image(soundImage,800, 800 );

  }
}

function keyPressed() {
  if (keyCode === 32 && initTone === true) {
    initTone = false;
    Tone.start();
  }
}

function mousePressed() {
  if (showImg) {
    showImg = false;  
  }else showImg = true;
  if (showImg && !initTone) {
    
    osc.frequency.value = 200;
    osc.mute =false;
    osc.harmonicity.value = 2;
    osc.type.value = "sawtooth";
    ampEnv.triggerAttackRelease(60);
    

  }else osc.mute = true;
}