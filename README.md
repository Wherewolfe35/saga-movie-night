# Movie Night

This app allows a user to search the provided database for available movies.  Upon selecting a movie, the user can read about and/or update descriptions.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development.

### Prerequisites

Needed software

```
node.js
SQL
Postico
```

### Installing

Fork and Clone

Create database "saga_movies_weekend" and add tables and values given in the (database.sql) file.

```
npm install
npm run server
npm run client
```

## Using the App
The app will open on the home page. The default search will provide the top 10 movies in alphabetical order.  Further search will yield up to 10 results related to the search.

Click on the poster image of the movie in the search results to read the details on the movie. On the buttom the user will see buttons that will allow the user to navigate back to home or edit the details of the movie.

The edit page allows a user to change the title, description, and genres of the movie and save changes upon clicking the save button.  The cancel button will navigate the user back to the details page. 

## Built With

* React
* React-router
* Redux
* Redux-saga
* Postgresql
* Material-UI
* Axios
* pg


## Authors

Wherewolfe35

## Stretch Goals

- [ ] Create an `Admin` page. Add a link from the `Home` page to the `Admin` page. The page should initially display a login form (an input for username and an input for password). When the user enters the correct username (`camera`) and password (`action`), the page should display a form to add genres to the database, and a list of all of the genres with an `x` to remove them from the database. Note: This isn't actually secure, but it's pretty fun, and really good practice.
