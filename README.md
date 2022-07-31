# _Fullstack Deploy_

## Goals

- Deploy a fullstack (MERNstack) web application to a public url.
- Get practice working collaboratively on projects by splitting up the deployment and implementation of features between two students, one working on the front-end and one working on the back-end.

## Resources

- Deploying with Heroku
  - https://devcenter.heroku.com/articles/git

## Approach(Boilerplate & Account setup w/testing) Day 1

- Students will be divided into teams of two. Each team will select one person to deploy the server and one person to deploy the client.
- Both the client and server applications will be deployed using heroku.
- Students will implement features in tandem with one another in two ways:
  - Day 1 will be student A working on the front end, while student B works on the backend with the goal of connecting the client to the server via REST API.
  - Day 2 will be student A implementing feature 1 on both the front-end and backend, while student B implements feature 2 on both the front-end and backend.
  - This approach is to give students exposure to code collaboration tools such as git, pull requests, and hosted applications.

### Requirement (Student A - Part 1: Client Setup)

- Create a new github repo called deployfrontend.
- Initialize the repo with react.
  - npx create-react-app .
- Install react-router
  - npm i react-router-dom@6
- Add a new env file ./.env.local and add the following environment variable to it:
  - REACT_APP_URL_ENDPOINT = http://localhost:4000
  - Note: This will be the endpoint for developing locally on your computer. When we deploy the client, we will change this environment variable to be the url of the server deployed by *Student B.* Thus, your deployed client will be able to make requests to the deployed server.
- Configure react-router by adding <BrowserRouter> to index.js.
  - import { BrowserRouter } from "react-router-dom";
  - root.render(
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
    );
- Create a new folder ./src/Pages
- Create a new file ./src/Pages/HomePage.js with a default exported react component <HomePage />
- In <App>, implement the following:
  - Add this import statement:
    - import { Routes, Route } from "react-router-dom";
  - Add the routes elements to the JSX
    - <Routes></Routes>
  - A new index route with the element <HomePage />
    - <Route index element={<HomePage />} />
  - Add a two new state variables, clientMessage and serverMessage as str. *test frontend/backend later on.*
  - Pass clientMessage, setClientMessage, and serverMessage as props into <HomePage />
  - Add a new function called sendReceiveMessage to the body of <App />, it should:
    - Send a "POST" request to `${urlEndpoint}/post-message`
    - The body of the request should be a JSON stringified object containing clientMessage:
      - JSON.stringify({clientMessage})
    - After invoking the POST request, await a response from the server
    - Once the response is received, set serverMessage to the received message:
      - setServerMessage(responseJSON.serverMessage)
- In <HomePage />, implement the following:
  - Display clientMessage and serverMessage
  - Add a text input field that sets clientMessage to the following:
    - const dateTime = new Date()
    - `Message: ${e.target.value} at time ${dateTime.toString()}`
  - Add a button called Send that calls the sendReceiveMessage function from props
  - Goal: Client will send msg to server w/timestampt and Server will respond with received message w/timestamp.

### Requirement (Student B - Part 1: Server Setup)

- Create a new github repo called deploybackend, clone the repo to your computer. Add a README, and a node .gitignore template.
- Initialize the repo with express-generator.
  - npx express-generator .
- Create a new file ./.env and add the following environment variable to it. Ensure dotenv npm is added.
  - PORT=4000
    - Note: This will change the server port to 4000 on startup
  - require('dotenv').config();
- [Optional] Install nodemon on the server and add the custom dev command in the package.json
  - npm i nodemon
  - edit scripts in package.json
- Install the CORS package in ./.
  - npm i cors
- Add the followng code, after the line var app = express();, to app.js:
  - //enable cors
    const cors = require("cors");
    app.use(cors());
    app.options("*", cors());
- In routes/index.js, implement the following:
  - Add a new POST route "/post-message" and implement the following:
    - Note: This route will recieve a POST request from the client Student A is building. The post body should be of the shape {clientMessage: "Some string message"}.
    - The POST route should get the clientMessage from the req.body and respond with:
      - const dateTime = new Date()
      `Received client message: ${clientMessage}. Responded at ${dateTime.toString()}`

### Requirements (Students A and B - Part 2: Configure Heroku and Deploy)
- Create an account on Heroku and install the CLI(https://www.heroku.com/)
  - Note: Here is the dev guide for deployment for reference
  - https://devcenter.heroku.com/articles/git
    - $ brew tap heroku/brew && brew install heroku
- In your local repository, commit all changes and push to origin
- For Student B: 
  - Create a new Heroku remote host for the server:
    - heroku create -a deploybackend
  - Deploy your server code:
    - git push heroku main
  - If everything worked, Student B should now have a Heroku url for the hosted server. Send that url to Student A.
  - sample https://deploybackend1.herokuapp.com
- For Student A:
  - Create a new Heroku remote host for the client:
    - heroku create -a deployfrontend
  - Add the url Student B sent you as a new environment variable in the Heroku dashboard for your application.
    - Log in to https://dashboard.heroku.com/
    - Click on the app that you've deployed
    - Go to Settings
    - Click Reveal Config Vars
    - Add the new environment variable as a new config var
  - Deploy your client code:
    - git push heroku main
- If everything has been set up correctly, you should be able to type a message on the client home page, press the Send button, and see the server response message with two date timestamps.

## Approach (Collaborative Features) Day 2 

- For this part of the assignment, the goal will be for both students A and B to implement fullstack features in parallel with each other (at the same time, but not interfering with one another). 
- In order to facilitate this, both students will need to pull each other's code to their local machines to setup their local dev environment. 
- After implementing a feature, the Students should create a pull request in each other's repository to get their code merged in and deployed.

- Student A will be implementing the GET and display of a basic user list
- Student B will be implementing the POST and DELETE of users from the user list

- Note: Instructions for this part of the assignment will be simple, but intentionally kept at a high level overview. For instance, an instruction to implement a fetch function will say something like "Implement a function that will fetch data from the server and display it to a page on the front end" without the example async fetch code or the specific state variable names. Students are encouraged to use their own judgement in implementing a feature and should use the previous assignments as example code. Grading for this assignment will NOT be based upon how a particular feature was implemented, but rather if the feature functions as intended. If there is any part of the assignment that is particularly vague or confusing, please inform the instructors so that they may clairify the requirements.

### Requirements (Students A and B - Part 4: Local Development)

- For both students: 
  - Add your partner as a collaborator on your github repository, this will allow them to make commits and pull requests.
  - Send a link to your repository to your partner
  - Clone the repository your partner sent to you to your local computer
  - Exchange .env files (.env.local for React) over slack (do NOT commit .env files to your repository) and add them to the root folder you just cloned
  - Run npm i to install the Node_Modules for the repository
  - Run npm start for your server and client repositories
  - Check .env files have require anywhere in project and are installed "npm i dotenv"
  - If you did this right, you should have a local development environment that mirrors the ones you have on production (the ones you both deployed)
  - IMPORTANT: Run the following commands in your terminal to create a new branch for your code so that your git commits do not conflict with the main git branch. This should be done in both the Client AND the Server repositories.
    - git branch {your initials}-development
      - Note: Replace {your initials} with the initials of your first and last name, for instance jn-development. This is to avoid a branch name conflict with your partner. 
    - git checkout {your initials}-development

### Requirements (Students A - Part 4: GET and Display Data)

- In the server ./routes/index.js file:
  - Add a new variable in the global scope called userList and initalize it to an array with a single example user
    - const userList = [{
      id: 1,
      firstName: "John",
      lastName: "Doe",
      email: "jd@gmail.com"
    }];
  - Add a new GET route "/get-users", it should:
    - Send userList as a response

- In the client, implement the following:
  - In <App />, add a new useEffect to fetch the userList from the server and pass the userList as a prop into <HomePage />. Here is an outline of the approach:
    - Create a new state variable in <App /> to store the userList data
    - Create a new useEffect that will initiate a GET request using fetch to the server
    - In the useEffect, set the state variable you created for the userList to the data fetched from the server
    - Pass the state variable as a prop into <HomePage />
  - In <HomePage />, 
    - Create a new map function in the JSX of <HomePage /> 
    - The map function should iterate through the state variable you made for the userList in <App /> that you have passed into <HomePage /> as a prop
    - The map should return a simple JSX element that displays the firstName, lastName, and email of each user in the userList

### Requirements (Students B - Part 4:  POST and Input Data)

- In the server ./routes/index.js file:
  - Add a new variable in the global scope called userList and initalize it to an array with a single example user
    - const userList = [{
        id: 1,
        firstName: "John",
        lastName: "Doe",
        email: "jd@gmail.com"
      }];
  - Add a new POST route "/create-user", it should:
    - Get new user data from the req.body
      - const firstName = req.body.firstName
        const lastName = req.body.lastName
        const email = req.body.email
    - Generate a new id for the new user
      - [Optional] use uuidv4 to generate a new user ID instead. Note: This will likely produce a merge conflict with your partner's code later on in the requirements.
    - Push the new user data as a new user into the userList
      - const newUser = {
          id,
          firstName,
          lastName,
          email
        }
        userList.push(newUser)
    - Respond with a 200 status code and a success message

- In the client, implement the following:
  - Add a new page in ./Pages called <PostUser />
  - In <App />, 
    - Add <PostUser /> as a new route "/post-user"
    - Write a new function postUserData, it should:
      - Take in userData as a parameter
      - Make a POST request to the "/create-user" server route using fetch
      - The POST body should be JSON stringified userData
      - Note: Remember to include the application/json content-type header in the request options
         - headers: {
            "Content-Type": "application/json",
          }
    - Pass postUserData as a prop into <PostUser />
  - In <PostUser />
    - Create 3 new text input fields hooked up to 3 new state variables to hold the new user's firstName, lastName, and email
    - Add a Submit button that calls props.postUserData onClick and passes in the new user data as a parameter
      - onClick={()=>{
        props.postUserData({
          firstName,
          lastName,
          email
        })
      }}

### Requirements (Students A and B - Part 5: Merge and Deploy)

- Both students should commit their code to their {your initials}-development branch for both the Client and Server repositories:
  - git checkout {your initials}-development (this command is only necessary if you were not already on the {your initials}-development branch)
  - git add .
  - git commit -m "write your commit message here"
  - git push origin {your initials}-development 
    - Note: We are pushing to the {your initials}-development branch on the origin for both Client and Server. One repository should be yours and the other should be your partners
- Pull up both the Client and Server repositories in github, you should see your branch if you view the list of branches (you may see your partners branch as well)
- Create a pull request from the {your initials}-development branch to the main branch
- Your PARTNER should review the code in your pull request and suggest any changes you should make before they merge your code in
- Once you have reviewed your partner's pull request and there are no merge conflicts, merge the code into main
- In your local computer file system, pull the latest main branch
  - git pull origin main
- You should now have the most up to date code which includes both yours and your partner's code
- Test the code locally to see if it works
- Deploy the code using Heroku
  - git push heroku main
- Note: You control the deployment for either the Client or the Server repository. Thus, you will need to work and deploy the new code in tandem with your partner to ensure that the Production Client and Production Server have the most up to date versions of code that work together.
- If you implemented all of the above correctly, you should be able to test the create user and display userList functionality on Production.

## F.A.Q

- How to get server logs?
  - heroku logs -n 200
    - For requesting the first 200 lines
  - [More Useful Command] heroku logs --tail
    - For requesting the end of the file
  - heroku logs --tail -n 500
    - Combined command