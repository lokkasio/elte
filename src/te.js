import { el } from './el'

export const te = function (node) {
  const els = []
  const children = []
  const parent = node.parentElement
  const template = node.content
  const update = function (records) {
    while (els.length) {
      els.pop().disconnect()
    }
    while (children.length) {
      parent.removeChild(children.pop())
    }

    const fragment = document.createDocumentFragment()

    records.forEach(function (record) {
      const clone = document.importNode(template, true)

      Object.entries(record).forEach(function ([selector, data]) {
        return clone.querySelectorAll(selector).forEach(function (element) {
          return els.push(el(element)(data))
        })
      })

      Array.from(clone.children).forEach(function (child) {
        children.push(child)
        fragment.appendChild(child)
      })
    })

    parent.insertBefore(fragment, node)

    return update
  }
  return update
}
