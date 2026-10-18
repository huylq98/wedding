// 05 · Chuyện Hai Ta: đổi tiến độ cuộn thành --s cho từng chương và độ mờ khi chuyển cảnh.
const story = document.querySelector(".st-story");
const scenes = [...story.querySelectorAll(".sc")];
const dots = [...story.querySelectorAll(".st-dots li")];
const dotList = story.querySelector(".st-dots");
const fade = 0.05;

function clamp(value) {
  return Math.min(1, Math.max(0, value));
}

function updateStory() {
  const rect = story.getBoundingClientRect();
  const travel = rect.height - window.innerHeight;
  const time = clamp(-rect.top / travel) * scenes.length;
  let active = 0;

  scenes.forEach((scene, index) => {
    const fadeIn = index === 0 ? 1 : clamp((time - index + fade) / (fade * 2));
    const fadeOut = index === scenes.length - 1 ? 1 : 1 - clamp((time - index - 1 + fade) / (fade * 2));
    const opacity = Math.min(fadeIn, fadeOut);
    scene.style.setProperty("--s", clamp(time - index).toFixed(4));
    scene.style.opacity = opacity.toFixed(3);
    scene.style.visibility = opacity > 0 ? "visible" : "hidden";
    if (opacity >= 0.5) active = index;
  });

  dots.forEach((dot, index) => dot.classList.toggle("is-active", index === active));
  dotList.classList.toggle("is-dark", scenes[active].classList.contains("is-dark"));
}

let storyTicking = false;
window.addEventListener("scroll", () => {
  if (storyTicking) return;
  storyTicking = true;
  window.requestAnimationFrame(() => {
    updateStory();
    storyTicking = false;
  });
}, { passive: true });
window.addEventListener("resize", updateStory);
updateStory();
