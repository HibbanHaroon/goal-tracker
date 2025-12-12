# Goal Tracker

Goal Tracker is a web application which helps you track your day to day goals and empowers you to become a better individual.


## Features

- Firebase Authentication
- Spotify Embed, Flip Clock, Calender, Quote of the Day
- A goal checklist to track your daily goals.
- A graph to show your progress of the whole year.


## Lessons Learned

This project took much longer than I expected, but I learnt a lot from this project, a few things are listed below:

- Encorporating Spotify Embed was really challenging but I made it working eventually. I also made a dedicated playlist for this project to match it's dark black theme.
- React-Beautiful-DND helped a lot in making the drag and drop functionality to reorder the goals in the list.
- I used Calendar and the Checkbox component from the Material UI React Components but it was so difficult understanding the documentation in order to style the components, but in the end I understood it and made it working. 
- Home Screen was so challenging to design and also implement. I had to think of the structure of the elements so that they can be both visually pleasing on the web as well as mobile devices.
- I had to implement Firebase Authentication so that all my friends can sign in using Google and use this application daily. 

## Issues

Although the major functionalities are implemented, there are still a lot of things to implement to make this application better:

- ✅ Make the website responsive for mobile devices.
- ✅ Resolve the issue that the user stays on the Home Page for a few seconds before navigating to the Goal Tracker page.
- ✅ Add Footer to the Home Page
- ⚠️ Add a cursor and make it move from one circle to another like a portal on the Home Page. (I don't wanna do this anymore :) Date: 12/11/2025)
- ✅ Make the goals list scrollable if the list increases to a certain height
- ✅ Connect Goal Tracker to a Firestore Database and add the daily goals.
- ✅ Add a graph to show the progress of the daily goals for the whole year.

Update 12/11/2025: All the issues are fixed and I feel good about this application and the way it turned out :)

## Run Locally

Clone the project

```bash
  git clone https://github.com/HibbanHaroon/goal-tracker.git
```

Go to the project directory

```bash
  cd goal-tracker
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm start
```


## Acknowledgements

 - [Spotify Embed](https://developer.spotify.com/)
 - [Flip Clock](https://codepen.io/liborgabrhel/pen/JyJzjb)
 - [Material UI React Components](https://mui.com/material-ui/)
 - [Quotes API](https://gist.githubusercontent.com/awran5/355643af99164a61ae0f95c84206d151/raw/c62636e8eef7e73540fa04b67f753ca9b95ee21e/quotes-api.js)
- [React Beautiful DND](https://github.com/atlassian/react-beautiful-dnd)
- [Firebase Authentication](https://www.youtube.com/watch?v=cZAnibwI9u8)
- Thank you my dear friend Ghazi on the suggestion that a user should have the feature to sign in as a guest and later on link their account with an email or google.

