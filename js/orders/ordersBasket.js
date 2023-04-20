//GLOBAL VARIABLES-------------------------------------------------------------------------------------------
//the total value of the counter for each card
let counterValue;
// variables for the counter of goods in the cart
let totalCounter = localStorage.getItem("totalCounter");
//element in wich cards are added
const ordersList = document.querySelector(".orders");
//array with selected cards
const cards = localStorage.getItem("cards");
//array with all cards

//ACTIONS IF THERE IS DATA ABOUT ADDED CARDS IN LOCAL STORAGE-------------------------------------------------------
if (cards != null) {
  //conversion to array
  const cardsList = cards.split([",sep "]);
  //adding to html
  ordersList.insertAdjacentHTML("beforeend", cardsList.join(" "));

  //cycle for ordered goods----------------------------------------------------------------------------------------
  for (let i = 1; i < 34; ++i) {
    //search for all cards with one id
    const cardsArr = ordersList.querySelectorAll(`[data-id="${i}"]`);
    //get counter value
    counterValue = parseInt(localStorage.getItem(i));
    //if the countr is zero, remove the cards
    if (counterValue == 0) {
      //cycle for cards added to cart
      for (let j = 0; j < cardsArr.length; ++j) {
        const card = cardsArr[j];
        card.remove();
      }
    }
    //if there are more than one cards with one id, delete all but one
    if (cardsArr.length > 1) {
      //cycle for all but one card added to cart
      for (let j = 1; j < cardsArr.length; ++j) {
        const card = cardsArr[j];
        card.remove();
      }
    }
    //assigning a counter value to each added card
    for (let k = 0; k < cardsArr.length; ++k) {
      if (ordersList.querySelector(`[data-counter="${i}"]`) != null) {
        ordersList.querySelector(`[data-counter="${i}"]`).innerText =
          counterValue;
      }
    }
  }
  //button click action---------------------------------------------------------------------------------------------
  //by clicking on the plus or minus buttons
  window.addEventListener("click", function (event) {
    if (
      event.target.dataset.action === "minus" ||
      event.target.dataset.action === "plus"
    ) {
      //clicked card
      const cardItem = event.target.closest(".basket_card");
      //counter value is equql to html text value
      counterValue = cardItem.querySelector("[data-counter]");

      //check if the element is a button with minus value
      if (event.target.dataset.action === "minus") {
        //checking if a number is positive
        if (counterValue.innerText >= 1) {
          //decrement the value of the card counter
          counterValue.innerText = --counterValue.innerText;
        }

        if (parseInt(counterValue.innerText) == 0) {
          // descrease the value of the counter of goods added to the cart
          totalCounter = --totalCounter;
          //saving the counte of added products to local storage
          localStorage.setItem("totalCounter", totalCounter);
          //page refresh
          location.reload();
        }
      }
      //check if the element is a button with plus value
      if (event.target.dataset.action === "plus") {
        if (counterValue.innerText < 15) {
          //increase the value of the card counter
          counterValue.innerText = ++counterValue.innerText;
        }
      }
      //send the data of the counters of each card
      localStorage.setItem(cardItem.dataset.id, counterValue.innerText);
    }
  });
  ////by clicking on the clear button
  window.addEventListener("click", function (event) {
    if (event.target.hasAttribute("data-remove")) {
      //remove all cards
      localStorage.clear("cards");
      //page refresh
      location.reload();
    }
  });
}
