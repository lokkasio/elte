export function sandbox() {
  return document.getElementById('qunit-fixture')
}

export function fixture(content) {
  sandbox().innerHTML = content
}

export function $(selector) {
  return sandbox().querySelector(selector)
}

export function $$(selector) {
  return sandbox().querySelectorAll(selector)
}
