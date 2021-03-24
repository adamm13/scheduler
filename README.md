# Interview Scheduler

This is a single-page app built on React.js that allows users to book, edit or cancel interviews for each day of the week (Monday to Friday).
- Data is persisted by the API server using a PostgreSQL database.
- The client application communicated with an API server over HTTP, using the JSON format.
- Jest tests are used through the development of the project. 

## Technical Specifcations/ Dependancies 

- React
- Webpack, Babel
- Axios
- Storybook, Webpack Dev Server, JEST, Testing Library

## Screenshots
Regular View and Adding an Appointment with and without a Name.
!["Regular appointments"](https://github.com/adamm13/scheduler/blob/master/docs/AddInterviewFinal.gif)

Edit and Deleting existing Interviews with Confirmation
!["Edit/ Delete form"](https://github.com/adamm13/scheduler/blob/master/docs/editDelete.gif)

If Disconnected from API DB, Throws Errors when trying to Modify. 
!["Disconnect Errors"](https://github.com/adamm13/scheduler/blob/master/docs/ScheduleErrors.gif)

Optimized for Both Desktop and Mobile.
!["Mobile View Landscape"](https://github.com/adamm13/scheduler/blob/master/docs/Screen%20Shot%202021-03-24%20at%204.00.52%20PM%20(2).png)
!["Mobile View Portrait"](https://github.com/adamm13/scheduler/blob/master/docs/Screen%20Shot%202021-03-24%20at%204.01.03%20PM%20(2).png)

## If you want to run the app locally
1. Fork this repository, then clone your fork of this repository.
2. Go to the [scheduler-api repository](https://github.com/adamm13/scheduler-api) that contains the database and fork it, then clone your fork of this repository.
3. Install dependencies in both folders (scheduler & shceduler-api) using the `npm install` command.
4. Open two terminals, one for scheduler and the second for scheduler-api.
5. Run the both servers using the `npm start` command.
6. Go to <http://localhost:8000/> in your browser and tinker with the app.
7. (Optional): Run the Jest Test Framework using `npm test` in an other terminal.
8. (Optional): Run the Storybook Visual Testbed using `npm run storybook` in an other terminal.