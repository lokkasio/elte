import { el } from "../../src/el.js"
import { fixture, $ } from "../utils.js"
const { module, test } = QUnit

module("el style", () => {
  test("add style", (assert) => {
    fixture`<p style="position: relative;"></p>`
    const p = $("p")
    const e = el(p)
    e({
      style: {
        fontSize: "24px",
      },
    })
    assert.equal(p.style.position, "relative")
    assert.equal(p.style.fontSize, "24px")
  })

  test("change style", (assert) => {
    fixture`<p style="position: relative; font-size: 24px"></p>`
    const p = $("p")
    const e = el(p)
    e({
      style: {
        fontSize: "32px",
      },
    })
    assert.equal(p.style.position, "relative")
    assert.equal(p.style.fontSize, "32px")
  })

  test("remove style", (assert) => {
    fixture`<p style="position: relative; font-size: 24px"></p>`
    const p = $("p")
    const e = el($("p"))
    e({
      style: {
        fontSize: null,
      },
    })
    assert.ok(p.getAttribute("style", "position: relative;"))
  })
})
