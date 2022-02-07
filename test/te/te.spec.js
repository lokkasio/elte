import { te } from "../../src/te.js"
import { fixture, $, $$ } from "../utils.js"
const { module, test } = QUnit

module("te", () => {
  test("render", (assert) => {
    fixture`
      <template id="template">
        <li></li>
      </template>
      <ul id="list"></ul>
    `
    const done = assert.async()
    const t = te(
      $("#template"),
      $("#list"),
      (element) => (record) => element.setAttribute("class", record.class),
      "class"
    )
    t([{ class: "first" }, { class: "second" }])

    requestAnimationFrame(() => {
      assert.equal($$("li").length, 2)
      assert.ok($("li.first"))
      assert.ok($("li.second"))

      t([{ class: "only" }])

      requestAnimationFrame(() => {
        assert.equal($$("li").length, 1)
        assert.notOk($("li.first"))
        assert.notOk($("li.second"))
        assert.ok($("li.only"))

        done()
      })
    })
  })
})
