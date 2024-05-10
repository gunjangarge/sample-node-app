# Create database
## Set the following env variables

```
DB_SERVER = <db server name>
DB_USER = <db user>
DB_PASSWORD = <db user password>
DB_NAME = 'tododb'
```

## Commands
```
mysql -h DB_SERVER -u DB_USER -pDB_PASSWORD
mysql> create database tododb;
mysql> create table todos (id int not null, todo varchar(255) not null);
mysql> insert into todos values(1,"do the shopping");
mysql> insert into todos values(2,"do the laundry");
mysql> insert into todos values(2,"mow the lawn");
```

Turn require_secure_transport to OFF in case below error is seen in application node logs
```
Error: ER_SECURE_TRANSPORT_REQUIRED: Connections using insecure transport are prohibited while --require_secure_transport=ON
```
