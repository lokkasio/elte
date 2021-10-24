import { el } from "../../src/el.js"
import { fixture, $ } from "../utils.js"
const { module, test } = QUnit

module("el events", () => {
  test("set event", (assert) => {
    const done = assert.async()
    fixture`<p></p>`
    const p = $("p")
    const e = el(p)
    e({
      events: {
        click() {
          assert.ok(true)
          done()
        },
      },
    })
    p.click()
  })

  test("change event", (assert) => {
    const done = assert.async()
    const done2 = assert.async()
    fixture`<p></p>`
    const p = $("p")
    const e = el(p)
    e({
      events: {
        click() {
          assert.ok(true)
          e({
            events: {
              click() {
                assert.ok(true)
                done2()
              },
            },
          })
          done()
        },
      },
    })
    p.click()
    p.click()
  })

  test("remove event", (assert) => {
    assert.expect(1)
    const done = assert.async()
    fixture`<p></p>`
    const p = $("p")
    const e = el(p)
    e({
      events: {
        click() {
          assert.ok(true)
          e({
            events: {
              click: false,
            },
          })
          done()
        },
      },
    })
    p.click()
    p.click()
  })

  test("remove all events", (assert) => {
    assert.expect(1)
    const done = assert.async()
    fixture`<p></p>`
    const p = $("p")
    const e = el(p)
    e({
      events: {
        click() {
          assert.ok(true)
          e({
            events: false,
          })
          done()
        },
      },
    })
    p.click()
    p.click()
  })
})
