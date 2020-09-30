import { el } from '../../src/el'
import { fixture, $ } from '../utils'

QUnit.module('el text', function () {
  QUnit.test('set text', function (assert) {
    fixture`<p></p>`
    const e = el($('p'))
    e({
      text: 'text',
    })
    assert.dom('p').hasText('text')
  })

  QUnit.test('change text', function (assert) {
    fixture`<p>foo</p>`
    const e = el($('p'))
    e({
      text: 'bar',
    })
    assert.dom('p').hasText('bar')
  })

  QUnit.test('delete text', function (assert) {
    fixture`<p>foo</p>`
    const e = el($('p'))
    e({
      text: '',
    })
    assert.dom('p').hasNoText()
  })
})
