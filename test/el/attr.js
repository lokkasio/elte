import { el } from '../../src/el'
import { fixture, $ } from '../utils'

QUnit.module('el attr', function () {
  QUnit.test('set attr', function (assert) {
    fixture`<p></p>`
    const e = el($('p'))
    e({
      attr: {
        lang: 'en',
      },
    })
    assert.dom('p').hasAttribute('lang', 'en')
  })

  QUnit.test('change attr', function (assert) {
    fixture`<p lang="de"></p>`
    const e = el($('p'))
    e({
      attr: {
        lang: 'en',
      },
    })
    assert.dom('p').hasAttribute('lang', 'en')
  })

  QUnit.test('remove attr', function (assert) {
    fixture`<p lang="de"></p>`
    const e = el($('p'))
    e({
      attr: {
        lang: false,
      },
    })
    assert.dom('p').hasNoAttribute('lang')
  })
})
