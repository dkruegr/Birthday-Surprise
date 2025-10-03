const surpriseBtn = document.getElementById("surpriseBtn"); 
const cakeScene = document.getElementById("cakeScene"); 
const intro = document.getElementById("intro");
const wishBtn = document.getElementById("wishBtn");
const flame = document.querySelector(".flame");
const smoke = document.querySelector(".smoke");
const message = document.getElementById("message");
const birthdaySong = document.getElementById("birthdaySong");


// Confetti setup
const confettiCanvas = document.getElementById("confetti");
const ctx = confettiCanvas.getContext("2d");
confettiCanvas.width = window.innerWidth;
confettiCanvas.height = window.innerHeight;

let confettiParticles = []; 

function createConfetti() {
     return {
         x: Math.random() * confettiCanvas.width,
         y: Math.random() * confettiCanvas.height - confettiCanvas.height, 
         r: Math.random() * 6 + 2, 
         d: Math.random() * confettiCanvas.height, 
         color: `hsl(${Math.random() * 360}, 100%, 50%)`, 
         tilt: Math.random() * 10 - 10, 
         tiltAngleIncremental: Math.random() * 0.07 + 0.05, 
         tiltAngle: 0
     }; 
} 

function drawConfetti() {
     ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height); 
     confettiParticles.forEach(p => {
         ctx.beginPath(); 
         ctx.lineWidth = p.r; 
         ctx.strokeStyle = p.color; 
         ctx.moveTo(p.x + p.tilt + p.r / 2, p.y); 
         ctx.lineTo(p.x + p.tilt, p.y + p.tilt + p.r / 2); 
         ctx.stroke(); 
    }); updateConfetti(); 
}

function updateConfetti() {
     confettiParticles.forEach(p => { 
        p.tiltAngle += p.tiltAngleIncremental; 
        p.y += (Math.cos(p.d) + 3 + p.r / 2) / 2; 
        p.x += Math.sin(p.d); 
        p.tilt = Math.sin(p.tiltAngle - p.r / 2) * 15; 
        if (p.y > confettiCanvas.height) {
             p.x = Math.random() * confettiCanvas.width; 
             p.y = -20; 
        } 
    }); 
} 

function startConfetti() {
     confettiParticles = Array.from({ length: 150 }, createConfetti); 
     setInterval(drawConfetti, 20); 
}

surpriseBtn.addEventListener("click", () => {
     intro.classList.add("hidden"); 
     cakeScene.classList.remove("hidden"); 
     setTimeout(() => {
         flame.classList.remove("hidden"); 
         wishBtn.classList.remove("hidden"); 
    }, ); 
});

wishBtn.addEventListener("click", () => {
  flame.style.display = "none"; // candle goes out
  smoke.classList.add("active"); // smoke animates
  message.textContent = "Yay! You've made your first birthday wish 🎉 Your years are going to be magical!";
  flame.classList.add("hidden"); 
  setTimeout(() => {
     message.classList.remove("hidden"); 
     startConfetti(); 
     birthdaySong.play(); 
    }, 500); 
  // Trigger confetti
  confettiParticles = [];
  for (let i = 0; i < 150; i++) {
    confettiParticles.push(new Confetti());
  }
  animateConfetti();
});
