//GLOBAL VARIABLES-------------------------------------------------------------------------------------------
//the total value of the counter for each card
let counterValue;
// variables for the counter of goods in the cart
let totalCounter = localStorage.getItem("totalCounter");
//get an element showing the value of the cards in the basket
const cartCounter = document.querySelector(".cart-counter");
const cartCounterMobile = document.querySelector(".cart-counter--mobile");

//CYCLE FOR EACH PRODUCT CARD---------------------------------------------------------------------------------
//array with all order buttons
const cardsBtn = Array.from(document.querySelectorAll("[data-cart]"));
//array with all cards
const cards = Array.from(document.querySelectorAll(".catalog_card"));
//a cycle that substitutes the counter values into the cards that are already in the local sorage
for (let i = 1; i < cards.length + 1; ++i) {
  //getting counter value by id
  const initialCounterValue = localStorage.getItem(i);
  //if the value of the card counter is in the local storage, assign this value to the counterValue variable
  if (initialCounterValue != null) {
    counterValue = parseInt(initialCounterValue);
  } else {
    counterValue = 0;
  }
  //change counter text in html
  document.querySelector(`[data-counter="${i}"]`).innerText = counterValue;
  if (counterValue > 0) {
    //add a style to the button and change the text
    cardsBtn[i - 1].classList.add("catalog_card-btn--active");
    cardsBtn[i - 1].innerText = "ORDERED";
    //the counter of items in the cart becomes visible and the value of totalCounter variable is assigned to it
    if (window.innerWidth > 576) {
      cartCounter.classList.remove("none");
      cartCounter.innerText = totalCounter;
    } else {
      cartCounterMobile.classList.remove("none");
      cartCounterMobile.innerText = totalCounter;

      const mobileNav = document.querySelector(".mobile-nav_list");

      if (!mobileNav.hasAttribute(".mobile-nav_list--open")) {
        mobileNav.classList.add("mobile-nav_list--open");
      }
    }
  }
}

//BUTTON CLICK ACTIONS---------------------------------------------------------------------------------------
//array with selected cards
let cardsList = [localStorage.getItem("cards")];

//by clicking on the plus or minus buttons
window.addEventListener("click", function (event) {
  if (
    event.target.dataset.action === "minus" ||
    event.target.dataset.action === "plus"
  ) {
    //clicked card
    const cardItem = event.target.closest(".catalog_card");
    //counter value is equql to html text value
    counterValue = cardItem.querySelector("[data-counter]");
    //change the style and text of the button
    buttonChange();
    //check if the element is a button with minus value
    if (event.target.dataset.action === "minus") {
      if (parseInt(counterValue.innerText) >= 1) {
        //decrement the value of the card counter
        counterValue.innerText = --counterValue.innerText;
      }
      //when the value of the card counter decreases to zero
      if (parseInt(counterValue.innerText) == 0) {
        if (totalCounter >= 1) {
          // descrease the value of the counter of goods added to the cart
          totalCounter = --totalCounter;
          cartCounter.innerText = totalCounter;
          //if the value of the counter of added goods is zero,then hide the counter of goods
          if (totalCounter == 0) {
            cartCounter.classList.add("none");
          }
        }
        //change button style
        const cardBtn = cardItem.querySelector("[data-cart]");
        cardBtn.classList.remove("catalog_card-btn--active");
      }
    }
    //check if the element is a button with plus value
    if (event.target.dataset.action === "plus") {
      if (parseInt(counterValue.innerText) < 15) {
        //if initialy the value of the card counter is zero
        if (parseInt(counterValue.innerText) == 0) {
          //chnge the value of the counter of ordered goods
          totalCounterChange();
        }
        //increase the value of the card counter
        counterValue.innerText = ++counterValue.innerText;
      }
    }
    //form an array with ordered goods
    orderFormation();
    //send the data of the counters of each card and the counter of ordered goods to the local storage
    localStorage.setItem(cardItem.dataset.id, counterValue.innerText);
    localStorage.setItem("totalCounter", totalCounter);
  }
});

//by clicking on the order button
window.addEventListener("click", function (event) {
  if (event.target.hasAttribute("data-cart")) {
    //clicked card
    const cardItem = event.target.closest(".catalog_card");
    //counter value is equql to html text value
    counterValue = cardItem.querySelector("[data-counter]");
    //change the style and text of the button
    buttonChange();
    if (parseInt(counterValue.innerText) == 0) {
      //increase the value of the card counter
      totalCounterChange();
    }
    //form an array with ordered goods
    orderFormation();
    //increase the value of the card counter
    counterValue.innerText = ++counterValue.innerText;
    //send the data of the counters of each card and the counter of ordered goods to the local storage
    localStorage.setItem(cardItem.dataset.id, counterValue.innerText);
    localStorage.setItem("totalCounter", totalCounter);
  }
});

//FUNCTIONS--------------------------------------------------------------------------------------------------------
function orderFormation() {
  const cardItem = event.target.closest(".catalog_card");
  const cardDetails = {
    id: cardItem.dataset.id,
    imgSrc: cardItem.querySelector(".card_main-img").getAttribute("src"),
    title: cardItem.querySelector(".catalog_card-title").innerText,
    productPrice: cardItem.querySelector(".catalog_card-price").innerText,
    productDescription: cardItem.querySelector(".catalog_card-text").innerText,
    //cardCounter: counterValue.innerText,
  };
  //CARD'S HTML CODE
  const cardHtml = `sep <div class="basket_card" data-id="${cardDetails.id}">
     <img
     class="basket_card-img"
     src="${cardDetails.imgSrc}"
     alt="Image"
     />
     <div class="catalog_card-content basket_card-content">
         <div class="catalog_card-header basket_card-header">
             <h4 class="catalog_card-title">${cardDetails.title}</h4>
             <p class="catalog_card-text basket_card-text">
             ${cardDetails.productDescription}
             </p>
         </div>
  
         <div class="catalog_card-footer basket_card-footer">
             <div class="catalog_card-btn_counter">
             <button class="counter_minus">
                 <img
                 src="./img/general/minus.png"
                 alt="-"
                 data-action="minus"
                 />
             </button>
             <p class="counter-text" data-counter="${cardDetails.id}"></p>
             <button class="counter_plus">
                 <img
                 src="./img/general/plus.png"
                 alt="+"
                 data-action="plus"
                 />
             </button>
             </div>
             <p class="catalog_card-price basket-price">${cardDetails.productPrice}</p>
         </div>
     </div>
  </div>`;
  cardsList.push(cardHtml);
  localStorage.setItem("cards", cardsList);
}
function buttonChange() {
  const cardItem = event.target.closest(".catalog_card");
  const cardBtn = cardItem.querySelector("[data-cart]");
  cardBtn.classList.add("catalog_card-btn--active");
  cardBtn.innerText = "ORDERED";
}
function totalCounterChange() {
  //increase the counter of added goods
  totalCounter = ++totalCounter;
  //the counter of added products becomes visible and is assigned the value of totalCounter
  if (window.innerWidth > 576) {
    cartCounter.classList.remove("none");
    cartCounter.innerText = totalCounter;
  } else {
    cartCounterMobile.classList.remove("none");
    cartCounterMobile.innerText = totalCounter;

    const mobileNav = document.querySelector(".mobile-nav_list");

    if (!mobileNav.hasAttribute(".mobile-nav_list--open")) {
      mobileNav.classList.add("mobile-nav_list--open");
    }
  }
}
