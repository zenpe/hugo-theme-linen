var previousScrollY = 0;
var isResizing = false;
var viewportWidth = window.innerWidth;
var isAnchoring = false;
var anchoringId = null;

(function addUAClass() {
  const isIOS = /iPhone/.test(window.navigator.userAgent);

  if (isIOS) {
    document.body.classList.add("ios");
  }
})();

function isEqual(obj1, obj2) {
  if (obj1 === obj2) {
    return true;
  }
  if (
    typeof obj1 !== "object" ||
    obj1 === null ||
    typeof obj2 !== "object" ||
    obj2 === null
  ) {
    return false;
  }

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (let key of keys1) {
    if (!keys2.includes(key) || !isEqual(obj1[key], obj2[key])) {
      return false;
    }
  }

  return true;
}

function cloneDeep(value) {
  if (value === null || typeof value !== "object") {
    return value;
  }

  if (value instanceof Date) {
    return new Date(value);
  }

  if (value instanceof RegExp) {
    return new RegExp(value);
  }

  if (Array.isArray(value)) {
    const arrCopy = [];
    for (let i = 0; i < value.length; i++) {
      arrCopy[i] = cloneDeep(value[i]);
    }
    return arrCopy;
  }

  const objCopy = {};
  for (const key in value) {
    if (value.hasOwnProperty(key)) {
      objCopy[key] = cloneDeep(value[key]);
    }
  }
  return objCopy;
}

function debounce(fn, delay) {
  let timer = null;
  let lastArgs = null;
  let lastThis = null;
  let firstCall = true;

  return function (...args) {
    if (firstCall) {
      fn.apply(this, args);
      firstCall = false;
    }

    lastArgs = args;
    lastThis = this;

    clearTimeout(timer);
    timer = setTimeout(() => {
      if (lastArgs) {
        fn.apply(lastThis, lastArgs);
      }
      firstCall = true;
    }, delay);
  };
}

function throttle(func, limit) {
  let lastRan = 0;
  let timeoutId = null;
  let lastArgs = null;
  let lastContext = null;

  return function (...args) {
    const now = Date.now();

    lastArgs = args;
    lastContext = this;

    const remaining = limit - (now - lastRan);

    if (lastRan === 0 || remaining <= 0) {
      func.apply(lastContext, lastArgs);
      lastRan = now;
    } else if (!timeoutId) {
      timeoutId = setTimeout(() => {
        func.apply(lastContext, lastArgs);
        lastRan = Date.now();
        timeoutId = null;
      }, remaining);
    }
  };
}

function isElementInViewport(el) {
  const rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

function copyToClipboard(text) {
  if (navigator.clipboard) {
    copyToClipboard = function () {
      navigator.clipboard
        .writeText(text)
        .then(() => {})
        .catch((err) => {
          console.error("复制失败:", err);
        });
    };
  } else {
    copyToClipboard = function () {
      const textArea = document.createElement("textarea");
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand("copy");
      } catch (err) {
        console.error("复制失败:", err);
      }
      document.body.removeChild(textArea);
    };
  }
  copyToClipboard(text);
}

function highlightAnchor(
  hash,
  highlightClass = "anchor-highlight",
  element = null,
) {
  if (element) {
    element.classList.remove(highlightClass);
    void element.offsetWidth;
    element.classList.add(highlightClass);
    setTimeout(() => {
      element.classList.remove(highlightClass);
    }, 4000);
  } else {
    if (!hash) return;
    const id = hash.replace(/^#/, "");
    const el = document.getElementById(id);
    if (el) {
      el.classList.remove(highlightClass);
      void el.offsetWidth;
      el.classList.add(highlightClass);
      setTimeout(() => {
      el.classList.remove(highlightClass);
    }, 4000);
    }
  }
}

function initAnchorHighlighter({
  highlightClass = "anchor-highlight",
  duration = 2000,
} = {}) {
  if (!document.getElementById("anchor-highlight-style")) {
    const style = document.createElement("style");
    style.id = "anchor-highlight-style";
    style.textContent = `
      @keyframes anchorFlash {
        0%   { background-color: rgba(70, 148, 255, 0.2); }
        100% { background-color: transparent; }
      }
      .${highlightClass} {
        animation: anchorFlash ${duration}ms ease;
      }
    `;
    document.head.appendChild(style);
  }
  if (location.hash) {
    highlightAnchor(location.hash);
  }
  window.addEventListener("hashchange", () => {
    highlightAnchor(location.hash);
  });
}

initAnchorHighlighter({
  duration: 4000,
});

function onScroll() {
  var backToTop = document.querySelector("#back-to-top");
  var header = document.querySelector(".nav-header");
  var triggerHeight = window.innerHeight * 1.5;
  if (!window.$gitalkInitiated && previousScrollY > window.innerHeight) {
    typeof loadGitalk !== "undefined" && loadGitalk();
  }
  if (window.scrollY < previousScrollY) {
    if (!document.querySelector(".pswp--open")) {
      header.classList.remove("hide");
    }
    if (window.scrollY >= triggerHeight) {
      backToTop.classList.add("visible");
    }
  } else if (window.scrollY > previousScrollY) {
    backToTop.classList.remove("visible");
    if (window.scrollY > window.innerHeight * 0.75) {
      header.classList.add("hide");
    }
  }
  if (
    window.scrollY < window.innerHeight * 0.75 &&
    window.scrollY < previousScrollY
  ) {
    header.classList.remove("hide");
  }
  previousScrollY = window.scrollY;
  if (isAnchoring) {
    header.classList.add("hide");
    isAnchoring = false;
  }
}

window.addEventListener("scroll", throttle(onScroll, 300));

window.addEventListener(
  "resize",
  debounce(function (e) {
    const body = document.body;
    if (!isResizing && window.innerWidth !== viewportWidth) {
      isResizing = true;
      viewportWidth = window.innerWidth;
      body.classList.add("resizing");
      return;
    }
    isResizing = false;
    body.classList.remove("resizing");
  }, 1000),
);

function onclickPostItem(element) {
  const selection = window.getSelection();
  const text = selection ? selection.toString().trim() : "";
  if (text.length > 0) {
    return;
  }
  const href = element.getAttribute("href");
  if (href) {
    location.href = href;
  }
}

function handleClick(e) {
  try {
    var target = e.target;
    var tocElement = document.getElementById("toc");
    var seriesElement = document.getElementById("series");
    var maskElement = document.getElementById("mask");
    var bodyElement = document.body;
    var donateModal = document.getElementById("donate-modal");
    if(target?.className === 'footnote-href') {
      const footNoteDefinitionId = target.getAttribute("href").substring(1);
      const footNoteDefinitionElement = document.getElementById(footNoteDefinitionId);
      if (footNoteDefinitionElement) {
        footNoteDefinitionElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
        e.preventDefault();
        highlightAnchor(undefined, undefined, footNoteDefinitionElement);
        return;
      }
    }
    if (target?.className === "footnote-backref") {
      const footNoteId = target.getAttribute("href").substring(1);
      const footNoteTextElements = document.querySelectorAll('.footnote-anchor-wrap');
      if (footNoteTextElements.length) {
        footNoteTextElements[0].scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
        e.preventDefault();
        Array.prototype.forEach.call(footNoteTextElements, (el) => {
          highlightAnchor(undefined, undefined, el);
        })
        return;
      }
    }
    if (/content-switch/.test(target.id)) {
      if (document.body.classList.contains("render-raw")) {
        target.innerText = target.dataset.rawcontentlabel;
      } else {
        target.innerText = target.dataset.renderedcontentlabel;
      }
      document.body.classList.toggle("render-raw");
    }
    if (/close-series-popup-icon/.test(target.className)) {
      seriesElement?.classList?.remove("visible");
      maskElement.classList.remove("visible");
      bodyElement.classList.remove("no-scroll");
    } else if (["H2", "H3"].includes(target.tagName) && target.id) {
      const newLocation = new URL(location.href);
      newLocation.hash = `#${target.id}`;
      history.replaceState(null, "", newLocation.href);
      target.scrollIntoView({
        behavior: "instant",
        block: "start",
      });
      highlightAnchor(target.id);
      return;
    } else if (
      target?.className === "caption-link" ||
      target.parentElement?.className === "caption-link"
    ) {
      const href =
        target.getAttribute("href") ||
        target.parentElement.getAttribute("href");
      window.open(href);
      return;
    } else if (target.className === "copy-btn") {
      try {
        var codeBlock = target.parentElement.querySelector(".code");
        copyToClipboard(codeBlock.innerText);
        target.classList.add("copied");
        setTimeout(() => {
          target.classList.remove("copied");
        }, 500);
        return;
      } catch (error) {}
    } else if (target.id === "back-to-top") {
      e.preventDefault();
      const newLocation = new URL(location.href);
      newLocation.hash = "";
      history.replaceState(null, "", newLocation.href);
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
      return;
    } else if (target?.className?.includes("placeholder")) {
      e.preventDefault();
      return;
    } else if (
      target?.className?.includes("toc-item-link") ||
      target?.className?.includes("toc-sub-item-link")
    ) {
      e.preventDefault();
      if (!window.$gitalkInitiated) {
        typeof loadGitalk !== "undefined" && loadGitalk();
      }
      const targetId = target.dataset.id;
      const anchor = document.getElementById(targetId);
      if (tocElement?.classList?.contains("visible")) {
        tocElement.classList.remove("visible");
        maskElement.classList.remove("visible");
        bodyElement.classList.remove("no-scroll");
      }
      if (targetId === "to-page-top") {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: "smooth",
        });
      } else {
        anchor &&
          anchor.scrollIntoView({
            behavior: "instant",
            block: "start",
          });
        isAnchoring = true;
      }
      highlightAnchor(targetId);
      if (
        target.className?.includes("toc-item-link") &&
        isElementInViewport(anchor)
      ) {
        anchoringId = anchor.id;
        const tocItems =
          document.getElementById("toc")?.children?.[1]?.children || [];
        Array.prototype.forEach.call(tocItems, (tocItem) => {
          if (tocItem?.children?.[0]?.dataset?.id === anchoringId) {
            tocItem.className = "toc-item-wrap active";
          } else {
            tocItem.className = "toc-item-wrap";
          }
        });
      } else {
        if (anchoringId) {
          anchoringId = null;
        }
      }
      return;
    } else if (target.id === "toc-toggle") {
      if (tocElement?.classList?.contains("visible")) {
        tocElement.classList.remove("visible");
        maskElement.classList.remove("visible");
        bodyElement.classList.remove("no-scroll");
      } else {
        tocElement.classList.add("visible");
        maskElement.classList.add("visible");
        bodyElement.classList.add("no-scroll");
      }
      return;
    } else if (
      target.tagName !== "H1" &&
      (target.className === "series-name" ||
        target?.parentElement?.className === "series-name" ||
        target.className === "series-name-content" ||
        target?.parentElement?.className === "series-name-content")
    ) {
      seriesElement?.classList?.add("visible");
      maskElement?.classList?.add("visible");
      donateModal?.classList?.remove("visible");
      bodyElement.classList.add("no-scroll");
      return;
    } else if (target?.className?.includes("series-item-link")) {
      e.preventDefault();
      seriesElement?.classList?.remove("visible");
      maskElement.classList.remove("visible");
      bodyElement.classList.remove("no-scroll");
      const href =
        target.getAttribute("href") ||
        target.parentElement.getAttribute("href");
      location.href = href;
      return;
    } else if (target.id === "mask") {
      tocElement?.classList?.remove("visible");
      seriesElement?.classList?.remove("visible");
      maskElement.classList.remove("visible");
      bodyElement.classList.remove("no-scroll");
      return;
    } else if (target?.className?.includes("fold-toggle")) {
      const parentElement = target.parentElement;
      if (parentElement.classList.contains("folded")) {
        parentElement.classList.remove("folded");
      } else {
        parentElement.classList.add("folded");
      }
      return;
    } else if (target.id === "page-donates") {
      target?.children?.[0]?.classList?.add("visible");
      return;
    } else {
      if (
        donateModal &&
        donateModal.classList.contains("visible") &&
        target.tagName !== "IMG"
      ) {
        donateModal.classList.remove("visible");
      }
      return;
    }
  } catch (error) {
    console.log(error);
  }
}

function bindClickHandler() {
  document.addEventListener("click", handleClick, true);
}

window.addEventListener("load", bindClickHandler);
window.addEventListener("pageshow", (e) => {
  requestAnimationFrame(() => {
    bindClickHandler();
  });
});

function initAgeWarning() {
  const ageWarningElement = document.getElementById("post-age-warning");
  if (!ageWarningElement) return;
  const dateStr = document
    .querySelector("#post .post-meta .date")
    .getAttribute("datetime");
  const postDate = new Date(dateStr);
  const now = new Date();

  const diffTime = now - postDate;

  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  if (diffDays && diffDays > 180) {
    const daysSpan = ageWarningElement.querySelector(".days-value");
    if (daysSpan) {
      daysSpan.innerText = diffDays;
    }
  } else {
    if (ageWarningElement) {
      ageWarningElement.style = "display: none";
    }
  }
  return diffDays;
}

initAgeWarning();
