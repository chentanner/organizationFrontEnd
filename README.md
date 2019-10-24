# Organization Service Client

## Overview

This project is the front end client used to connect to the organization rest service.
It is composed of:
- A React base web application
  - With Next JS for server side rendering support
  - Redux Saga for state management and asynchronous operations
- Local dev server is hosted on an express server.

## Getting started
#### Download and install
1) Clone the repo
2) ```npm install```
3) ```npm run dev```
4) Connect to the client server, with the default url of http://localhost:3000/


## Application layout
1) / - Currently a blank page
2) /home - A filler menu item containing a blank page
3) /organizations - Restful table displaying data served by the midtier. Many of the controls are still a work in progress.
4) /organizations/{id} - A work in progress, intended to edit organization with {id}
5) /counterpartyList - A filler page testing an endless scrolling component. Displays auto generated fake data
6) /users - A Custom Table page displaying data pulled from 3rd party webservice https://reqres.in/api/users
7) /formsDemo - A filler menu item containing a blank page
8) /configuration - A filler menu item containing a blank page