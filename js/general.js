//ARROW TOP APPEARANCE
const topBtn = document.querySelector(".top-btn");
function topBtnAppearance() {
  window.addEventListener("scroll", () => {
    //how many px to the top of the page
    const scrollY = window.scrollY || document.documentElement.scrollTop;
    //if the number of px to the top is more than 500, show arrow top btn
    if (scrollY > 500) {
      topBtn.classList.remove("top-btn--hidden");
    } else {
      topBtn.classList.add("top-btn--hidden");
    }
  });
  //arrow top click scrolls to the top of the page
  topBtn.onclick = () => {
    window.scrollTo({
      top: 0,
      left: 0,
    });
  };
}
topBtnAppearance();

//TITLE ANIMATION
const animTitles = document.querySelectorAll(".anim-title");
if (animTitles.length > 0) {
  window.addEventListener("scroll", animOnScroll);
  function animOnScroll() {
    //loop for each element with class 'anim-title'
    for (let index = 0; index < animTitles.length; index++) {
      //select element in order
      const animTitle = animTitles[index];

      //element height
      const animTitleHeight = animTitle.offsetHeight;

      //function offset element
      const animTitleOffset = offset(animTitle).top;

      let animTitlePoint = window.innerHeight - animTitleHeight;
      if (animTitleHeight > window.innerHeight) {
        animTitlePoint = window.innerHeight - window.innerHeight;
      }

      if (
        window.pageYOffset > animTitleOffset - animTitlePoint &&
        window.pageYOffset < animTitleOffset + animTitleHeight
      ) {
        animTitle.classList.add("title--animation");
      } else {
        animTitle.classList.remove("title--animation");
      }
    }
  }
  animOnScroll();
}
function offset(el) {
  //find the location of the element on tne page
  const rect = el.getBoundingClientRect(),
    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  return { top: rect.top + scrollTop, left: rect.left + scrollLeft };
}

//mobile nav opener
const navBtn = document.querySelector(".nav-list-opener");
const mobileNav = document.querySelector(".mobile-nav_list");
navBtn.onclick = () => {
  //nav button animation on click
  const firstLine = document.querySelector("#nav-oppener_first-line"),
    secondLine = document.querySelector("#nav-oppener_second-line"),
    thirdLine = document.querySelector("#nav-oppener_third-line");
  firstLine.classList.toggle("nav-opener_line--first-animation");
  secondLine.classList.toggle("nav-opener_line--first-animation");
  thirdLine.classList.toggle("nav-opener_line--second-animation");

  //show mobile nav
  mobileNav.classList.toggle("mobile-nav_list--open");
};
