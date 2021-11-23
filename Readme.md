# Red Badge Final Project

## Purpose

[Eleven Fifty Academy](https://elevenfifty.org/) requires students to build a web application version 1.0 to graduate. The project will use PostgreSQL, ExpressJS, ReactJS, and NodeJS (also known as the PERN stack). In addition, ReactJS must use Typescript.

## Instructions

The student is responsible for coming up with an idea for the application, designing and building the application, and then deploying the client and server to Heroku. During each day of class, the instructor will simulate being a Scrum Master during Agile meeting to assess the developer's (student's) progress.

The student was given 25 business days to build the application. The application was version 1.0.

## Requirements

- Front-end is built with React **legacy** to include Class components, lifecycle methods, state management, etc.
- Include a styling library such as Material UI, Bootstrap, etc.
- Data persistence using PostgreSQL and a NodeJS ORM library (Sequelize)
- Use DB associations
- Minimum of two (2) application components use full CRUD
- MVP components
- User registration and authenication (REST-ful API)
- Role based access control
- Strong typing with Typescript
- Diligent use of Git for version control

## Explaining My Application

The application is designed for home owners belonging to a Home Owners Association (HOA), who want a secure web application to share information about their neighborhood.

From there the app has two (2) groups to server: HOA managemet and the neighborhood.

For the neighborhood, the application gives them a portal to submit HOA violations to mgmt, neighborhood transparency about reported violations and their outcomes, and neighbors can publish news relevant to neighborhood events and activity.

For HOA management, the application gives them a tool to better manage violations. The app gives them a dashboard to: (1) screen reported violations before publishing; (2) access to subscriber information; (3) three tiers for role permissions; (4) CRUD categories for violations; and (5) monitor status of violations.

## Version 1.0 - SERVER SIDE

The current version of the application, which has been presented for graduation, offers the following features:

- Data persistence using PostgreSQL and NodeJS
- Uses DB Associations with twelve (12) associations in the /models/index.js
- Follows the MVC with seven (7) Models and seven (7) Controllers
- Uses json-webtoken for validation and authenication
