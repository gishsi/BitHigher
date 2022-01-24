# BitHigher
## Brief
BitHigher is an Icy Tower inspired game where your goal is to survive as
long as possible by jumping higher and higher. I have not followed any
tutorial for this project from beginning to end, however I have used the
resources listed in the credits sections for certain parts of it.

This is a university project. The assignment was to create an HTML5Canvas game with persistent data storage.
This project follow minimal security solutions (little sanitization, basic redirection and authenticaion), so attacking it is quite trivial. I did not aim this website to be secure.
## Setup
To setup BitHigher create a PHP file with a PDO connection, then make sure to set a correct path in the get_db_handle_path.php.

Setup the database with the following command
```
CREATE TABLE users( name varchar(20) primary key,
              score int default 0,
              difficulty varchar(11) default 'easy', 
              hero varchar(11) default 'goose'
              );
```
Remeber to change the path in the get_db_handle_path file in the api folder to match your own PDO connection file.

## Technology Stack
- JavaScript
- HTML5Canvas, HTML, CSS
- PHP
- PostgreSQL
## More information
I have used plenty of resources while making this project, and some code I cannot take the credit for. Those resources I have listed in about.html.
