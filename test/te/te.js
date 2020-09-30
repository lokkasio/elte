import { te } from '../../src/te'
import { fixture, $ } from '../utils'

QUnit.module('te', function () {
  QUnit.test('render', function (assert) {
    fixture`
      <template id="template">
        <li></li>
      </template>
      <ul></ul>
    `
    const t = te($('#template'), $('ul'))
    t([
      {
        li: {
          class: {
            first: true,
          },
        },
      },
      {
        li: {
          class: {
            second: true,
          },
        },
      },
    ])

    assert.dom('li.first').exists()
    assert.dom('li.second').exists()

    t([
      {
        li: {
          class: {
            only: true,
          },
        },
      },
    ])

    assert.dom('li.first').doesNotExist()
    assert.dom('li.second').doesNotExist()
    assert.dom('li.only').exists()
  })

  QUnit.test('fallback', function (assert) {
    fixture`
      <template id="template">
        <li></li>
      </template>
      <ul></ul>
    `
    const t = te($('#template'), $('ul'))
    t([
      {
        li: {},
      },
      {
        li: {},
      },
    ])

    assert.dom('li').exists({ count: 2 })
  })
})
