// Intro

let intro = document.querySelector(".intro");
let introLogo = document.querySelector(".introLogo");
let logoSpan = document.querySelectorAll(".logo-letter");

window.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    logoSpan.forEach((span, index) => {
      setTimeout(() => {
        span.classList.add("active");
      }, (index + 1) * 50);
    });

    setTimeout(() => {
      logoSpan.forEach((span, index) => {
        setTimeout(() => {
          span.classList.remove("active");
          span.classList.add("fade");
        }, (span + 1) * 50);
      });
    }, 2000);

    setTimeout(() => {
      intro.style.top = "-100vh";
    }, 1650);
  });
});

// Website links

const openLearn = function () {
  window.open("learn.html");
};

const openTV = function () {
  window.open("leoTV.html");
  return false;
};

const openBridge = function () {
  window.open("https://wleo.io");
};

const openLeo = function () {
  window.open("https://leofinance.io");
};

const openCub = function () {
  window.open("https://cubdefi.com");
};

const openPolycub = function () {
  window.open("https://polycub.com");
};

const openArticulos = function () {
  window.open("index.html");
};
