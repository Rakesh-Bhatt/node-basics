# This Project is for Learning Node.js Basics
## It includes the following features:

### - Uses nodemon to manage the live changes without restarting the server manually
### - RESTful API Endpoints using Express.js
### - Complete CRUD operations for a "users" resource
### - Use of Express Router for modular route handling
### - Use of Middleware for logging and error handling
### - Use of validation for incoming request data on API using Joi library
### - User Authentication (Signup and Login) using JWT and bcryptjs
### - In-memory User Data Storage for File Uploads
### - File Upload Handling using multer


### connect to postgresql database
    Sign-up or create user in database

    ```
    psql -h localhost -U postgres
    password:

    connect to database
    \c node-basics


    list all tables
    \dt


    verify signed up user
    SELECT * FROM "Users";

    output

    id |  name  |      email      | password |           createdAt           |           updatedAt
    ----+--------+-----------------+----------+-------------------------------+-------------------------------
    1 | Rakesh | rakesh@test.com | 123456   | 2025-12-18 22:58:16.059+05:45 | 2025-12-18 22:58:16.059+05:45
    ```

    POST localhost:3003/api/users/signup
    body -> raw json
        {
        "name": "Rakesh",
        "email": "rakesh@test.com",
        "country": "Nepal",
        "password": "123456"
        }


confirm the value using node REPL

    User.findAll({ raw: true }).then(users => console.log(users));

    -> [
            {
                id: 1,
                name: 'Rakesh',
                email: 'rakesh@test.com',
                password: '123456',
                createdAt: 2025-12-18T17:13:16.059Z,
                updatedAt: 2025-12-18T17:13:16.059Z
            }
        ]
