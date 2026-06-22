var hdrSupport = false;
var hdrEnabled = false;
var lang = document.documentElement.getAttribute("lang") || "en";

function testHDRSupport() {
  return (
    window.screen.colorDepth >= 30 &&
    window.screen.width > 330 &&
    !/MicroMessenger/i.test(navigator.userAgent)
  );
}
hdrSupport = testHDRSupport();
const HDRSwitchButton = document.querySelector(".hdr-switch");

function switchHDR() {
  var HDRPath = window.hdrAssetsPrefix || "";
  var SDRPath = HDRPath.replace("/hdr", "/sdr");
  var articleElement = document.querySelector(".article");
  var targetState = !hdrEnabled;
  if (articleElement) {
    var lazyloadItems = articleElement.querySelectorAll(".lazyload-outer-wrap");
    Array.prototype.forEach.call(lazyloadItems, (item) => {
      const links = item.querySelectorAll(".gallery-item");
      links.forEach((link) => {
        if (targetState) {
          if (link.href?.includes(SDRPath)) {
            link.href = link.href.replace(SDRPath, HDRPath);
          } else if (link.getAttribute("href")?.includes(SDRPath)) {
            link.setAttribute("href", HDRPath);
          }
        } else {
          if (link.href?.includes(HDRPath)) {
            link.href = link.href.replace(HDRPath, SDRPath);
          } else if (link.getAttribute("href")?.includes(HDRPath)) {
            link.setAttribute("href", SDRPath);
          }
        }
      });
      const lazyloadItem = item.querySelector(".lazyload-wrap");
      var dcontent = lazyloadItem.getAttribute("data-content") || "";
      if (targetState) {
        if (dcontent.includes(encodeURIComponent(SDRPath))) {
          lazyloadItem.setAttribute(
            "data-content",
            dcontent.replace(
              encodeURIComponent(SDRPath),
              encodeURIComponent(HDRPath)
            )
          );
        }
      } else {
        if (dcontent.includes(encodeURIComponent(HDRPath))) {
          lazyloadItem.setAttribute(
            "data-content",
            dcontent.replace(
              encodeURIComponent(HDRPath),
              encodeURIComponent(SDRPath)
            )
          );
        }
      }
      var InnerImgs = lazyloadItem.querySelectorAll("img");
      InnerImgs.forEach((img) => {
        if (targetState) {
          if (img.src && img.src.includes(SDRPath)) {
            img.src = img.src.replace(SDRPath, HDRPath);
          }
        } else {
          if (img.src && img.src.includes(HDRPath)) {
            img.src = img.src.replace(HDRPath, SDRPath);
          }
        }
      });
    });
  }
  hdrEnabled = targetState;
  if (HDRSwitchButton) {
    if (targetState) {
      HDRSwitchButton.classList.add("hdr_on");
    } else {
      HDRSwitchButton.classList.remove("hdr_on");
    }
  }
}

if (hdrSupport) {
  switchHDR();
}

HDRSwitchButton && HDRSwitchButton.addEventListener("click", switchHDR);
