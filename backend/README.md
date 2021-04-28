# gateway-manager

### Create DB and user and assign user as admin to this db

- create database musala;

- create user 'musalauser'@'%' identified by '12345';

- grant all on musala.* to 'musalauser'@'%';

Get swagger file check to see all apis provivded

- http://localhost:8080/swagger-ui.html