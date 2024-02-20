/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/js/modules/app.js
class App {
  /**
   * @description
   * Свойства и методы экземпляра класса `Burger`.
   *
   * @type {AppBurger}
   */
  static burger = {
    close: undefined,
    isActive: false,
    matchMedia: undefined
  }

  /**
   * @description
   * Свойства экземпляра класса `Dialogs`.
   *
   * @type {AppDialogs}
   */
  static dialogs = {
    activeDialogs: 0
  };

  /**
   * @description
   * Хранит элементы `html` и `body`.
   *
   * @type {AppDocument}
   */
  static document = {
    body: document.body,
    html: document.documentElement
  }

  /**
   * @description
   * Свойства экземпляра класса `HeaderObserver`.
   *
   * @type {AppHeaderObservers}
   */
  static headerObservers = {
    $header: document.querySelector("[data-header=\"header\"]")
  }

  /**
   * @description
   * Свойства элемента `html`.
   *
   * @type {AppHTML}
   */
  static html = {
    htmlClassList: this.document.html.classList,
    htmlStyle: this.document.html.style
  }
}



;// CONCATENATED MODULE: ./src/js/modules/header-observers.js


const { headerObservers: { $header }, html: { htmlClassList, htmlStyle } } = App;

class HeaderObservers {
  #$header = $header;
  /** @type {HTMLDivElement} */
  #$headerWrapper = document.querySelector("[data-header=\"wrapper\"]");
  #addingClass = "scrolled";
  #cssProperty = "--header-height";
  #intersection;
  #resize;

  /** @param {HeaderObserversOptions} options */
  constructor(options = {}) {
    this.#intersection = options.intersection ?? true;
    this.#resize = options.resize ?? true;

    this.#init();
  }

  #init() {
    if (this.#intersection && this.#$header) {
      const intersectionObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          htmlClassList.toggle(this.#addingClass, !entry.isIntersecting);
        });
      });

      intersectionObserver.observe(this.#$header);
    }

    if (this.#resize && this.#$headerWrapper) {
      const resizeObserver = new ResizeObserver(entries => {
        entries.forEach(entry => {
          const { borderBoxSize: [{ blockSize }] } = entry;

          htmlStyle.setProperty(this.#cssProperty, `${blockSize}px`);
        });
      });

      resizeObserver.observe(this.#$headerWrapper);
    }
  }
}



;// CONCATENATED MODULE: ./src/js/scripts/scripts/header-observers.js


const headerObservers = new HeaderObservers();

;// CONCATENATED MODULE: ./src/js/scripts/scripts/up.js
/** @type {HTMLButtonElement} */
const upButton = document.querySelector(".up");
/** @type {NodeListOf<HTMLAnchorElement | HTMLButtonElement>} */
const firstFocusableElements = document.querySelectorAll("[data-up]");

upButton?.addEventListener("click", () => {
  let isFocused = false;

  scrollTo({
    top: 0,
  });

  firstFocusableElements?.forEach(element => {
    if (!isFocused) {
      const { dataset } = element;

      let { up } = dataset;

      up = up.trim();

      if (up) {
        const media = matchMedia(up);
        const { matches } = media;

        if (matches) {
          element.focus();

          isFocused = true;
        }
      } else {
        element.focus();

        isFocused = true;
      }
    }
  });
});

;// CONCATENATED MODULE: ./src/js/scripts/scripts/project-status.js
const COLORS = {
  full: "#56f000",
  page: "#2dccff",
  block: "#ffb302",
  edit: "#ff3838",
};

/** @type {NodeListOf<HTMLDivElement>} */
const portfolioCards = document.querySelectorAll(".portfolio-card");

portfolioCards?.forEach(card => {
  const { dataset } = card;
  let { status } = dataset;

  if (typeof status === "string") {
    status = status.trim();
    status = status.toLocaleLowerCase();

    const statusesArray = status.split(" ").filter(Boolean);
    const linearGradient = createLinearGradient(statusesArray);

    card.style.setProperty("--linear-gradient", linearGradient);
  }
});

/** @param {string[]} array */
function createLinearGradient(array) {
  const addedStatuses = [];
  let counter = 1;

  return `linear-gradient(to right, #393e46 5px, 0%, ${array.map((status, index, array) => {
    return `${COLORS[status] && !addedStatuses.includes(status) ? (addedStatuses.push(status), `${COLORS[status]} ${(index + counter) * 5 + (index - 1 + counter) + 5}px, 0%${array.length > 1 && index !== array.length - 1 ? `, #393e46 ${(index + counter) * 5 + (index - 1 + counter) + 6}px, 0%` : ""}`) : (--counter, "")}`;
  }).filter(Boolean).join(", ")}, #393e46)`;
}

;// CONCATENATED MODULE: ./src/js/scripts/scripts.js

// import "./scripts/burger.js";



;// CONCATENATED MODULE: ./src/js/script.js


/******/ })()
;