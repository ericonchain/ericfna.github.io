// Intro

let intro = document.querySelector(".intro");
let introLogo = document.querySelector(".introLogo");
let logoSpan = document.querySelectorAll(".logo-letter");

window.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    logoSpan.forEach((span, index) => {
      setTimeout(() => {
        span.classList.add("active");
      }, (index + 1) * 100);
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
    }, 2300);
  });
});

// Website links

const openLearn = function () {
  window.open("learn.html");
};

const openTV = function () {
  window.open("leoTV.html");
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
  window.open("https://wleo.io");
};

// Scroll and show

const boxes = document.querySelectorAll(".box");

window.addEventListener("scroll", checkBoxes);

checkBoxes(); // This runs the function as the first thing

function checkBoxes() {
  const triggerBottom = (window.innerHeight / 10) * 9; // We will use a slightly smaller number than the current innerHeight, we can't use a fixed number because this height can change depending on the browser, zoom of the user and much more.

  boxes.forEach((box) => {
    const boxTop = box.getBoundingClientRect().top; // Returns a DomRect object (an object rectangle) providing information about the size of an element and its position relative to the viewport - thanks MDN.

    if (boxTop < triggerBottom) {
      box.classList.add("show");
    } else {
      box.classList.remove("show");
    }
  });
}

const texts = document.querySelectorAll(".containerText");

window.addEventListener("scroll", checkTexts);

checkTexts(); // This runs the function as the first thing

function checkTexts() {
  const triggerBottom = (window.innerHeight / 10) * 9; // We will use a slightly smaller number than the current innerHeight, we can't use a fixed number because this height can change depending on the browser, zoom of the user and much more.

  texts.forEach((text) => {
    const textTop = text.getBoundingClientRect().top; // Returns a DomRect object (an object rectangle) providing information about the size of an element and its position relative to the viewport - thanks MDN.

    if (textTop < triggerBottom) {
      text.classList.add("show");
    } else {
      text.classList.remove("show");
    }
  });
}

const appbuttons = document.querySelectorAll(".appbutton");

window.addEventListener("scroll", checkButtons);

checkButtons(); // This runs the function as the first thing

function checkButtons() {
  const triggerBottom = (window.innerHeight / 10) * 9; // We will use a slightly smaller number than the current innerHeight, we can't use a fixed number because this height can change depending on the browser, zoom of the user and much more.

  appbuttons.forEach((appbutton) => {
    const buttonTop = appbutton.getBoundingClientRect().top; // Returns a DomRect object (an object rectangle) providing information about the size of an element and its position relative to the viewport - thanks MDN.

    if (buttonTop < triggerBottom) {
      appbutton.classList.add("show");
    }
  });
}

const backgrounds = document.querySelectorAll(".communityBackground");

window.addEventListener("scroll", checkBackgrounds);

checkBackgrounds(); // This runs the function as the first thing

function checkBackgrounds() {
  const triggerBottom = (window.innerHeight / 10) * 9; // We will use a slightly smaller number than the current innerHeight, we can't use a fixed number because this height can change depending on the browser, zoom of the user and much more.

  backgrounds.forEach((background) => {
    const backgroundTop = background.getBoundingClientRect().top; // Returns a DomRect object (an object rectangle) providing information about the size of an element and its position relative to the viewport - thanks MDN.

    if (backgroundTop < triggerBottom) {
      background.classList.add("show");
    }
  });
}

/* Animated Nav Bar */

const nav = document.querySelector(".nav");

window.addEventListener("scroll", fixNav);

function fixNav() {
  if (window.scrollY > nav.offsetHeight + 150) {
    nav.classList.add("active");
  } else {
    nav.classList.remove("active");
  }
}

/* LEO TV */

// This week on Leo TV

const panels = document.querySelectorAll(".panel");

panels.forEach((panel) => {
  panel.addEventListener("click", () => {
    removeActiveClasses();
    panel.classList.add("activeShow");
  });
});

function removeActiveClasses() {
  panels.forEach((panel) => {
    panel.classList.remove("activeShow");
  });
}

/* Countdown AMA */

var deadlineAMA = new Date(Date.UTC(2022, 8, 23, 17, 0, 0, 0)).getTime();
var xAMA = setInterval(function () {
  var now = new Date().getTime();
  var t = deadlineAMA - now;
  var days = Math.floor(t / (1000 * 60 * 60 * 24));
  var hours = Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((t % (1000 * 60)) / 1000);
  document.getElementById("countdownToAMA").innerHTML =
    days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
  if (t < 0) {
    clearInterval(xAMA);
    document.getElementById("countdownToAMA").innerHTML =
      "Show is Live right now!";
  }
}, 1000);

/* Catch up */

document.addEventListener("click", (e) => {
  let handle;
  if (e.target.matches(".handle")) {
    handle = e.target;
  } else {
    handle = e.target.closest(".handle");
  }
  if (handle != null) onHandleClick(handle);
});

const throttleProgressBar = throttle(() => {
  document.querySelectorAll(".progress-bar").forEach(calculateProgressBar);
}, 250);
window.addEventListener("resize", throttleProgressBar);

document.querySelectorAll(".progress-bar").forEach(calculateProgressBar);

function calculateProgressBar(progressBar) {
  progressBar.innerHTML = "";
  const slider = progressBar.closest(".row").querySelector(".slider");
  const itemCount = slider.children.length;
  const itemsPerScreen = parseInt(
    getComputedStyle(slider).getPropertyValue("--items-per-screen")
  );
  let sliderIndex = parseInt(
    getComputedStyle(slider).getPropertyValue("--slider-index")
  );
  const progressBarItemCount = Math.ceil(itemCount / itemsPerScreen);

  if (sliderIndex >= progressBarItemCount) {
    slider.style.setProperty("--slider-index", progressBarItemCount - 1);
    sliderIndex = progressBarItemCount - 1;
  }

  for (let i = 0; i < progressBarItemCount; i++) {
    const barItem = document.createElement("div");
    barItem.classList.add("progress-item");
    if (i === sliderIndex) {
      barItem.classList.add("active");
    }
    progressBar.append(barItem);
  }
}

function onHandleClick(handle) {
  const progressBar = handle.closest(".row").querySelector(".progress-bar");
  const slider = handle.closest(".showContainer").querySelector(".slider");
  const sliderIndex = parseInt(
    getComputedStyle(slider).getPropertyValue("--slider-index")
  );
  const progressBarItemCount = progressBar.children.length;
  if (handle.classList.contains("left-handle")) {
    if (sliderIndex - 1 < 0) {
      slider.style.setProperty("--slider-index", progressBarItemCount - 1);
      progressBar.children[sliderIndex].classList.remove("active");
      progressBar.children[progressBarItemCount - 1].classList.add("active");
    } else {
      slider.style.setProperty("--slider-index", sliderIndex - 1);
      progressBar.children[sliderIndex].classList.remove("active");
      progressBar.children[sliderIndex - 1].classList.add("active");
    }
  }

  if (handle.classList.contains("right-handle")) {
    if (sliderIndex + 1 >= progressBarItemCount) {
      slider.style.setProperty("--slider-index", 0);
      progressBar.children[sliderIndex].classList.remove("active");
      progressBar.children[0].classList.add("active");
    } else {
      slider.style.setProperty("--slider-index", sliderIndex + 1);
      progressBar.children[sliderIndex].classList.remove("active");
      progressBar.children[sliderIndex + 1].classList.add("active");
    }
  }
}

function throttle(cb, delay = 1000) {
  let shouldWait = false;
  let waitingArgs;
  const timeoutFunc = () => {
    if (waitingArgs == null) {
      shouldWait = false;
    } else {
      cb(...waitingArgs);
      waitingArgs = null;
      setTimeout(timeoutFunc, delay);
    }
  };

  return (...args) => {
    if (shouldWait) {
      waitingArgs = args;
      return;
    }

    cb(...args);
    shouldWait = true;
    setTimeout(timeoutFunc, delay);
  };
}
