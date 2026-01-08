document.addEventListener("DOMContentLoaded", () => {
  let startY = 0;
  let isAnimating = false;

  const challenges = [
    {
      question: "Prietenul tău îți cere bani, dar știi că minte.",
      twists: ["Îi dai banii", "Îl refuzi", "Îi propui altă soluție"]
    },
    {
      question: "Găsești un telefon pierdut.",
      twists: ["Îl returnezi", "Îl păstrezi", "Cauți proprietarul online"]
    }
  ];

  let current = 0;

  const app = document.getElementById("app");
  const questionEl = document.getElementById("question");
  const buttonsEl = document.getElementById("buttons");

  function renderChallenge(direction = "up") {
    if (isAnimating) return;
    isAnimating = true;

    app.style.transition = "transform 0.35s ease, opacity 0.35s ease";
    app.style.transform =
      direction === "up" ? "translateY(-30px)" : "translateY(30px)";
    app.style.opacity = "0";

    setTimeout(() => {
      const challenge = challenges[current];
      questionEl.textContent = challenge.question;
      buttonsEl.innerHTML = "";

      challenge.twists.forEach(twist => {
        const btn = document.createElement("button");
        btn.textContent = twist;
        btn.onclick = () => alert("Ai ales: " + twist);
        buttonsEl.appendChild(btn);
      });

      app.style.transition = "none";
      app.style.transform =
        direction === "up" ? "translateY(30px)" : "translateY(-30px)";

      requestAnimationFrame(() => {
        app.style.transition = "transform 0.35s ease, opacity 0.35s ease";
        app.style.transform = "translateY(0)";
        app.style.opacity = "1";
        isAnimating = false;
      });
    }, 350);
  }

  document.addEventListener("touchstart", e => {
    startY = e.touches[0].clientY;
  });

  document.addEventListener("touchend", e => {
    const endY = e.changedTouches[0].clientY;
    const delta = startY - endY;

    if (Math.abs(delta) > 60) {
      current = (current + 1) % challenges.length;
      renderChallenge(delta > 0 ? "up" : "down");
    }
  });

  renderChallenge();
});
const card = document.querySelector('.card');

let startX = 0;
let currentX = 0;
let isDragging = false;

// Când începi să atingi cardul
card.addEventListener('touchstart', e => {
  startX = e.touches[0].clientX;
  isDragging = true;
  card.style.transition = 'none'; // scoate tranziția temporar
});

// Când miști degetul
card.addEventListener('touchmove', e => {
  if (!isDragging) return;

  currentX = e.touches[0].clientX;
  const diffX = currentX - startX;

  card.style.transform = `translateX(${diffX}px) rotate(${diffX * 0.05}deg)`;
});

// Când ridici degetul
card.addEventListener('touchend', () => {
  isDragging = false;
  card.style.transition = 'transform 0.3s ease';

  const diffX = currentX - startX;

  if (diffX > 120) {
    swipeRight();
  } else if (diffX < -120) {
    swipeLeft();
  } else {
    resetCard();
  }
});

// Funcțiile pentru swipe
function swipeRight() {
  card.style.transform = 'translateX(100vw) rotate(20deg)';
  setTimeout(nextQuestion, 300);
}

function swipeLeft() {
  card.style.transform = 'translateX(-100vw) rotate(-20deg)';
  setTimeout(nextQuestion, 300);
}

function resetCard() {
  card.style.transform = 'translateX(0)';
}

// Schimbarea întrebării (presupune că ai un array cu întrebări)
const questions = [
  "Întrebarea 1",
  "Întrebarea 2",
  "Întrebarea 3"
];
let index = 0;

function nextQuestion() {
  index = (index + 1) % questions.length;
  document.getElementById('question').innerText = questions[index];

  card.style.transition = 'none';
  card.style.transform = 'translateX(0)';
}
