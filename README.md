# Documentation of Would You Rather Project
**Gerard T. Lum**
April 28, 2020

This is documentation of my required project in the Udacity React Nanodegree Program, titled **Would You Rather.**

The project specification, or rubric, resides here:
https://review.udacity.com/#!/rubrics/1567/view

Udacity provides a file _DATA.js containing starting data (users and questions), and methods for writing data to a simulated database.  The task is to take the starting data file and produce a fully functioning Would You Rather app meeting specifications.  I used Create React App for development.

The finished project resides in this repository:
https://github.com/GerardTL/reactnd-project-wouldyourather

To run the project, fork and clone the repository, then issue the following commands:
```
npm install
npm start
```

## Features of Would You Rather App
- The Would You Rather app collects questions with two possible answers, such as, "Would you rather write JavaScript or write Swift?"
- The app displays all questions using an interface with two tabs: Unanswered and Answered.  For each question, the app shows the author, text of the question, and a button to either a) respond to a question not yet answered by the current user, or b) show the poll results of a question already answered (tallying votes from all users who answered it.)
- Users can also create new questions.
- The app records all questions, and the answers to each question from al users.
- The app shows a leader board which shows scores for all users.  Each users's score is the sum of the number of questions answered plus the number of questions created.
- The app requires that a user log in and log out.
- The app uses a Redux store.

## React Components
The following components reside in the src directory.
```
App.js
- Nav.js
- Login.js
- Questionslist.js
  - Questionsub.js
- Question.js
- Newquestion.js
- Leaderboard.js
  - Score.js
- Logout.js
- Page404.js
```

The original, unchanged README.md file provided by Create React App begins below.
***

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `yarn build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
