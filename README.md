# WEB SKELETON

Repository contains simple startup application with authentication and user profile editor. Technology choosen for the application was React for user interfaces and Redux for state management. Development tool choosen to automate process was Webpack. Further development process is faster and doesn't require basic project setup and functionalities to be written from scratch.


## Install

Recommended way to run this project would be to pull [Skeleton](https://github.com/EastCoastProduct/skeleton) repository and follow instructions to setup local environment. Following those steps wouldn't require user to make any manual steps to run this project.

This project can also be run as standalone but it depends on existing [API](https://github.com/EastCoastProduct/api-skeleton) to make requests. API should be pulled, installed and configured along with this repository or all requests should be replaced. API requests are held inside */src/actions* folder.

In case of standalone setup, machine needs to have installed:
* Node (we recommend latest stable node version 6)
* npm (version 3)

Pull or download repo to local machine and run these commands from project's root directory:

    npm install
    npm start

Open browser on link [http://localhost:7000/login](http://localhost:7000/login).


## Configuration

For development process configuration starts with Express server.

**server.js**

Contains express server configuration which reads webpack development configuration (*webpack.config.js*) and sets up server running our single page application (SPA). This configuration also enables hot reloading by providing webpack dev and hot middlewares. All configuration for hot reloading is held inside webpack configuration. Files are held in memory and everytime file inside project structure gets changed browser will refresh and show latest code.

**webpack.config.js**

Webpack automates development process for us by bundling whole project files into single JS file. In configuration we define entry point of out application which is *src/index.js*. Also we have to include hot middleware into our bundled project setting reload flag which would reload browser when needed.

Output folder in our case is *dist* folder. In this case we won't have that folder locally created, it will be held inside memory and hot reloaded on every change.

Plugins section contains one optimization plugin along with hot module replacement plugin needed for hot reloading feature. We also define HTML webpack plugin which creates *index.html* file automatically based out of template file held in *src/index.tpl.html*. This is helpful for us to automatically add bundled script at the end of body and alows us to hash those files like we do in production mode. Last plug we use just defines 3 global variables, 2 of which we use in our app as constants and one that notifies react and other modules that we are running this bundle in development mode. This enables PropTypes validation, hot reloading and some other features that are not needed in production mode.

List of loaders manipulates certain file types and does specific alterations on them. Most important ones are babel and eslint loader made on all of our JS files that are included in a project. Babel transpiles our ES6 code into ES5 and enables it to work for older browsers that don't fully support ES6 features. Eslint checks out syntax and errors our for unexpected syntax which is defined in *.eslintrc* file. All other loaders are currently used just to load our Font Awesome library and embed it in a project through JS. This way we save one HTTP request prefetching fonts from server.

**webpack.prod.config.js**

Production configuration is similar to development one. Difference is that our output file is going to be hashed so we can prevent file caching in production mode. Source maps are also different from development mode which is defined by *devtool* property.

There's few more plugins in production mode as we want to enable chunking of common files from other project files, lose duplicate code, minimize our code and allow agressive merging policy to get more optimized and minified file that we would in case of development mode. In this case, one of our global variables we send is notifying React and other modules that we're running code in production mode so we can get rid of hot reloading and any other unnecesarry ckecking and validation that we use in development mode.

**.babelrc**

This file holds configuration for Babel loader. We have presets defined to allow us to use modern ES6 syntax along with basic react best practices. We are using decorators which are experimental ES7 plugin so it needs to be added manually. As a last configuration point we are defining React hot module replacement preset in case of development mode.

**.eslintrc**

This file holds eslint configuration which is based out of airbnb configuration alongside with basic recommended eslint and react configurations. We also define using ES6 syntax and few of our own rules that don't comply with default configuration.


## Development

To start further development process from this skeleton there are few manual steps that should be made before start of development.

**package.json**

Some data should be changed corresponding to your project. Generic information like *name*, *description*, *author* and *license* should probably be changed to information that closely describes your project.

**webpack.config.js** | **webpack.prod.config.js**

    new webpack.DefinePlugin({
      __APP_URL__: JSON.stringify('http://192.168.50.4:7000'),
      __API_URL__: JSON.stringify('http://192.168.50.4:3000'),
    }),

These lines define global variables that get passed to your bundled project. We are passing *__APP_URL__* and *__API_URL__* as global variables which we use inside app as web and api constants. These constants are valid if local setup has been done through [Skeleton](https://github.com/EastCoastProduct/skeleton), in any other case these global variables should be manually updated to corresponding ones.

**src/index.tpl.html**

Title inside template should be updated to corresponding one instead of generic one. Favicon link doesn't exist with skeleton example which should probably be added manually.

**src/store/index.js**

This file contains store configuration which also expects Redux DevTools to be installed:

    createStoreWithMiddleware = compose(
      applyMiddleware(thunk),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )(createStore);

This setup expects [Redux DevTools extension](https://github.com/zalmoxisus/redux-devtools-extension) to be installed in browser. Follow instructions to install extension which will be enabled immediatelly by this setup. Extensions are not suported for all browser but there is another [Redux DevTools](https://github.com/gaearon/redux-devtools) module that isn't part of extension which can be used in case other browser support is needed.


## Production

To build your code in production mode run:

    npm run build

This would bundle JS code in production mode following configuration defined in *webpack.prod.config.js* and create dist folder. Dist folder contains production ready files which can be deployed and served using technology of choice. To test production ready code locally run:

    npm run prod

This serves production ready code from dist folder and allows it to be tested locally in browser.


## Structure

    .
    ├── src                      # contains all JS React/Redux code
    │   ├── actions              # synchronous action creators and asynchronous actions
    │   ├── components           # reusable React components
    │   ├── constants            # actions, error messages and global app constants
    │   ├── containers           # connected React components, page components which are connected to React Router
    │   ├── reducers             # root reducer setup importing individual reducers
    │   ├── routes               # React Router setup
    │   ├── store                # store setup for development and production
    │   ├── utils                # reusable modules like validator, error parser...
    │   ├── index.js             # entry point for our React/Redux application
    │   └── index.tpl.html       # template html from which html-webpack-plugin creates output html file including hashed JS files
    ├── .babelrc                 # babel configuration including ES6 syntax
    ├── .eslintrc                # eslint configuration based on airbnb setup
    ├── .gitignore               # ignore setup for git
    ├── package.json             # module dependancy
    ├── README.md                # Documentation
    ├── server.js                # express server for development setup including hot reloading
    ├── webpack.config.js        # webpack setup for development, used when running development
    └── webpack.prod.config.js   # webpack setup for production, used when building dist folder


## Routes

All routes are configured inside *src/routes* folder. Routing inside application is managed by React Router.

Routes | Container | Description | State data | Requests
------|-----------|-------------|------------|---------
/ | App -> Home | Shows message to unconfirmed users and option to resend confirmation email | user | **POST** /resendConfirmation
/profile | App -> Profile | View user's profile data | user | **GET** /users/:userId
/editProfile | App -> EditProfile | Edit user profile data, change email and change password | user | **POST** /users/:userId <br/> **POST** /changeEmail <br/> **POST** /changePassword
/login | Login | Login form | none | **POST** /authenticate
/signup | Signup | Signup form | none | **POST** /users <br/> **POST** /authenticate
/forgotPassword | ForgotPassword | Form with email field that sends link to change password | none | **POST** /resetPassword
/recoverPassword/:code | RecoverPassword | Page accessible through link received via email, contains form allowing to recover password by typing new one and sending it allong with code parameter gathered from URL | none | **POST** /changePassword
/emailConfirm/:code | EmailConfirm | Page accessible through link received in email after signup process or after resending email confirmation. Sends the code gathered as parameter from URL to confirm valid email. | auth | **POST** /emailConfirm
* | Page404 | Renders in case no other route was matched, shows information to user and offers links to go back to Home or Login | none | none
 | App | Parent component for the application that holds menu and allows user to logout | none | none


## Local Storage

We hold some data permanently inside local storage. After user successfully logs in or signs up into our application we store user object returned by API under user key. We also get JWT token returned by successful authentication process after login/signup which se store under token key. With every request we are obliged to send *Authorization* header which contains JWT token. This allows our API to authenticate us and allow access to it's endpoints. This token has expiration duration after which becomes invalid and user is expected to login again. User object stored in local storage needs to be updated everytime we do any manipulation on it's object. This is a manual work that needs to be taken into consideration and keep user in Redux store and local storage in sync. Only way to clear local storage from within application is to logout from it which clears all the data stored in local storage.


## Modules

Modules list is defined in *package.json*. Purpose of each module in project:

**DevDependencies**
* babel-core - Babel compiler core module
* babel-eslint - module allows linting of all valid babel code
* babel-loader - webpack loader for Babel allows code transpiling
* babel-plugin-transform-decorators-legacy - babel plugin that allows ES6+ decorators
* babel-preset-es2015 - preset to install all ES6 plugins
* babel-preset-react - preset to install all React plugins
* babel-preset-react-hmre - preset for react hot module replacement
* babel-preset-stage-0 - preset to install future and experimental plugins that polyfill potential JS language proposals
* connect-history-api-fallback - always serves *index.html* file from express without depending on manual route changes in URL
* css-loader - webpack CSS loader, resolves imports and url in CSS
* eslint - linting utility for JS
* eslint-config-airbnb - Airbnb eslint configuration
* eslint-loader - webpack eslint loader
* eslint-plugin-import - Airbnb's config dependency, supports ES6 import/export styntax
* eslint-plugin-jsx-a11y - Airbnb's config dependency, static analysis linter of jsx and accessibility with screen readers
* eslint-plugin-react - Airbnb's config dependency, provides React specific linting rules
* express - minimalistic node framework used to serve files in development and allow hot reloading feature
* file-loader - webpack file loader, constructs MD5 hash filename and emitts files
* html-webpack-plugin - simplifies creation of *index.html* file through webpack
* style-loader - webpack style loader, adds CSS to dom by injecting style tags
* url-loader - webpack url loader, returns Data Url if file is smaller than limit
* webpack - JS bundler for automating tasks
* webpack-dev-middleware - dev middleware for webpack arguments live bundle to a directory
* webpack-hot-middleware - webpack hot reloading attached to express server

**Dependencies**
* babel-polyfill - provides polyfills for full ES6 environment
* es6-promise - provides Promise polyfill
* font-awesome - Font Awesome library, imported in project entry file and served by webpack
* immutable - library which allows immutable persistent data collections
* react - JS framework for building user interfaces
* react-dom - React package, allows working with DOM, used to hook up react application to template DOM served by *index.html*
* react-redux - React bindings for Redux
* react-router - React routing library
* recompose - HOC wrapper to allow passing data from connected components to components wrapped by Redux Form decorator
* redux - persistant state management library
* redux-form - HOC wrapper for form components, allows basic form functionality and reduces boilerplate
* redux-immutablejs - provides integration between Immutable and Redux
* redux-thunk - Redux middleware which allows async actions
* store - localStorage wrapper for all browsers, simplifies writting to and reading from localStorage
* validator - provides data validation
* whatwg-fetch - provides polyfill for Fetch API

## Utils

Folder contains shareable files that provide functionality on top of current React/Redux setup that is contained in all other folders in *src* directory:

**createFormData.js**
Module that creates FormData object used in multipart API POST request and returns it. Function takes iterable as parameter. Data in our app is immutable and it can be iterated to construct FormData object out of all values that our iterable contains.

**fetch.js**
Module which exports Fetch API. We don't call Fetch API immediatelly from our actions because with every request there is bunch of repeatable processes through which our request needs to go. That is why this module contains all reusable functionality and configuration. With every request we have Authorization header and usually Content-Type header. We merge those headers with other options passed to the module and use custom options along with default headers. Upon every successful response we need to parse JSON data into readable objects and we need to check status of our request. By specification, Fetch API promises reject only in case of exception so we need to manually check status of response and manually reject in case our API responded with error. Last thing to check is when our Fetch API promise gets rejected. in that case we want to make sure that we redirect all 401 statuses back to Login page because user doesn't have permissions to access our application.

**parseErrors.js**
Module that parses additional error messages returned from API request. Our error response object will always have some generic message, but in case of POST request we can have additional errors contained per each parameter sent in POST request. For instance, we also have validation on API in case of POST request where we send form values. Upon return, this module parses additional debugInfo data and assigns each filed error. because we use Redux Form to handle our form functionality we are using SubmissionError constructor to create those errors. This way our Redux Form knows exactlly which error belongs to which input.

**validator.js**
Module that holds multiple functions which validate certain data inside our forms and constructs error messages in case of invalid data.


## Redux setup


## Tests


## Generic Form functionality and flow (Redux Form)


## Issues
