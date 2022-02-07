# elte

> Modify existing elements

## `el`

Create an `el` instance by calling `el()` with an `Element`.

```html
<p class="my-element"></p>
<script>
  const e = el(document.querySelector(".my-element"))
</script>
```

`e` is now an object with properties `text`, `class`, `style`, `attr`, `props` and `events`.

### `text`

Set the text of the element

(uses `element.textContent` internally)

```js
// set/replace text
e.text("Hello")

// remove text
e.text("")
```

### `class`

Add/remove classes

(uses `element.classList.[add|remove]` internally)

```js
e.class({
  active: true, // add class
  "my-element--hidden": false, // remove class
})
```

## `style`

Set/replace/remove inline styles

(uses `element.style` internally)

```js
e.style({
  color: "#000", // set `color`
  fontSize: "1.5rem" // set `font-size` (note that the property names are in camel-case)
  padding: null // remove `padding`
})
```

### `attr`

Set/replace/remove an attribute

(uses `element.[setAttribute|removeAttribute]` internally)

```js
e.attr({
  lang: "en", // add/replace an attribute
  "aria-hidden": "false", // add/replace an attribute
  "data-foo": false, // remove an attribute
})
```

### `events`

Add/remove event listener.

There is only one listener per event type. If you define a listener, a previous defined listener of the same type will be replaced.

(uses `element.[addEventListener|removeEventListener]` internally)

```js
e.events({
  click(event) { … }, // add/replace a listener
  scroll: [ // add/replace a listener with options
    function(event) { … },
    { passive: true }
  ],
  focus: false // remove a listener
})

e.events(false)  // remove all event listeners
```

## `te`

Create a `te` instance by calling `te()` with a `HTMLTemplateElement` and a callback function that will be called with each element.

```html
<template id="my-template">
  <li></li>
</template>
<ul id="list"></ul>
<script>
  const t = te(
    document.getElementById("my-template"),
    document.getElementById("list"),
    function connectedCallback(element) {
      return function updateCallback(record) {
        element.textContent = record.text
      }
    }
  )
</script>
```

`t` is now a function, that takes an array of objects, where the `key` property has to be a unique identifier. This object will be passed to the updateCallback.

```js
t([
  {
    key: "0",
    text: "First item",
  },
  {
    key: "1",
    text: "Second item",
  },
])
```

For each array item, `te` will copy the element inside the `<template>` into the target element, initialize it with the connectedCallback and modify it with the updateCallback.
