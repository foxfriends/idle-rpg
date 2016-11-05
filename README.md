[NodeJS]: http://nodejs.org
# Ball Box (name TBD)

## Setup

Because this is a JS project, please download [NodeJS][]. Get the most recent
version.

To initialize the project, type `npm install` in the terminal/command prompt. This
will download any packages you need.

After that, you will also have to manually install a few packages globally with:

```bash
npm install --global webpack http-server
```

## Running the project

To run the project, open the terminal to this directory and type `npm start`.
Also, in a second terminal at this directory run `webpack --watch` to compile
the code while you are working. You can then see it in your browser at
'localhost:8080'.

## Code style

Try to keep the code consistent - basically don't make it ugly. Specifics are here:
*   use single quotes `'` for strings (except template strings)
*   indent with 2 spaces
*   use triple equals `===` and `!==` for equality always
    *   NO double equals `==` or `!=` because double equals is bad
*   use `const` for all variables, unless mutation is needed then use `let`
    *   NO `var` because `var` is bad
*   start all new files with `'use strict';` on its own line
*   put all `import`s at the top of the file and `export`s at the bottom
*   more files is not a bad thing - make modules wherever it makes sense
*   do the braces like this (not on their own lines):

    ```javascript
    if (something) {
      // do it
    }
    ```

*   camelCase for variable/function names (including variables defined with `const` at local scope)
*   Capitalize class names
*   ALL_CAPS for constants defined at file scope
*   write some comments where the code is not self-descriptive
    *   also put a brief description of what a file is for at the top
    *   if you can't describe it briefly it's probably supposed to be broken up more
