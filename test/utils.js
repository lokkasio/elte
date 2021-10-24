export const sandbox = () => document.getElementById("qunit-fixture")
export const $ = (selector) => sandbox().querySelector(selector)
export const $$ = (selector) => sandbox().querySelectorAll(selector)
export const fixture = (content) => {
  sandbox().innerHTML = content
}
