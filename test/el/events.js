import { el } from '../../src/el'
import { fixture, $ } from '../utils'

QUnit.module('el attr', function () {
  QUnit.test('set event', function (assert) {
    const done = assert.async()
    fixture`<p></p>`
    const e = el($('p'))
    e({
      events: {
        click() {
          assert.ok(true)
          done()
        },
      },
    })
    $('p').click()
  })

  QUnit.test('change event', function (assert) {
    const done = assert.async()
    const done2 = assert.async()
    fixture`<p></p>`
    const e = el($('p'))
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
    $('p').click()
    $('p').click()
  })

  QUnit.test('remove event', function (assert) {
    assert.expect(1)
    const done = assert.async()
    fixture`<p></p>`
    const e = el($('p'))
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
    $('p').click()
    $('p').click()
  })

  QUnit.test('disconnect', function (assert) {
    assert.expect(1)
    const done = assert.async()
    fixture`<p></p>`
    const e = el($('p'))
    e({
      events: {
        click() {
          assert.ok(true)
          e.disconnect()
          done()
        },
      },
    })
    $('p').click()
    $('p').click()
  })
})
