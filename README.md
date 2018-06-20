# Project name : Ec-Note-RestApi

# Description 

Ec-Note-RestApi is a Rest Api Backend Server for [Ec-Note](https://github.com/aadityanj/ec-note) web application designed for taking notes, maintaining the revisions, restoring the revisions.  It allows users to create, edit, delete, restore notes. Each note is a plain text file. 

# Installation & Server Setup in Linux
- Install Latest LTS version of [Node JS](https://nodejs.org/en/) globally.  
- Install [PostgreSQL](https://www.postgresql.org/download/) database in your server 
 - create a database named `ec_note` in your postgreSQL server.
- Install [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
- To download the project, follow the below instructions
  - execute this below commands one by one in your teminal 
    ```
      $ git clone https://github.com/aadityanj/ec-note-restapi
      $ cd ec-note-restapi
      $ npm install
    ```
- Configure the database for your project
  - Open the config directory in your project files and open database.json with any notepad editor. 
  - The config file should be like the below structure
   ```
   {
        "development": {
            "username": "postgres",
            "password": null,
            "database": "ec_note",
            "host": "localhost",
            "dialect": "postgres",
            "operatorsAliases": false
        },
        "production": {
            "username": "postgres",
            "password": null,
            "database": "ec_note",
            "host": "localhost",
            "dialect": "postgres",
            "operatorsAliases": false
        },
        "test": {
            "username": "postgres",
            "password": null,
            "database": "ec_note",
            "host": "localhost",
            "dialect": "postgres",
            "operatorsAliases": false
        }
    }
   ``` 
  - Change your postgreSQL server credentials accordingly to that config file and save it.  
  - Execute the below commands to complete the db setup for your projects
    ```
       $ node_modules/.bin/sequelize init
    ```
- # To run the project
  - Change the environment variable from one of this (development, production, test)
  - execute any of the below commands to change the environment
   ```
    NODE_ENV = production
    NODE_ENV = development
    NODE_ENV = test
   ```
  - run the project
   ```
    $ cd ec-note-restapi
    $ npm start
   ```
- To change the port number
    - Open the config directory in your project files and open config.json with any notepad editor.
    - change your port number in that file 
- # Deployment
  - Install [PM2](http://pm2.keymetrics.io/) process manager in your server globally. 
  - Execute the below commands to up the server
    ```
      $ cd ec-note-restapi
      $ pm2 start app.js  
    ```

# You're done!

# Possible Improvements
 - Note storage optimization
 - Adding more error handlers


