# ArtWeb Studio Feedback System - Backend

This is the Node.js backend for the website feedback popup.

## Prerequisites
- Node.js installed
- MySQL Server installed and running

## Setup

1. **Database Setup**:
   - Open your MySQL terminal or a tool like phpMyAdmin/MySQL Workbench.
   - Run the code in `db.sql` to create the `poll_db` database and `votes` table.

2. **Install Dependencies**:
   ```bash
   cd backend
   npm install
   ```

3. **Configure Environment (Optional)**:
   - By default, the server connects to `localhost` with user `root` and no password.
   - To change this, you can create a `.env` file in the `backend` folder:
     ```env
     PORT=3000
     DB_HOST=localhost
     DB_USER=your_username
     DB_PASSWORD=your_password
     DB_NAME=poll_db
     ```

4. **Run the Server**:
   ```bash
   npm start
   ```
   The server will start at `http://localhost:3000`.

## API Endpoints

- `POST /vote`: Saves a vote. Body: `{ "answer": "yes" | "no" }`
- `GET /stats`: Returns total counts for each answer.

## Analytics
To see the results manually in MySQL, run:
```sql
SELECT answer, COUNT(*) as total_votes FROM votes GROUP BY answer;
```
