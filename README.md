# GitHub-Job Project

## Description

This project is developed with TypeScript Create-React-App, CSS-in-JS Emotion for styling, React Context for Auth, and additional library such as react-hot-toast and js-cookie for supplementary.

This is the React client-side repo of the GitHub-Job project. Pages available:

- `/` or `/login` to login with provided credential. Getting JWT token and save it in cookies (expiration set 2 hours, no refresh token yet).
- `/job` after login to view job list with pagination (infinite scroll) and to search using provided fields/params.
- `/job/:id` after clicking on a job card, viewing the job's details.
  User can also logout after login.

## How to Run

1. Create `.env` from given `.env.example` to connect with running backend server repo.
2. Execute provided `database.sql` query for backend setup and credential examples.
3. Run following commands:

```bash
# install dependencies
npm i

# run server (at localhost:3000)
npm start
```
