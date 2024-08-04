// Navbar Background
document.addEventListener("DOMContentLoaded", function () {
  const navbar = document.querySelector(".navbar");

  window.addEventListener("scroll", function () {
    if (window.scrollY >= 125) {
      navbar.style.background = "var(--supColor)";
      navbar.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
    } else {
      navbar.style.background = "transparent";
      navbar.style.boxShadow = "none";
    }
  });
});

// Portfolio
document.addEventListener("DOMContentLoaded", function () {
  const galleryContainer = document.querySelector(".img-box");
  const galleryControlsContainer = document.querySelector(".images-controls");
  const galleryControls = ["previous", "next"];
  const galleryItem = document.querySelectorAll(".img-item");

  class Carousel {
    constructor(container, item, controls) {
      this.carouselContainer = container;
      this.carouselControls = controls;
      this.carouselArray = [...item];
    }

    updateGallery() {
      this.carouselArray.forEach((el, i) => {
        el.classList.remove(
          ...Array.from(el.classList).filter((cls) =>
            cls.startsWith("images-item-")
          )
        );
      });
      this.carouselArray.slice(0, 5).forEach((el, i) => {
        el.classList.add(`images-item-${i + 1}`);
      });
    }

    setCurrentState(direction) {
      if (direction.classList.contains("images-controls-previous")) {
        this.carouselArray.unshift(this.carouselArray.pop());
      } else {
        this.carouselArray.push(this.carouselArray.shift());
      }
      this.updateGallery();
    }

    setControls() {
      this.carouselControls.forEach((control) => {
        const button = document.createElement("button");
        button.classList.add(`images-controls-${control}`);
        button.innerText = control;
        galleryControlsContainer.appendChild(button);
      });
    }

    useControls() {
      const triggers = document.querySelectorAll(
        ".images-controls-previous, .images-controls-next"
      );
      triggers.forEach((control) => {
        control.addEventListener("click", (e) => {
          e.preventDefault();
          this.setCurrentState(control);
        });
      });
    }
  }

  const exampleCarousel = new Carousel(
    galleryContainer,
    galleryItem,
    galleryControls
  );

  exampleCarousel.setControls();
  exampleCarousel.useControls();
});

// Slider
document.addEventListener("DOMContentLoaded", function () {
  const texts = [
    "Creative Designer for All Your Digital Needs",
    "Crafting Stunning and User-Friendly Websites",
    "Unique Logos That Define Your Brand",
    "Innovative QR Codes for Easy Engagement",
    "Expert Microsoft Solutions to Boost Productivity",
  ];

  let index = 0;
  let charIndex = 0;
  let currentText = "";
  let isDeleting = false;
  let cursorVisible = true;

  const speed = 40; // سرعة الكتابة والحذف
  const holdTime = 2000; // المدة الزمنية للاحتفاظ بالنص الكامل قبل البدء في الحذف

  const pElement = document.querySelector(".slider-text");
  const cursorElement = document.createElement("span");
  cursorElement.innerText = "|";
  cursorElement.style.display = "inline-block";
  cursorElement.style.opacity = "1";
  pElement.appendChild(cursorElement);

  function updateText() {
    if (isDeleting) {
      currentText = texts[index].substring(0, charIndex--);
    } else {
      currentText = texts[index].substring(0, charIndex++);
    }

    pElement.innerText = currentText;
    pElement.appendChild(cursorElement);

    if (!isDeleting && charIndex === texts[index].length) {
      setTimeout(() => (isDeleting = true), holdTime);
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      index = (index + 1) % texts.length;
    }

    setTimeout(updateText, speed);
  }

  function blinkCursor() {
    cursorVisible = !cursorVisible;
    cursorElement.style.opacity = cursorVisible ? "1" : "0";
    setTimeout(blinkCursor, 500);
  }

  updateText();
  blinkCursor();
});
