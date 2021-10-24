import { el } from "../../src/el.js"
import { fixture, $ } from "../utils.js"
const { module, test } = QUnit

module("el text", () => {
  test("set text", (assert) => {
    fixture`<p></p>`
    const p = $("p")
    const e = el(p)
    e({
      text: "text",
    })
    assert.equal(p.textContent, "text")
  })

  test("change text", (assert) => {
    fixture`<p>foo</p>`
    const p = $("p")
    const e = el($("p"))
    e({
      text: "bar",
    })
    assert.equal(p.textContent, "bar")
  })

  test("delete text", (assert) => {
    fixture`<p>foo</p>`
    const p = $("p")
    const e = el($("p"))
    e({
      text: "",
    })
    assert.equal(p.textContent, "")
  })
})
