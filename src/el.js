const eachEntries = function (object, callback) {
  object && Object.entries(object).forEach(callback)
}

export const el = function (element) {
  const cache = {}
  const listeners = {}
  const cachedSideEffect = function (prop, value, callback) {
    if (cache[prop] !== undefined || cache[prop] !== value) {
      cache[prop] = value
      callback(element)
    }
  }

  const update = function (data) {
    cachedSideEffect('t', data.text, function (node) {
      return (node.textContent = data.text)
    })

    eachEntries(data.class, function ([className, add]) {
      return cachedSideEffect('c' + className, add, function (node) {
        return node.classList[add ? 'add' : 'remove'](className)
      })
    })

    eachEntries(data.style, function ([prop, value]) {
      return cachedSideEffect('s' + prop, value, function (node) {
        return (node.style[prop] = value)
      })
    })

    eachEntries(data.attr, function ([attr, value]) {
      return cachedSideEffect('a' + attr, value, function (node) {
        return node[value || value === 0 ? 'setAttribute' : 'removeAttribute'](
          attr,
          value
        )
      })
    })

    eachEntries(data.events, function ([type, handler]) {
      const [prevListener, prevOptions] = listeners[type] || []
      const [listener, options] = (handler && [].concat(handler)) || []

      if (prevListener !== listener) {
        if (prevListener) {
          element.removeEventListener(type, prevListener, prevOptions)
          delete listeners[type]
        }
        if (listener) {
          element.addEventListener(type, listener, options)
          listeners[type] = [listener, options]
        }
      }
    })

    return update
  }

  update.disconnect = function () {
    return eachEntries(listeners, function ([type, handler]) {
      const [prevListener, prevOptions] = handler
      element.removeEventListener(type, prevListener, prevOptions)
    })
  }

  return update
}
