//main page
// BENEFITS CARD LINE ANIMATION
const cardLines = document.querySelectorAll(".benefits-row_card-line");
window.addEventListener("scroll", lineAnimationOnScroll);
function lineAnimationOnScroll() {
  for (let index = 0; index < cardLines.length; index++) {
    const cardLine = cardLines[index];
    const cardLineHeight = cardLine.offsetHeight;
    const cardLineOffset = offset(cardLine).top;
    const animStart = 4;

    let cardLinePoint = window.innerHeight - cardLineHeight / animStart;
    if (cardLineHeight > window.innerHeight) {
      cardLinePoint = window.innerHeight - window.innerHeight / animStart;
    }

    if (
      window.pageYOffset > cardLineOffset - cardLinePoint &&
      window.pageYOffset < cardLineOffset + cardLineHeight
    ) {
      cardLine.classList.add("benefits-row_card-line--animation");
    } else {
      cardLine.classList.remove("benefits-row_card-line--animation");
    }
  }
}

function offset(el) {
  const rect = el.getBoundingClientRect(),
    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  return { top: rect.top + scrollTop, left: rect.left + scrollLeft };
}

//OWL CAROUSEL

$(document).ready(function () {
  $(".first-slider").owlCarousel({
    loop: true,
    dots: false,
    margin: 20,
    items: 3,

    touchDrag: true,
    responsive: {
      0: {
        items: 1,
      },
      576: {
        items: 2,
      },
      768: {
        items: 3,
        center: true,
      },
    },
  });
});
$(".slider-prev").on("click", function () {
  $(".first-slider").trigger("prev.owl.carousel");
});
$(".slider-next").on("click", function () {
  $(".first-slider").trigger("next.owl.carousel");
});
