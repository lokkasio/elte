import { _onDisconnect } from "compone/ext/onDisconnect"

const eachEntries = (object, callback) =>
  object && Object.entries(object).forEach(callback)

export const el = (element) => {
  const cache = {}
  const listeners = {}
  const propertyChanged = (prop, value) => cache[prop] !== (cache[prop] = value)
  const removeEventListener = (type, listener, options) => {
    element.removeEventListener(type, listener, options)
    delete listeners[type]
  }

  const update = (data) => {
    for (const key in data) {
      update[key](data[key])
    }
    return update
  }

  update.text = (data) => {
    propertyChanged("t", data) && (element.textContent = data)
    return update
  }

  update.class = (data) => {
    eachEntries(
      data,
      ([className, add]) =>
        propertyChanged("c" + className, add) &&
        element.classList[add ? "add" : "remove"](className)
    )
    return update
  }

  update.style = (data) => {
    eachEntries(
      data,
      ([prop, value]) =>
        propertyChanged("s" + prop, value) && (element.style[prop] = value)
    )
    return update
  }

  update.attr = (data) => {
    eachEntries(
      data,
      ([attr, value]) =>
        propertyChanged("a" + attr, value) &&
        element[
          value === false || value == null ? "removeAttribute" : "setAttribute"
        ](attr, value)
    )
    return update
  }

  update.props = (data) => {
    eachEntries(
      data,
      ([prop, value]) =>
        propertyChanged("p" + prop, value) && (element[prop] = value)
    )
    return update
  }

  update.events = (data) => {
    if (data === false) {
      eachEntries(listeners, ([type, [prevListener, prevOptions]]) => {
        removeEventListener(type, prevListener, prevOptions)
      })
    } else {
      eachEntries(data, ([type, handler]) => {
        const [prevListener, prevOptions] = listeners[type] || []
        const [nextListener, nextOptions] =
          (handler && [].concat(handler)) || []

        if (prevListener !== nextListener) {
          if (prevListener) {
            removeEventListener(type, prevListener, prevOptions)
          }
          if (nextListener) {
            element.addEventListener(type, nextListener, nextOptions)
            listeners[type] = [nextListener, nextOptions]
          }
        }
      })
    }
    return update
  }

  return update
}

export const _el = (host) => {
  const onDisconnect = _onDisconnect(host)
  return (element) => {
    const e = el(element)
    onDisconnect(() => e.events(false))
    return e
  }
}
