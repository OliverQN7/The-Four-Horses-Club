const sliderItem = document.querySelectorAll(".stages__items-item425");
const sliderLine = document.querySelector(".stages__items-425");
const prevBtn = document.getElementById("btn-prevS");
const nextBtn = document.getElementById("btn-nextS");
const sliderDots = document.querySelectorAll(".slider-dot");

let sliderCount = 0;
let sliderWidth;

window.addEventListener("resize", showSlide);

nextBtn.addEventListener("click", nextSlide);
prevBtn.addEventListener("click", prevSlide);

function showSlide() {
  sliderWidth = document.querySelector(".stages__container").offsetWidth;
  sliderLine.style.width = document.documentElement.clientWidth;

  rollSlider();
}

function nextSlide() {
  sliderCount++;
  if (sliderCount === sliderItem.length - 1) {
    nextBtn.setAttribute("disabled", "disabled");
  } else {
    nextBtn.removeAttribute("disabled");
  }
  if (sliderCount === 0) {
    prevBtn.setAttribute("disabled", "disabled");
  } else {
    prevBtn.removeAttribute("disabled");
  }
  rollSlider(sliderCount, sliderWidth);
  thisSlide(sliderCount);
}

{
  if (sliderCount === 0) {
    prevBtn.setAttribute("disabled", "disabled");
  } else if (sliderCount > 0) {
    prevBtn.removeAttribute("disabled");
  }
}

function prevSlide() {
  sliderCount--;
  if (sliderCount < 0) {
    sliderCount = sliderItem.length - 1;
  }

  if (sliderCount === sliderItem.length - 1) {
    nextBtn.setAttribute("disabled", "disabled");
  } else {
    nextBtn.removeAttribute("disabled");
  }
  if (sliderCount === 0) {
    prevBtn.setAttribute("disabled", "disabled");
  } else {
    prevBtn.removeAttribute("disabled");
  }
  rollSlider(sliderCount, sliderWidth);
  thisSlide(sliderCount);
}

function rollSlider(sliderCount, sliderWidth) {
  const startPosition = -sliderCount * sliderWidth;
  sliderLine.style.transform = `translateX(${startPosition}px)`;
  sliderLine.style.overflow = "visible";
}

function thisSlide(index) {
  sliderDots.forEach((item) => item.classList.remove("active"));
  sliderDots[index].classList.add("active");
}
sliderDots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    sliderCount = index;
    rollSlider(sliderCount, sliderWidth);
    thisSlide(sliderCount);
  });
});

showSlide();
