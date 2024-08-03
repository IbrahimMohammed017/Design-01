// Navbar Background
// document.addEventListener("DOMContentLoaded", function () {
//   const slider = document.querySelector(".slider");
//   const navbar = document.querySelector(".navbar");

//   const observer = new IntersectionObserver(
//     (entries) => {
//       entries.forEach((entry) => {
//         if (entry.isIntersecting) {
//           navbar.style.background = "transparent";
//           navbar.style.boxShadow = "none";
//         } else {
//           navbar.style.background = "var(--supColor)";
//           navbar.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
//         }
//       });
//     },
//     { threshold: 0.1 }
//   );

//   observer.observe(slider);
// });

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

// *************************

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
