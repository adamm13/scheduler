# Interview Scheduler

# Interview Scheduler
This is a single-page app built on React.js that allows users to book, edit or cancel interviews for each day of the week (Monday to Friday).
Users can interact with this app as the updates are dynamic and happen on the client-side. 

## Screenshots
Regular View and Adding an Appointment with and without a Name.
!["Regular appointments"](https://github.com/adamm13/scheduler/blob/master/docs/AddInterviewFinal.gif)

Edit and Deleting existing Interviews with Confirmation
!["Edit/ Delete form"](https://github.com/adamm13/scheduler/blob/master/docs/editDelete.gif)

If Disconnected from API DB, Throws Errors when trying to Modify. 
!["Disconnect Errors"](https://github.com/adamm13/scheduler/blob/master/docs/ScheduleErrors.gif)

## Technical Specifcations/ Dependancies 

- React
- Webpack, Babel
- Axios
- Storybook, Webpack Dev Server, JEST, Testing Library

## If you want to run the app locally
1. Fork this repository, then clone your fork of this repository.
2. Go to the [scheduler-api repository](https://github.com/adamm13/scheduler-api) that contains the database and fork it, then clone your fork of this repository.
3. Install dependencies in both folders (scheduler & shceduler-api) using the `npm install` command.
4. Open two terminals, one for scheduler and the second for scheduler-api.
5. Run the both servers using the `npm start` command.
6. Go to <http://localhost:8000/> in your browser and tinker with the app.
7. (Optional): Run the Jest Test Framework using `npm test` in an other terminal.
8. (Optional): Run the Storybook Visual Testbed using `npm run storybook` in an other terminal.