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
### Html Pages:
- I created 3 different pages for my project. One for the login, one to show current sections of your budget and keep track of your total, and one to add the ability to report purchases.
### Links:
- I linked the login page to the buckets page, and then a button on the buckets page that says "add purchase" connects to the purchases page.
### Text:
- 
### Images:
### DB/login:
### WebSocket:


