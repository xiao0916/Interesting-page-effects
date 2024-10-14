import { SLICE_LIST } from "./constants.js";
import { render, createElement } from "./dom.js";

const dom_ul = createElement(
  "ul",
  { className: "top_nav" },
  SLICE_LIST.map((i) =>
    createElement(
      "li",
      { className: "top_nav_item" },
      createElement("img", {
        src: i.img,
        style: i.style,
        __transform__: i.transform,
        __change__: {},
      })
    )
  )
);

let x = 0;

function mouseMoveEvent(e) {
  const target = e.currentTarget;
  const dom_imgList = target.querySelectorAll("img");
  if (!dom_imgList.length) return;

  const moveX = e.clientX - x;

  dom_imgList.forEach((img, index) => {
    const { __transform__ } = img;
    if (!__transform__) return;

    let translateX = "0px";
    let rotate = "0deg";

    if (__transform__.x) {
      const { min, max, range } = __transform__.x;
      let _moveX = moveX * range + (img.__change__.x || 0);
      if (_moveX < min) _moveX = min;
      else if (_moveX > max) _moveX = max;
      translateX = `${_moveX}px`;
      img.__change__.x = _moveX;
    }

    if (__transform__.rotate) {
      const { min, max, range } = __transform__.rotate;
      let angle =
        ((moveX * target.offsetWidth) / 360) * range +
        (img.__change__.rotate || 0);
      if (angle < min) angle = min;
      else if (angle > max) angle = max;
      rotate = `${angle}deg`;
      img.__change__.rotate = angle;
    }

    if (__transform__) {
      console.log(
        __transform__,
        "moveX",
        moveX,
        "translateX",
        translateX,
        "rotate",
        rotate
      );
    }

    img.style.setProperty(
      "transform",
      "translateX(" + translateX + ") rotate(" + rotate + ")"
    );
  });

  x = e.clientX;
}

dom_ul.addEventListener("mouseenter", (e) => {
  x = e.clientX;
  dom_ul.addEventListener("mousemove", mouseMoveEvent);
});

dom_ul.addEventListener("mouseleave", (e) => {
  x = 0;
  dom_ul.removeEventListener("mousemove", mouseMoveEvent);
  dom_ul
    .querySelectorAll("img")
    .forEach((img) => img.style.setProperty("transform", ""));
});

render(document.getElementById("root"), dom_ul);
