document.addEventListener("DOMContentLoaded", () => {
  const timeEl = document.querySelector(".time");
  const dateEl = document.querySelector(".date");
  const unlockBtn = document.querySelector(".unlock-hint");
  const lockScreen = document.querySelector(".lock");
  const login = document.querySelector(".login");
  const loginBox = document.querySelector(".login-box");
  const userInput = document.querySelector("#username");
  const passInput = document.querySelector("#password");
  const loginBtn = document.querySelector("#loginBtn");

  /* ----- CLOCK ----- */
  function updateClock() {
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    const hh = hours.toString().padStart(2, "0");
    const mm = minutes.toString().padStart(2, "0");
    timeEl.textContent = `${hh}:${mm}`;
    dateEl.textContent = now.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    });
  }
  updateClock();
  setInterval(updateClock, 1000);

  /* ----- UNLOCK CLICK ----- */
  unlockBtn?.addEventListener("click", () => {
    unlockBtn.style.display = "none";
    login.classList.remove("hidden");
    userInput.focus();
  });

  /* ----- LOGIN ACTION ----- */
  loginBtn?.addEventListener("click", (e) => {
    e.preventDefault();
    const user = userInput.value.trim().toLowerCase();
    const pass = passInput.value.trim();

    // you can customize username/password here
    const correctUser = "delta";
    const correctPass = "studio";

    if (user === correctUser && pass === correctPass) {
      // play unlock animation
      lockScreen.classList.add("unlocking");
      login.classList.add("hidden");
      setTimeout(() => {
        window.location.href = "desktop.html";
      }, 800);
    } else {
      loginBox.classList.add("shake");
      setTimeout(() => loginBox.classList.remove("shake"), 500);
    }
  });
});

/* ----- Small CSS helper (shake animation) ----- */
const style = document.createElement("style");
style.textContent = `
@keyframes shake {
  0%,100% { transform: translateX(0); }
  20%,60% { transform: translateX(-6px); }
  40%,80% { transform: translateX(6px); }
}
.shake { animation: shake 0.4s; }
`;
document.head.appendChild(style);
