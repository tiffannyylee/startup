# BucketBudget
## Specification Deliverable
### Elevator Pitch
  How often do you set a budget, only to forget about it after a few days? Introducing BucketBudget! Our app makes budgeting simple and engaging. With real-time updates and intuitive tracking, you can effortlessly allocate your funds, monitor your spending, and stay motivated. Say goodbye to forgotten budgets and hello to financial clarity with BucketBudget. Manage your money, stay on track, and reach your goals—all in one place.
### Design
![Screenshot 2024-09-14 at 8 15 44 PM](https://github.com/user-attachments/assets/2aed66c9-4829-418f-83d7-991762273b35)
### Key Features
- Secure login over https
- Ability to enter your total available funds and allocate them into customizable categories.
- Easily log and categorize expenses as they occur, with instant updates to your budget
- Ability to share budget with another user 
### Technologies
I am going to use the required technologies in the following ways.

- HTML - Uses correct HTML structure for application. Two HTML pages. One for login and one for budgeting. Hyperlinks between pages.
- CSS - Application styling that looks good on different screen sizes, uses good whitespace, color choice and contrast.
- React - Manages user authentication, budget setup, expense tracking, and goal monitoring.
- Service - Backend API with the following endpoints:
  - login: Handles user authentication and session management.
  - budget: Retrieves and updates the user’s budget and categories.
  - expenses: Submits and retrieves expense records.
  - goals: Manages and tracks financial goals.
- DB/Login - Stores user data, budget information, expenses, and financial goals.
Handles user registration and login with securely stored credentials.
Ensures that budget management and expense tracking are only available to authenticated users.
- WebSocket - Provides real-time updates for expense tracking and budget adjustments.
Ensures that changes in the user’s budget or expenses are reflected instantly across all active sessions.

## HTML Deliverable
**Html Pages:**
  - I created 3 different pages for my project. One for the login, one to show current sections of your budget and keep track of your total, and one to add the ability to report purchases.
    
**Links:**
  - I linked the login page to the buckets page, and then a button on the buckets page that says "add purchase" connects to the purchases page.
    
**Text:**
  - The text boxes have textual descriptions like "Share Budget With"
    
**Images:**
  - I put an image of buckets with coins that can be turned into a background picture for the header later on.
    
**DB/login:**
  - Input box and submit button for log in. The buckets have data that will be stored in a data base. Things like total, remaining, and purchases will be accessed from a database.
    
**WebSocket:**
- Sharing the budget with another user will use a websocket to keep live updates.

## CSS Deliverable
For this deliverable I styled my existing html structure for a more refined final product
- Header, footer, and main content body
- Navigation elements - I changed the color for anchor elements.
- Responsive to window resizing - My app looks great on all window sizes and devices
- Application elements - Used good contrast and whitespace, added backgrounds for my different buckets
- Application text content - Consistent fonts
- Application images - Used images as icons for my different buckets (rent, tuition, etc.)

## React Deliverable
For this deliverable I implemented or mocked up the actual functionality of the app.
- I added functionality for the log in page
- The budget page can now take user input for the total and bucket sections
- The payment page interacts with my budget page to subtract money from a chosen bucket when a purchase is reported
- There is a mockup of the websocket portion where new purchases from any user on the budget will be reported in real time
- I bundled my app using Vite
- I included my react router and react hooks

## Service Deliverable
For this deliverable I implemented the back end endpoints for logging in and out, getting and updating budgeting info, and getting and udpdating payments
- Node.js/Express HTTP service - done!
- Static middleware for frontend - done!
- Calls to third party endpoints - done! (added a "Useless facts" section
- Backend service endpoints - Placeholders for login that stores the current user on the server. Endpoints for editing buckets and payments.
- Frontend calls service endpoints - I did this using the fetch function.

## Login/database Deliverable
For this section I implemented my mongodb database so that things were stored persistently.
- MongoDB Atlas database created - done!
- Stores data in MongoDB - done!
- User registration - Creates a new account in the database.
- Remembers existing users - done!
- Use MongoDB to store credentials - Stores both user and their data.
- Restricts functionality - You cannot leave the login page until logging in.
I turned this in and then turned websocket in before this was graded. If I need to redeploy this version please let me know.

## Websocket
For this section I implemented a websocket so that changes could be shared between users.
- Backend listens for WebSocket connection - done!
- Frontend makes WebSocket connection - done!
- Data sent over WebSocket connection - done!
- WebSocket data displayed - All payments are shared between users!
Not sure where else to put this but I turned this in before login/database was graded.

