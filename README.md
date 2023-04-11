# todo_backend

### Development setup
> 1. Create a `.env` file from `.env.example`
> 2. Update the config in the `.env` file
> 3. Set `NODE_ENV` to `development` in the `.env.example`
```
// Install dependencies
npm install
```
```
// Start server
npm run start:dev
```

### Production setup
> 1. Create a `.env` file from `.env.example`
> 2. Update the database config in the `.env` file
```
// Install dependencies and compile product code
npm install
```
```
// Run build
npm run build
```
```
// Start server
npm run start
```

### HTTP Request foormat
```
```
// login (POST)
http://localhost:3000/auth/login
{
    "username": "usera",
    "password": "123456"
}
```
```
// auth test (GET)
http://localhost:3000/auth/test
```
```
// get current login user todo list (GET)
http://localhost:3000/todo
```
```
// Insert new to do item (POST)
http://localhost:3000/todo
{
    "title": "test123",
    "description": "test234567",
    "startTime": "2023-04-12 07:00:00"
}
```
```
// Update to do item (PUT)
http://localhost:3000/todo/:id
{
    "title": "test123",
    "description": "test234567",
    "startTime": "2023-04-12 07:00:00"
}
```
```
// Delete to do item (DELETE)
http://localhost:3000/todo/:id
```
```