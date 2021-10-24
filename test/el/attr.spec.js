import { el } from "../../src/el.js"
import { fixture, $ } from "../utils.js"
const { module, test } = QUnit

module("el attr", () => {
  test("add attribute", (assert) => {
    fixture`<p></p>`
    const p = $("p")
    const e = el(p)
    e({
      attr: {
        lang: "en",
      },
    })
    assert.equal(p.getAttribute("lang"), "en")
  })

  test("change attribute", (assert) => {
    fixture`<p lang="de"></p>`
    const p = $("p")
    const e = el(p)
    e({
      attr: {
        lang: "en",
      },
    })
    assert.equal(p.getAttribute("lang"), "en")
  })

  test("remove attribute", (assert) => {
    fixture`<p lang="de"></p>`
    const p = $("p")
    const e = el($("p"))
    e({
      attr: {
        lang: false,
      },
    })
    assert.notOk(p.hasAttribute("lang"))
  })
})
