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
