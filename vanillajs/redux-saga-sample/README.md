# Redux saga sample application

This project uses webpack used to bundle its dependencies and npm to manage these dependencies. 

To install dependencies run 
```bash 
npm install 
```

To build project run

```bash
npm run build
```

This runs webpack using the the [webpack.config.js](./webpack.config.js) at the root of this project. The webpack build outputs two files in the dist folder.

- [app.init.js](./dist/app.init.js) - The application init script that creates the store and applies the redux-saga middleware
- [bundle.js](./dist/bundle.js) - bundled code for the only web component in this application - [counter.js](./src/counter.js)
