# webpack-overlay-bug
Simple app to reproduce https://github.com/webpack/webpack-dev-server/issues/1042

This simple app was based on Webpack's [Hot Module Replacement Guide](
https://webpack.js.org/guides/hot-module-replacement/)

## To reproduce the bug:

**1. Install repo**
```
git clone https://github.com/gcangussu/webpack-overlay-bug.git
cd webpack-overlay-bug
npm install
```

**2. Start the app and open your browser console**
```
npm start
```

You should see some performance warnings in the console like these:
```
[WDS] Warnings while compiling.
warnings @ main.js:4520
main.js:4526 asset size limit: The following asset(s) exceed the recommended size limit (250 kB).
This can impact web performance.
Assets: 
  main.js (355 kB)
warnings @ main.js:4526
main.js:4526 entrypoint size limit: The following entrypoint(s) combined asset size exceeds the recommended 
limit (250 kB). This can impact web performance.
Entrypoints:
  main (355 kB)
      main.js

warnings @ main.js:4526
main.js:4526 webpack performance recommendations: 
You can limit the size of your bundles by using import() or require.ensure to lazy load some parts of your application.
For more info visit https://webpack.js.org/guides/code-splitting/
warnings @ main.js:4526
```

**3. Now lets make a compilation error so the overlay appears, just put a `~` in `print.js`.**

After you save the file, the browser will receive a HMR update and an overlay containing a error like
this appears:
```
Failed to compile.

./print.js
Module parse failed: /home/gabriel/Repos/webpack-overlay-bug/print.js Unexpected token (3:0)
You may need an appropriate loader to handle this file type.
| export default function printMe() {
|   console.log('Hello');~
| };
| 
 @ ./index.js 1:0-33 21:2-26:4 21:34-26:3
 @ multi (webpack)-dev-server/client?https://localhost:8080 webpack/hot/only-dev-server ./index.js
```

**4. Now, remove the `~` making the error.**

The overlay should've disappeared, but because there are warnings it does not disappear.

## How it should behave (removing warnings)
Go to the `webpack.config.js` file and change the `performance` configuration to
```
performance: {
  hints: false
  // hints: "warning"
}  
```

This will remove the performance warnings. Save the file, **restart the server** and do steps **2** to **4** again.
This time you should see no warnings in your browser console and the overlay will disappear once you remove the `~`.
