insert into user_category
            (id_user_category,name)
            values
            (1, "user"),
            (2, "admin");

            insert into user_status
            (id_user_status,type)
            values
            (1, "Active"),
            (2, "Inactive");

SELECT * FROM drmusic.user;
INSERT INTO user (first_name, last_name, email, password, phone_number, address, creation_date, last_login, id_user_category, id_user_status,alt_phone_numnber, avatar)
VALUES ("Juan","Perez","juan@hotmail.com","password","1234","Calle falsa 1234", null,null,1,1,"123455","1.jpeg");
INSERT INTO user (first_name, last_name, email, password, phone_number, address, creation_date, last_login, id_user_category, id_user_status,alt_phone_numnber, avatar)
VALUES ("Jorge","Gonzalez","jorge@hotmail.com","password","1234","Calle falsa 1234", null,null,1,1,"123455","2.jpeg");
INSERT INTO user (first_name, last_name, email, password, phone_number, address, creation_date, last_login, id_user_category, id_user_status,alt_phone_numnber, avatar)
VALUES ("Pedro","López","pedro@hotmail.com","password","1234","Calle falsa 1234", null,null,1,1,"123455","3.jpeg");
INSERT INTO user (first_name, last_name, email, password, phone_number, address, creation_date, last_login, id_user_category, id_user_status,alt_phone_numnber, avatar)
VALUES ("Administrador","Administrador","admin@drmusic.om","admin","1234","Calle falsa 1234", null,null,2,1,"123455","default.png");