# Would You Rather? React App

[View online](https://jekkilekki.com/labs/would-you-rather)

**Would You Rather?** is a React + Redux Polling App that utilizes the [Redux store](https://redux.js.org/basics/store)  to maintain application state. More details about the app's architecture can be found in the [Architecture](#architecture) section of this guide.

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).<br>
It was built as part of Udacity's [React Nanodegree](https://www.udacity.com/course/react-nanodegree--nd019) program.

## Table of Contents

- [Overview](#overview)
- [Installation](#installation)
  - [Build](#build)
- [Application Functionality](#application-functionality)
  - [Home Page](#home-page)
  - [Login Page](#login-page)
  - [Dashboard](#dashboard)
  - [Question Details](#question-details)
    - [Answering Questions](#answering-questions)
  - [Asking New Questions](#asking-new-questions)
  - [Leaderboard](#leaderboard)
- [Architecture](#architecture)
  - [Folder Structure](#folder-structure)
- [Future Development](#future-development)
  - [Contributing](#contributing)
- [License](#license)
- [Changelog](#changelog)
  - [`1.0.1` - 2018.11.11](#101---20181111)
  - [`1.0.0` - 2018.09.02](#100---20180902)

## Overview

In a nutshell, users are able to:

1. Login to the app as one of three default members
2. Pre-defined questions are loaded from the "fake" Database (`_DATA.js`)
3. Users may then navigate the Dashboard to view Answered, Unanswered, or user-created questions (Mine)
4. They may answer questions or ask additional 
questions
5. The Leaderboard updates users' rank and score based on their activity in the app

More details about the app's functionality can be found in the [Application Functionality](#application-functionality) section of this guide.

## Installation

To install this app, simply open a command line application and clone this repository.

```
git clone https://github.com/jekkilekki/reactnd-would-you-rather
```

Navigate to the newly created directory and run the following commands to install dependencies and run the application.

```
npm install

npm start
```

The application should then automatically load in your browser at [http://localhost:3000](http://localhost:3000)

For a more complete explanation of each available `npm` script and what it does, see the Create React App's [README file](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#available-scripts).

### Build

To build the application and serve it on the website, the following changes need to be made to serve the app from a subfolder.

#### `package.json`

Added the following line to run this app from a subfolder:

```
"homepage": "http://website.com/subfolder"
```

#### `app.js`

In `app.js`, modify the `<BrowserRouter>` component to take the subfolder as a `basename` prop:

```
<BrowserRouter basename='/subfolder'>
```

#### `npm run build`

This script is included with the default `react-scripts` when first running `create-react-app`. It minifies the CSS and JS and bundles all the files into a `/build` folder for easy upload. 

#### Upload to Dreamhost

For Dreamhost, just upload everything output from the `/build` folder and you're good to go. (Change the `favicon` too if you want.) Just remember to run this command __*every time*__ you want to update the app online.

## Application Functionality

A top navigation bar controls access to all the pages in the app. On smaller screens, this is converted to a hamburger menu button and slide-in side navigation.

There are two types of pages available to view:

1. `Public` pages **are NOT** restricted to logged in users and are publicly accessible. These include the Home view and Login screen.
2. `Private` pages **are** restricted to logged in users and are NOT publicly accessible. These include the Dashboard, individual Question Detail pages, the Add Question form, and the Leaderboard.

### Home Page

Page restriction: `public`

The app's actual homepage (located at the root of the site) is publicly accessible and acts as a sort of `README` or site introduction page. 

Without authenticating, users may move freely between the Home (root) page and the Login page.

### Login Page

Page restriction: `public`

If a user is not logged in and tries to navigate to any other page, the application will redirect to the login screen. Users can then select one of THREE users from a dropdown list and click the `Login` button to enter the app. 

Once a user successfully logs in, that user's name and picture are displayed in the upper-right hand corner of the top navigation menu. A `Logout` button is displayed beside the user's picture and will redirect to the Login page if a user logs out.

Without logging in to the app, none of the other app pages (minus the Home page) are visible. And if a user attempts to access a restricted page, the app will redirect to the Login screen for authentication before displaying that page.

### Dashboard

Page restriction: `private`

The app's Dashboard is the true "heart" of the application. From here, users can view the asked questions in one of four views:

1. All questions
2. Unanswered questions (default view)
3. Answered questions
4. Mine (user created questions)

Polls are arranged from most recently created (top) to least recently created (bottom).

### Question Details

Page restriction: `private`

Each Question is linked to a Details page available at `/questions/:question_id`. There are two views available on a Question Details page:

1. **Unanswered Questions** display only the name and picture of the user who asked the question, the question itself (with two possible options displayed as buttons), and some meta information like the timestamp
2. **Answered Questions** additionally display the user's choice, a distribution graph of the results (including vote totals and percentages), and a Vote distribution area that displays each user's picture who voted for each option

#### Answering Questions

A user may click an option to vote on a question on either the Dashboard page or the Question Details page only *once*. Once a question has been voted on, button clicks no longer have any effect.

### Asking New Questions

Page restriction: `private`

Users may also create and ask new questions. This functionality is accessible at the `/add` route of the app. Users must fill in text for both Option One and Option Two before the `Ask Question` button is enabled.

After a new question is created, the user is returned to the Unanswered questions view of the Dashboard where the newly created question slides in to the top of the list as the most recently created question.

### Leaderboard

Page restriction: `private`

The Leaderboard is available at `/leaderboard`. Entries are updated whenever an action occurs in the app (like answering questions or creating new questions) and contain the following information:

1. The user's rank (1st, 2nd, 3rd, etc)
2. The user's name and picture (pictures are not displayed on smaller screens)
3. Number of questions answered
4. Number of questions asked
5. Total score (questions answered + questions asked)

## Architecture

**Would You Rather?** is a React + Redux app that takes full advantage of the [Redux store](https://redux.js.org/basics/store) to maintain React's state throughout the application. 

App updates are triggered by dispatching action creators to reducers which return updated  state information to the app. Components read the necessary state from the Redux store and there are no direct API calls in the components' lifecycle methods. State-based props are mapped from the store rather than stored as component state.

### Folder Structure

After cloning the GitHub repository, the project directory includes the following folders:

```
reactnd-would-you-rather/
  node_modules/
  public/
  src/
    actions/
    components/
    middleware/
    reducers/
    utils/
```

#### `/src/actions`

From the [Redux.js](https://redux.js.org/basics/actions) site:

> Actions are payloads of information that send data from your application to your store. They are the only source of information for the store. You send them to the store using `store.dispatch()`.<br><br>Actions are plain JavaScript objects. Actions must have a type property that indicates the type of action being performed. Types should typically be defined as string constants.

This app's actions are contained within the following files and are self-explanatory:

- `authedUser.js`
  - `SET_AUTHED_USER`
- `questions.js`
  - `RECEIVE_QUESTIONS` (from the "fake" database `_DATA.js`)
  - `ANSWER_QUESTION`
  - `ADD_QUESTION`
  - `DELETE_QUESTION` (work in progress)
- `shared.js` (handles loading the initial app data)
- `users.js`
  - `RECEIVE_USERS` (from the "fake" database)

#### `/src/components`

All React components and component-specific CSS reside within the components folder. 

#### `/src/middleware`

From the [Redux.js](https://redux.js.org/advanced/middleware) site:

> Middleware is some code you can put between the framework receiving a request, and the framework generating a response.

The middleware applied in this app includes `thunk` and a `logger` which "logs" information on the state of the application to the browser console after Redux actions are dispatched.

##### `thunk`

From [Redux-thunk](https://github.com/reduxjs/redux-thunk) on GitHub:

> Redux Thunk middleware allows you to write action creators that return a function instead of an action. The thunk can be used to delay the dispatch of an action, or to dispatch only if a certain condition is met. The inner function receives the store methods dispatch and getState as parameters.

Applying `thunk` as a middleware in this app allows us to call `setTimeout()` on our dispatched actions in order to emulate the delayed response from a database controlled by a server. 

Because this app uses a "fake" database, all the data is immediately available and application updates such as adding new questions would happen instantaneously if we didn't use `thunk`. 

#### `/src/reducers`

From the [Redux.js](https://redux.js.org/basics/reducers) site:

> Reducers specify how the application's state changes in response to actions sent to the store. Remember that actions only describe what happened, but don't describe how the application's state changes.<br><br>In Redux, all the application state is stored as a single object. 

There are two major "slices" of state that need to be maintained and updated by our reducers. These are the `users` and `questions` slices of state (`authedUser` is also maintained here but it has much less "work" to do as it only handles logging in or logging out).

The following files contain the app's reducers which are combined in `index.js` with Redux's `combineReducers()` function:

- `authedUser.js` (sets or resets the authenticated user id)
- `index.js` (combines our reducers - including the React Redux Loading Bar)
- `questions.js`
- `users.js`

Each of last two files, `questions.js` and `users.js` contain specific actions from their relevant `/actions` files (see above). 

But `users.js` additionally includes the actions `ANSWER_QUESTION` and `ADD_QUESTION` from `/actions/questions.js` because `ANSWER_QUESTION` and `ADD_QUESTION` modify not only the `questions` slice of state, but also the `users` slice of state.

#### `/src/utils`

The following files are contained within the `/utils` folder:

- `_DATA.js` (our "fake" database and default API calls)
- `api.js` (API calls to get our initial data and save future data)
- `helpers.js` (to properly format Questions and Date timestamps)

## Future Development

The following list are things I'm contemplating for future development:

- Add screenshots to Home view and README
- `DELETE_QUESTION` functionality
  - For users to delete their own questions
  - If an `admin` role is implemented, to delete any asked questions
- Possible `admin` role
- Saving and loading external data from [Firebase](https://firebase.google.com/)
- Allowing new users to create accounts and sign-in with their own ids and passwords
- Adding additional question options (OptionThree, OptionFour for example)
- Linking Questions into specific pages to create Quizzes

### Contributing

The best way to Contribute to this app is to open an [Issue](https://github.com/jekkilekki/reactnd-would-you-rather/issues) on GitHub.<br>I likely will not spend much time looking at Pull Requests.

## License

The **Would You Rather?** app is licensed under the [MIT open source license](https://opensource.org/licenses/MIT) and built with React and Redux and uses the following third-party resources and `node` modules:

- [React](https://reactjs.org/)
- [React Router](https://www.npmjs.com/package/react-router)
- [Redux](https://redux.js.org/)
- [Redux Thunk](https://www.npmjs.com/package/redux-thunk)
- [MaterializeCSS](https://materializecss.com/)
- [React Materialize](https://www.npmjs.com/package/react-materialize)
- [React Redux Loading](https://www.npmjs.com/package/react-redux-loading)
- [React Transition Group](https://www.npmjs.com/package/react-transition-group)
- Google Fonts
  - [Noto Sans](https://fonts.google.com/specimen/Noto+Sans)
  - [Caveat](https://fonts.google.com/specimen/Caveat)
  - [Material Icons](https://materializecss.com/icons.html) (as part of MaterializeCSS)

## Changelog

### `1.0.1` - 2018.11.11
 - Build for deployment
 - Add screenshot for Homepage
 - Update README

### `1.0.0` - 2018.09.02 
 - Initial release
