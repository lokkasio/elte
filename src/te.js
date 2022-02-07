const noop = () => {}
const DATA_KEY = "teKey"
const KEY_PROP = Symbol(DATA_KEY)
const UPDATE_PROP = Symbol("teUpdate")

export const te = (template, target, connectedCb = noop, keyProp = "key") => {
  const elements = new Map()

  const addElement = (element, key) => {
    element[KEY_PROP] = key
    element[UPDATE_PROP] = connectedCb(element) ?? noop
    elements.set(key, element)
  }

  for (const child of target.children) {
    if (DATA_KEY in child.dataset) {
      addElement(child, child.dataset[DATA_KEY])
    } else {
      target.removeChild(child)
    }
  }

  return (records) => {
    let lastElement = records.reduce((currentElement, record) => {
      const key = record[keyProp] ?? Math.random()
      let element = currentElement

      element = elements.get(key)
      if (!element || element[KEY_PROP] !== key) {
        if (!element) {
          element = template.content.firstElementChild.cloneNode(true)
          target.insertBefore(element, currentElement)
          addElement(element, key)
        } else {
          target.insertBefore(element, currentElement)
        }
      }

      element[UPDATE_PROP](record)
      return element.nextElementSibling
    }, target.firstElementChild)

    while (lastElement) {
      const nextElementToDelete = lastElement.nextElementSibling
      target.removeChild(lastElement)
      elements.delete(lastElement[KEY_PROP])
      lastElement = nextElementToDelete
    }
  }
}

export const _key = (host) => host[KEY_PROP]
