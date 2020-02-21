# piCalculator-api
API to calculate pi, and beyond.


### Stack
- ExpressJS v4.17.1
- MongoDB
- Important note: This app uses babel to transpile ES6 and later annotations into vanilla JS.

### Prerequistes for deployment (Replace what is between <>)
- Install NodeJS v13 or later.
```
brew install node or sudo apt get install node
```
- Install mongodb-community edition, follow this guide: https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/
- Login to the mongodb shell, and key in the following:

  * Create a database with your preferred name
  ```
  use DB_NAME
  ```
  * Create a pair of credentials for accessing the database
  ```
  use admin
  db.createUser({user: "<DB_USER_NAME>", pwd: "<DB_PASSWORD>", roles: [{role: "readWrite", db: "<DB_NAME>"}]})
  ``` 
- Update the .env-sample with the following
  ```
  NODE_ENV=development|production

  DB_USER=<DB_USER_NAME>
  DB_PASS=<DB_PASSWORD>
  DB_HOST=<DB_HOST>
  DB_PORT=<DB_PORT>
  DB_NAME=<DB_NAME>
  ```
- Check `package.json` to run the preferred script.

### Live Demo
- Retreive latest pi value: http://128.199.155.19:3000/pi
- Reset pi to least accurate value: http://128.199.155.19:3000/pi/reset
