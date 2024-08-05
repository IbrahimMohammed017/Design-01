// Navbar Background
document.addEventListener("DOMContentLoaded", function () {
  const navbar = document.querySelector(".navbar");

  window.addEventListener("scroll", function () {
    if (window.scrollY >= 125) {
      navbar.style.background = "var(--mainColor)";
      navbar.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
    } else {
      navbar.style.background = "transparent";
      navbar.style.boxShadow = "none";
    }
  });
});

// Nav Bar
let list = document.querySelectorAll(".nav-item a");

list.forEach((li) => {
  li.addEventListener("click", removeActive);
});

function removeActive() {
  list.forEach((li) => {
    li.classList.remove("active");
    this.classList.add("active");
  });
}

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

// Up Button
window.addEventListener("scroll", function () {
  var button = document.querySelector(".up-button");
  if (window.scrollY >= 1000) {
    button.classList.add("visible");
  } else {
    button.classList.remove("visible");
  }
});

// Themes
// Event listener for list items
document.querySelectorAll("ul li").forEach(function (item) {
  item.addEventListener("click", function () {
    var themeClass = item.getAttribute("data-theme");
    // Hide all logos and show only the selected theme logo
    document.querySelectorAll(".navbar-brand img").forEach(function (img) {
      img.style.display = "none";
    });
    document.querySelector(themeClass).style.display = "block";

    // Define the CSS variables for each theme
    var themeCSS = {
      ".theme1": {
        "--mainColor": "#572671",
        "--supColor": "#311440",
        "--bgColor": "#F1EDF3",
        "--fontColor1": "#A3D1CC",
        "--fontColor2": "#0A020E",
      },
      ".theme2": {
        "--mainColor": "#256675",
        "--supColor": "#17525F",
        "--bgColor": "#F1EDF3",
        "--fontColor1": "#A3D1CC",
        "--fontColor2": "#0A020E",
      },
      ".theme3": {
        "--mainColor": "#F20231",
        "--supColor": "#0C5D7B",
        "--bgColor": "#F8E4CC",
        "--fontColor1": "#EFBF7F",
        "--fontColor2": "#12103D",
      },
      ".theme4": {
        "--mainColor": "#407F3E",
        "--supColor": "#89B449",
        "--bgColor": "#E7E0C4",
        "--fontColor1": "#DBD468",
        "--fontColor2": "#0A020E",
      },
      ".theme5": {
        "--mainColor": "#2E77AE",
        "--supColor": "#2377AE",
        "--bgColor": "#E0EAF5",
        "--fontColor1": "#FF8E2B",
        "--fontColor2": "#0A020E",
      },
    };

    // Apply the CSS variables to the :root
    var root = document.documentElement;
    var selectedTheme = themeCSS[themeClass];
    for (var variable in selectedTheme) {
      if (selectedTheme.hasOwnProperty(variable)) {
        root.style.setProperty(variable, selectedTheme[variable]);
      }
    }

    // Save the selected theme in localStorage
    localStorage.setItem("selectedTheme", themeClass);
  });
});

// Check for a saved theme in localStorage and apply it on page load
document.addEventListener("DOMContentLoaded", function () {
  var savedTheme = localStorage.getItem("selectedTheme");
  if (savedTheme) {
    // Trigger a click on the corresponding list item to apply the saved theme
    document.querySelector('ul li[data-theme="' + savedTheme + '"]').click();
  } else {
    // Set default theme (theme1)
    // Hide all logos except the first one (theme1)
    document
      .querySelectorAll(".navbar-brand img")
      .forEach(function (img, index) {
        if (index === 0) {
          img.style.display = "block";
        } else {
          img.style.display = "none";
        }
      });
  }
});

// Toggle theme
document.querySelector(".toggle").addEventListener("click", function () {
  var themesElement = document.querySelector(".themes");
  if (themesElement.style.right === "0px") {
    themesElement.style.right = "-140px";
  } else {
    themesElement.style.right = "0px";
  }
});
