# Mamyno Movie App

> An application where users can search for movies/series/shows and add to their watch list. After watch the movie/series/show they can remove the movie/series/show from their watch list.

## [View Live Preview](https://iampika.github.io/mamyno-movie-app/)

## Table of contents

- [General info](#What-is-your-motivation-for-creating-this-project)
- [Screenshots](#Screenshots)
- [Technologies](#Technologies)
- [Features](#Features)
- [Setup](#Setup)
- [Folder Structure](#Folder-Structure)
- [3rd Party API(s)](#What-3rd-Party-APIs-will-you-integrate-with)
- [Stretch Goals](#Stretch-features)
- [Inspiration](#Inspiration)
- [Process](#What-will-be-your-process)
- [Status](#Status)
- [Contact](#Contact)

## What is your motivation for creating this project

My motivation for creating this project is I love to watch movies/series and I always forgot movies/series names which I want to watch.

[Go To Top](#Table-of-contents)

## Screenshots

![Landing Page](./assets/LandingPage.png)
![App Page](./assets/AppPage.png)

[Go To Top](#Table-of-contents)

## Technologies

- HTML5
- Scss
- Vanilla JavaScript
- No frameworks

[Go To Top](#Table-of-contents)

## Features

- [x] Users can search for movies/series/show.
- [x] Users can add movies/series/shows to watch list.
  - [x] Using LocalStorage
- [x] Users can view the watch list.
- [x] Users can delete movies from the watch list.

To-do list:

- [ ] Users can select the status for the movie:
  - Watching
  - Done
- [ ] Users can select a platform where they will watch the movie:
  - Netflix
  - Amazon
  - Hulu
  - Showtime
  - Theater
  - Apple TV
- [ ] Users can add a platform where they want to watch the movie.
- [ ] Users can delete a platform.
- [ ] Users can update a platform.
- [ ] Users can give tags to the movies, so later they can filter through it
  - Anime
  - Comedy
  - Weird
  - Action
  - Horror
  - News
  - Animation
  - Science
  - Drama
  - Sci-Fi
  - Marvel
  - Standup
- [ ] Users can create the tags for the movies.
- [ ] Users can delete the tags for the movies.
- [ ] Users can update the tags for the movies.

[Go To Top](#Table-of-contents)

## Setup

```
git clone https://github.com/jakepintu/mamyno-movie-app.git
```

```
npm install

OR

yarn install
```

```
npm start

OR

yarn start
```

[Go To Top](#Table-of-contents)

## Folder Structure

```
├── package.json
├── README.md
└── src
    ├── index.html
    ├── app.js
    ├── js
    │   ├── animation.js
    │   ├── api.js
    │   ├── helpers.js
    │   ├── pages.js
    │   └── theme.js
    └── scss
        ├── abstracts
        │   ├── _functions.scss
        │   ├── _include-media.scss
        │   ├── _mixins.scss
        │   └── _variables.scss
        ├── base
        │   ├── _base.scss
        │   ├── _helpers.scss
        │   └── _typography.scss
        ├── components
        │   ├── _buttons.scss
        │   └── _forms.scss
        ├── layout
        │   ├── _header.scss
        │   ├── _hero.scss
        │   ├── _main.scss
        │   └── _movies.scss
        ├── _normalize.scss
        ├── _animation.scss
        ├── _themes.scss
        └── style.scss
```

[Go To Top](#Table-of-contents)

## What 3rd Party API(s) will you integrate with

OMDb (The Open Movie Database) API

- Link to the API documentation here - <https://www.omdbapi.com/>

[Go To Top](#Table-of-contents)

## Stretch features

- [ ] User can add a date to the movie.
- [ ] User can update the date.
- [ ] User can delete the date.
- [ ] User can view the movie on the calendar.
- [ ] Use a linter (eslint)
- [ ] Mobile first approach
- [ ] SEO friendly tags
- [ ] UI Animations
- [ ] Use plain CSS with Flexbox
- [ ] Settings persistence in the browser with Local Storage or IndexDB
- [ ] Structure your javascript code in an MV\* pattern (No 3rd party libraries)
- [ ] Use a state management pattern in your JavaScript code (No 3rd party libraries)
- [ ] Multiple pages with DOM manipulation (SPA) instead of multiple html files.
- [ ] Document JavaScript with JSDoc
- [ ] E2E testing
- [ ] 100% lighthouse score
- [ ] Use a CI / CD pipeline

[Go To Top](#Table-of-contents)

## Inspiration

![Inspiration 1](./assets/Inspiration/inspiration1.png)
![Inspiration 2](./assets/Inspiration/inspiration2.png)

[Go To Top](#Table-of-contents)

## What will be your process

- What project management tool will you use?
  - I will use Github Projects, to break down project in smaller, manageble pieces and track their progress. You can view it [here](https://github.com/jakepintu/mamyno-movie-app/projects/1).
- How often will you commit your code?
  - I will aim to commit code every day
- How will you test your web site?
  - I will test the API with Postman.
  - I will test the finished website on my computer.
- How will you design the layout of your website? Will you use a wireframing tool? Will you draw it on paper?
  - I will use <https://wireframe.cc/>

[Go To Top](#Table-of-contents)

## Status

Project is: _in progress_

[Go To Top](#Table-of-contents)

## Contact

Created by [@jakepintu](https://www.twitter.com/@jakepintu) - feel free to contact me!

[Go To Top](#Table-of-contents)

## Collaborators

