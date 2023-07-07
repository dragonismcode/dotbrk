# dotbrk
Parse and export data from the .BRK file extension

## Installation
To install the package, use the `npm install` command:
```bash
npm i dotbrk
```

## Example
```js
const { loadFile } = require('dotbrk')

loadFile('./example.brk').then(res => {
    console.log(res)
})
```