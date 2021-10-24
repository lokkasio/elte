import { el } from "../../src/el.js"
import { fixture, $ } from "../utils.js"
const { module, test } = QUnit

module("el class", () => {
  test("add class", (assert) => {
    fixture`<p class="bar"></p>`
    const p = $("p")
    const e = el(p)
    e({
      class: {
        foo: true,
      },
    })
    assert.ok(p.classList.contains("bar"))
    assert.ok(p.classList.contains("foo"))
  })

  test("remove class", (assert) => {
    fixture`<p class="foo bar"></p>`
    const p = $("p")
    const e = el(p)
    e({
      class: {
        foo: false,
      },
    })
    assert.ok(p.classList.contains("bar"))
    assert.notOk(p.classList.contains("foo"))
  })
})
