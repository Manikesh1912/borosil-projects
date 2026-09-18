const hero = document.querySelector(".hero");
const product = document.querySelector(".product");

const lid = document.querySelector(".lid");
const seal = document.querySelector(".seal");

const clipLeft = document.querySelector(".clip-left");
const clipRight = document.querySelector(".clip-right");

const intro = document.querySelector(".intro");

const progressBar = document.querySelector(".progress-bar");

const stateNumber = document.querySelector(".state-number");
const stateName = document.querySelector(".state-name");


function clamp(value, min, max){
  return Math.min(Math.max(value, min), max);
}


function ease(value){
  return value * value * (3 - 2 * value);
}


function updateHero(){

  const rect = hero.getBoundingClientRect();

  const total = hero.offsetHeight - window.innerHeight;

  const progress = clamp(
    -rect.top / total,
    0,
    1
  );


  /*
    ---------------------------------------
    PRODUCT CAMERA MOVEMENT
  ---------------------------------------
  */

  const scale = 0.86 + progress * 0.18;

  const x = progress * -20;

  const y = Math.sin(progress * Math.PI) * -12;

  const rotation = progress * -2;


  product.style.transform = `
    translate(${x}px, ${y}px)
    scale(${scale})
    rotate(${rotation}deg)
  `;


  /*
    ---------------------------------------
    LID
    0 → .45
    ---------------------------------------
  */

  const lidProgress = clamp(
    progress / 0.45,
    0,
    1
  );

  const lidEase = ease(lidProgress);

  const lidY = -lidEase * 85;

  const lidRotation = lidEase * 8;

  lid.style.transform = `
    translateY(${lidY}px)
    rotateX(${lidRotation}deg)
  `;


  /*
    ---------------------------------------
    SEAL
    ---------------------------------------
  */

  const sealY = -lidEase * 45;

  seal.style.transform = `
    translateY(${sealY}px)
  `;


  /*
    ---------------------------------------
    CLIPS
    ---------------------------------------
  */

  const clipProgress = clamp(
    (progress - 0.08) / 0.37,
    0,
    1
  );

  const clipEase = ease(clipProgress);

  clipLeft.style.transform = `
    translateX(${-28 * clipEase}px)
    rotate(${-8 * clipEase}deg)
  `;

  clipRight.style.transform = `
    translateX(${28 * clipEase}px)
    rotate(${8 * clipEase}deg)
  `;


  /*
    ---------------------------------------
    INTRO FADES AWAY
    ---------------------------------------
  */

  const introProgress = clamp(
    progress / 0.18,
    0,
    1
  );

  intro.style.opacity = 1 - introProgress;

  intro.style.transform = `
    translateY(${-30 * introProgress}px)
  `;


  /*
    ---------------------------------------
    PROGRESS BAR
    ---------------------------------------
  */

  progressBar.style.width = `${progress * 100}%`;


  /*
    ---------------------------------------
    STATE TEXT
    ---------------------------------------
  */

  if(progress < .25){

    stateNumber.textContent = "01";
    stateName.textContent = "CLOSED";

  }else if(progress < .55){

    stateNumber.textContent = "02";
    stateName.textContent = "OPENING";

  }else if(progress < .82){

    stateNumber.textContent = "03";
    stateName.textContent = "OPEN";

  }else{

    stateNumber.textContent = "04";
    stateName.textContent = "EXPLORE";

  }
}


window.addEventListener(
  "scroll",
  updateHero,
  { passive:true }
);

window.addEventListener(
  "resize",
  updateHero
);

updateHero();