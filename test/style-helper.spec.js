/* eslint-disable max-len */
import assert from "power-assert";
import { transition, buildStyles } from "../src/utils/style-helper";


describe("style-helper", () => {
  it("Should be build a transition string", () => {
    assert(transition(["opacity"], 1000, "ease-in") === "opacity 1000ms ease-in");

    const easing = "cubic-bezier(0.215, 0.61, 0.355, 1)";
    assert(
      transition(["transform", "opacity", "background"], 200, easing) ===
      [
        `transform 200ms ${easing}`,
        `opacity 200ms ${easing}`,
        `background 200ms ${easing}`
      ].join(",")
    );
  });


  it("Should be build a style object", () => {
    const ios8 = "Mozilla/5.0 (iPhone; CPU iPhone OS 8_0 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) Version/8.0 Mobile/12A365 Safari/600.1.4";
    const units = {
      length: "px",
      angle: "deg"
    };

    assert.deepStrictEqual(
      buildStyles({
        opacity: 1,
        fontSize: 16
      }, units, false),
      {
        opacity: 1,
        fontSize: 16
      }
    , "Basic");

    assert.deepStrictEqual(
      buildStyles({
        opacity: 1,
        translateX: 900,
        translateY: 200,
        scale: 0.8,
        perspective: 1000
      }, units, false),
      {
        opacity: 1,
        perspective: 1000,
        transform: "translateX(900px) translateY(200px) scale(0.8) perspective(1000px)"
      },
      "Extended properties"
    );

    assert.deepStrictEqual(
      buildStyles({
        opacity: 1,
        translateX: 900,
        translateY: 200,
        scale: 0.8,
        perspective: 1000
      }, units, true, ios8),
      {
        opacity: 1,
        WebkitPerspective: 1000,
        WebkitTransform: "translateX(900px) translateY(200px) scale(0.8) perspective(1000px)"
      },
      "Vendor prefix"
    );
  });
});
