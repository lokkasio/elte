import { el } from '../../src/el'
import { fixture, $ } from '../utils'

QUnit.module('el style', function () {
  QUnit.test('set style', function (assert) {
    fixture`<p style="position: relative;"></p>`
    const e = el($('p'))
    e({
      style: {
        fontSize: '24px',
      },
    })
    assert.dom('p').hasStyle({
      position: 'relative',
      'font-size': '24px',
    })
  })

  QUnit.test('change style', function (assert) {
    fixture`<p style="position: relative; font-size: 24px"></p>`
    const e = el($('p'))
    e({
      style: {
        fontSize: '32px',
      },
    })
    assert.dom('p').hasStyle({
      position: 'relative',
      'font-size': '32px',
    })
  })

  QUnit.test('remove style', function (assert) {
    fixture`<p style="position: relative; font-size: 24px"></p>`
    const e = el($('p'))
    e({
      style: {
        fontSize: null,
      },
    })
    assert.dom('p').hasAttribute('style', 'position: relative;')
  })
})
