import { whenDefined } from "compone"
import { connect, disconnect } from "compone/core"

const noop = () => {}
const DATA_KEY = "teKey"
const KEY_PROP = Symbol(DATA_KEY)
const API_PROP = Symbol("teUpdate")

export const te = (template, connectedCb = noop, keyProp = "key") => {
  const parent = template.parentElement
  const elements = new Map()

  const addElement = (element, key) => {
    element[KEY_PROP] = key
    connect(element, connectedCb, API_PROP)
    elements.set(key, element)
  }

  let rendered = template
  while (
    (rendered = rendered.nextElementSibling) &&
    DATA_KEY in rendered.dataset
  ) {
    addElement(rendered, rendered.dataset[DATA_KEY])
  }

  return (records) => {
    const lastElement = records.reduce((currentElement, record) => {
      const key = record[keyProp] ?? Math.random()
      const nextSibling = currentElement.nextElementSibling
      let element = nextSibling

      if (!element || element[KEY_PROP] !== key) {
        element = elements.get(key)
        if (!element) {
          element = template.content.firstElementChild.cloneNode(true)
          parent.insertBefore(element, nextSibling)
          addElement(element, key)
        } else {
          parent.insertBefore(element, nextSibling)
        }
      }

      whenDefined(element, API_PROP).then((cb) => cb && cb(record))
      return element
    }, template)

    let elementToDelete
    while (
      (elementToDelete = lastElement.nextElementSibling) &&
      KEY_PROP in elementToDelete
    ) {
      parent.removeChild(elementToDelete)
      disconnect(elementToDelete, API_PROP)
      elements.delete(elementToDelete[KEY_PROP])
    }
  }
}

export const _key = (host) => host[KEY_PROP]
