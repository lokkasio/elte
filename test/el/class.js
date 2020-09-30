import { el } from '../../src/el'
import { fixture, $ } from '../utils'

QUnit.module('el class', function () {
  QUnit.test('set class', function (assert) {
    fixture`<p class="bar"></p>`
    const e = el($('p'))
    e({
      class: {
        foo: true,
      },
    })
    assert.dom('p').hasClass(/foo|bar/)
  })

  QUnit.test('remove class', function (assert) {
    fixture`<p class="foo bar"></p>`
    const e = el($('p'))
    e({
      class: {
        foo: false,
      },
    })
    assert.dom('p').hasClass('bar')
    assert.dom('p').hasNoClass('foo')
  })
})
