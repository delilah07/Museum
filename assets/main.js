// import Normalize CSS
import "normalize.css";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import main styles
import "./style.css";

import { tns } from "../node_modules/tiny-slider/src/tiny-slider";
import "slick-carousel";

const slider = tns({
  container: ".slider-welcome__wrapper",
  items: 1,
  slideBy: "page",
  autoplay: true,
  mouseDrag: true,
  nav: true,
  startIndex: 1,
});

(function ($) {
  $(".video-slider__main").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    asNavFor: ".video-slider__nav",
  });
  $(".video-slider__nav").slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    asNavFor: ".video-slider__main",
    dots: true,
  });
})(jQuery);

const pictureInnerContainer = document.querySelector(
  ".gallery-section__wrapper"
);
const imgFolder = [
  "galery1..jpg",
  "galery2..jpg",
  "galery3..jpg",
  "galery4..jpg",
  "galery5..jpg",
  "galery6..jpg",
  "galery7..jpg",
  "galery8..jpg",
  "galery9..jpg",
  "galery10..jpg",
  "galery11..jpg",
  "galery12..jpg",
  "galery13..jpg",
  "galery14..jpg",
  "galery15..jpg",
];

function shuffle(arr) {
  return arr.sort(() => Math.random() - 0.5);
}
const addImg = (array) => {
  let newArr = shuffle(array);
  newArr.map((num) => {
    let img = document.createElement("img");
    img.classList.add("gallery-img");
    img.src = `./img/${num}`;
    img.alt = `galery1`;
    pictureInnerContainer.append(img);
  });
};
addImg(imgFolder);

const button = document.querySelector(".tickets-form__btn");

button.addEventListener("click", function (e) {
  const x = e.clientX;
  const y = e.clientY + 7150;

  const buttonTop = e.target.offsetTop;
  const buttonLeft = e.target.offsetLeft;

  const xInside = x - buttonLeft;
  const yInside = y - buttonTop;

  const circle = document.createElement("span");
  circle.classList.add("circle");
  circle.style.top = yInside + "px";
  circle.style.left = xInside + "px";

  this.appendChild(circle);

  setTimeout(() => circle.remove(), 500);
});

function showBooking() {
  document.querySelector(".ticket__booking").classList.add("visible");
  console.log("ggg");
}

function hideBooking() {
  document.querySelector(".ticket__booking").classList.remove("visible");
}

document
  .querySelector(".tickets-form__btn")
  .addEventListener("click", function () {
    showBooking();
  });
document
  .querySelector(".booking__wrapper .close")
  .addEventListener("click", function () {
    hideBooking();
  });
document.querySelector(".overlay").addEventListener("click", function () {
  hideBooking();
});

// burger menu
window.addEventListener(`resize`, (event) => {
  if (document.documentElement.clientWidth < 1440) {
    const toggle = () => {
      if (document.querySelector("#menuToggle input").checked) {
        document
          .querySelector(".welcome-section__text")
          .classList.add("hidden");
      } else {
        document
          .querySelector(".welcome-section__text")
          .classList.remove("hidden");
      }
    };

    document
      .querySelector("#menuToggle input")
      .addEventListener("change", toggle);

    let link = document.querySelectorAll(".mob-header__nav li a");
    link.forEach((item) =>
      item.addEventListener("click", function () {
        console.log("kk");
        document.querySelector("#menuToggle input").checked = false;
        document
          .querySelector(".welcome-section__text")
          .classList.remove("hidden");
      })
    );
  }
});

function stop() {
  var iframe = document.getElementById("youriframe");
  iframe.src = iframe.src;
}

// gallery scrolling
let isScrolling = false;

window.addEventListener("scroll", throttleScroll, false);

function throttleScroll(e) {
  if (isScrolling == false) {
    window.requestAnimationFrame(function () {
      scrolling(e);
      isScrolling = false;
    });
  }
  isScrolling = true;
}

document.addEventListener("DOMContentLoaded", scrolling, false);

const listItems = document.querySelectorAll(".gallery-section__wrapper img");

function scrolling(e) {
  for (let i = 0; i < listItems.length; i++) {
    let listItem = listItems[i];

    if (isPartiallyVisible(listItem)) {
      listItem.classList.add("active");
    } else {
      listItem.classList.remove("active");
    }
  }
}

function isPartiallyVisible(el) {
  let elementBoundary = el.getBoundingClientRect();

  let top = elementBoundary.top;
  let bottom = elementBoundary.bottom;
  let height = elementBoundary.height;

  return top + height >= 0 && height + window.innerHeight >= bottom;
}

function isFullyVisible(el) {
  let elementBoundary = el.getBoundingClientRect();

  let top = elementBoundary.top;
  let bottom = elementBoundary.bottom;

  return top >= 0 && bottom <= window.innerHeight;
}

// calculator
const totalCostSpan = document.querySelector(".tickets-form__total span");
const totalCostSpanPopup = document.querySelector(".total__price-qty");

let ticketCost = 0;
const radios = document.querySelectorAll(".tickets-form__radio");
let checkedValue = "";
function ticketCostF() {
  for (let i = 0; i < radios.length; i++) {
    if (radios[i].type === "radio" && radios[i].checked) {
      // get value, set checked flag or do whatever you need to
      ticketCost = radios[i].dataset.cost;
    }
  }
  return ticketCost;
}
function checkedValueF() {
  for (let i = 0; i < radios.length; i++) {
    if (radios[i].type === "radio" && radios[i].checked) {
      // get value, set checked flag or do whatever you need to
      checkedValue = radios[i].value;
    }
  }
  return checkedValue;
}
checkedValueF();
document.querySelector(".info-booking__summary select").value = checkedValue;
document.querySelector(
  ".value-input-ticket"
).innerHTML = `${checkedValue}  exhibition`;

const selectBasic = document.querySelector(".number-basic input");
const selectSenior = document.querySelector(".number-senior input");
const selectBasicPopUp = document.querySelector(".number-basic-popup input");
const selectSeniorPopUp = document.querySelector(".number-senior-popup input");
const numBasicPopUp = document.querySelector(".total__count-basic .num");
const numSeniorPopUp = document.querySelector(".total__count-senior .num");
numBasicPopUp.innerHTML = selectBasicPopUp.value = selectBasic.value;
numSeniorPopUp.innerHTML = selectSeniorPopUp.value = selectSenior.value;

function totalPrice() {
  let totalPrice =
    ticketCostF() * selectBasic.value +
    (ticketCostF() * selectSenior.value) / 2;
  totalCostSpan.innerHTML = `${totalPrice}`;
  totalCostSpanPopup.innerHTML = `${totalPrice}`;
  document.querySelector(".entry__buttons__first span span").innerHTML =
    ticketCost;
  document.querySelector(".entry__buttons__last span span").innerHTML =
    ticketCost / 2;
  document.querySelector(".total__count-basic .cost").innerHTML = ticketCost;
  document.querySelector(".total__count-senior .cost").innerHTML =
    ticketCost / 2;
  document.querySelector(".total-basic span").innerHTML =
    ticketCostF() * selectBasic.value;
  document.querySelector(".total-senior span").innerHTML =
    (ticketCostF() * selectSenior.value) / 2;
  document.querySelector(
    ".value-input-ticket"
  ).innerHTML = `${checkedValue}  exhibition`;
}
totalPrice();

document.querySelectorAll(".number button").forEach((item) =>
  item.addEventListener("click", () => {
    numBasicPopUp.innerHTML = selectBasicPopUp.value = selectBasic.value;
    numSeniorPopUp.innerHTML = selectSeniorPopUp.value = selectSenior.value;
    totalPrice();
  })
);
document.querySelectorAll(".entry__buttons__buttons button").forEach((item) =>
  item.addEventListener("click", () => {
    numBasicPopUp.innerHTML = selectBasic.value = selectBasicPopUp.value;
    numSeniorPopUp.innerHTML = selectSenior.value = selectSeniorPopUp.value;
    totalPrice();
  })
);
radios.forEach((item) =>
  item.addEventListener("click", () => {
    totalPrice();
    checkedValueF();
    document.querySelector(".info-booking__summary select").value =
      checkedValue;
    document.querySelector(
      ".value-input-ticket"
    ).innerHTML = `${checkedValue}  exhibition`;
  })
);
document
  .querySelector(".info-booking__summary select")
  .addEventListener("change", () => {
    checkedValue = document.querySelector(
      ".info-booking__summary select"
    ).value;
    console.log(checkedValue);
    if (checkedValue === "permanent") {
      radios[0].checked = true;
    }
    if (checkedValue === "temporary") {
      radios[1].checked = true;
    }
    if (checkedValue === "combined") {
      radios[2].checked = true;
    }
    totalPrice();
  });

// ticket information
const inputDate = document.querySelector(".input-date");
inputDate.min = new Date(
  new Date().getTime() - new Date().getTimezoneOffset() * 60000
)
  .toISOString()
  .split("T")[0];

function parseYMD(s) {
  let b = s.split(/\D/);
  let day = new Date(b[0], b[1] - 1, b[2]);
  return day;
}
function choosenDay(date) {
  let dayOfWeek = parseYMD(date).getDay();
  let month = parseYMD(date).getMonth();
  let weekHTML = document.querySelector(".value-input-date .week");
  let monthHTML = document.querySelector(".value-input-date .month");
  if (dayOfWeek === 7) {
    weekHTML.innerHTML = "Sunday";
  }
  if (dayOfWeek === 1) {
    weekHTML.innerHTML = "Monday";
  }
  if (dayOfWeek === 2) {
    weekHTML.innerHTML = "Tuesday";
  }
  if (dayOfWeek === 3) {
    weekHTML.innerHTML = "Wendsday";
  }
  if (dayOfWeek === 4) {
    weekHTML.innerHTML = "Thursday";
  }
  if (dayOfWeek === 5) {
    weekHTML.innerHTML = "Friday";
  }
  if (dayOfWeek === 6) {
    weekHTML.innerHTML = "Satuday";
  }
  if (dayOfWeek === 7) {
    weekHTML.innerHTML = "Sunday";
  }
  if (month === 0) {
    monthHTML.innerHTML = "January";
  }
  if (month === 1) {
    monthHTML.innerHTML = "February";
  }
  if (month === 2) {
    monthHTML.innerHTML = "March";
  }
  if (month === 3) {
    monthHTML.innerHTML = "April";
  }
  if (month === 4) {
    monthHTML.innerHTML = "May";
  }
  if (month === 5) {
    monthHTML.innerHTML = "June";
  }
  if (month === 6) {
    monthHTML.innerHTML = "July";
  }
  if (month === 7) {
    monthHTML.innerHTML = "August";
  }
  if (month === 8) {
    monthHTML.innerHTML = "September";
  }
  if (month === 9) {
    monthHTML.innerHTML = "October";
  }
  if (month === 10) {
    monthHTML.innerHTML = "November";
  }
  if (month === 11) {
    monthHTML.innerHTML = "December";
  }
  if (isNaN(parseYMD(date).getDate())) {
    document.querySelector(".value-input-date .day").innerHTML = "";
  } else {
    document.querySelector(".value-input-date .day").innerHTML =
      parseYMD(date).getDate();
  }
}
choosenDay(inputDate.value);
inputDate.addEventListener("change", (event) => {
  choosenDay(event.target.value);
});

let inputTime = document.querySelector(".summary__first input[type='time']");
console.log(inputTime.value);
function choosenTimey() {
  document.querySelector(".value-input-time").innerHTML = inputTime.value;
}
choosenTimey();
inputTime.addEventListener("change", (event) => {
  choosenTimey();
  console.log(inputTime.value);
});

// Contacts mapbox

mapboxgl.accessToken =
  "pk.eyJ1IjoiZGVsaWxhaDA3IiwiYSI6ImNrdW42c20xeTFrdGQycnJ2dTl4cm1yNnMifQ.GyOy2Z9FvLB1gC-3rr35EA";

const geojson = [
  {
    coordinates: [2.3364, 48.86091],
    color: "black",
  },
  {
    coordinates: [2.3333, 48.8602],
    color: "grey",
  },
  {
    coordinates: [2.3397, 48.8607],
    color: "grey",
  },
  {
    coordinates: [2.333, 48.8619],
    color: "grey",
  },
  {
    coordinates: [2.3365, 48.8625],
    color: "grey",
  },
];

const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/light-v10",
  center: [2.3364, 48.86091],
  zoom: 15.78,
});

map.addControl(new mapboxgl.NavigationControl());

geojson.forEach((geo) => {
  new mapboxgl.Marker({
    color: geo.color,
  })
    .setLngLat(geo.coordinates)
    .addTo(map);
});

// video

document.querySelectorAll(".slick-dots button").forEach((button) =>
  button.addEventListener("click", () => {
    const frames = document.querySelectorAll(".video-slider__nav iframe");
    frames.forEach((frame) => {
      for (var i = 0; i < frame.length; i++) {
        frame
          .item(i)
          .contentWindow.postMessage(
            '{"event":"command","func":"stopVideo","args":""}',
            "*"
          );
      }
    });
  })
);

// function onPlayerReady(event) {
//   document.querySelectorAll(".slick-dots button").forEach((button) =>
//     button.addEventListener("click", () => {
//       player.pauseVideo();
//     })
//   );
// }

document.querySelectorAll(".slick-arrow").forEach((button) =>
  button.addEventListener("click", () => {
    player.pauseVideo();
  })
);

// validation
function validateName(name) {
  let re = /^[a-zA-Z0-9 ]{3,15}$/;
  return re.test(name);
}
document
  .querySelector('.info-booking__summary > input[type="text"]')
  .addEventListener("change", () => {
    validateName();
  });

function validateEmail(email) {
  let re =
    /^[a-zA-Z0-9_-]{3,15}(\\.[_A-Za-z0-9-]+)*@[a-zA-Z]{4,}(\\.[A-Za-z0-9]+)*(\\.[a-zA-Z]{2,})$/;
  return re.test(email);
}
document
  .querySelector('.info-booking__summary > input[type="email"]')
  .addEventListener("change", () => {
    validateEmail();
  });

function validatePhone(phone) {
  let re = /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g;
  return re.test(phone);
}
document
  .querySelector('.info-booking__summary > input[type="tel"]')
  .addEventListener("change", () => {
    validatePhone();
  });

// custom video player
const playerVideoS = document.querySelectorAll(".video-slider__main > div");
playerVideoS.forEach((playerVideo) => {
  let video = playerVideo.querySelector("video");
  // const progress = playerVideo.querySelector(".progress");
  let progressBar = playerVideo.querySelector(".player__controls__progress");
  let toggleVideo = playerVideo.querySelector(".player__btn");
  let playVideo = playerVideo.querySelector(".big-play-btn");

  function togglePlay() {
    if (video.paused) {
      video.play();
      toggleVideo
        .querySelectorAll("img")
        .forEach((button) => button.classList.toggle("hidden"));
      playVideo.classList.add("hidden");
    } else {
      video.pause();
      toggleVideo
        .querySelectorAll("img")
        .forEach((button) => button.classList.toggle("hidden"));
      playVideo.classList.remove("hidden");
    }
  }

  playVideo.addEventListener("click", togglePlay);
  video.addEventListener("click", togglePlay);
  toggleVideo.addEventListener("click", togglePlay);
});

function skip() {}

console.log(`

`);
