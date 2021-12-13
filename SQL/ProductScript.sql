-- POBLADO TABLA PRODUCTOS --

-- 1ro poblamos las tablas sencundarias 1:N --

INSERT INTO color (name)
VALUES 
('Silver'),
('Negro'),
('Blanco'),
('Azul'),
('Rojo');

INSERT INTO prod_category (description)
VALUES 
('Guitarra'),
('Bajo'),
('Batería'),
('Teclado'),
('Amplificador');

INSERT INTO prod_size (type, height, width, depth)
VALUES 
(1, 12, 20, 35),
(1, 15, 23, 57),
(1, 24, 23, 56),
(1, 8, 26, 37),
(1, 5, 43, 9);

-- 2do poblamos la tabla principal --

INSERT INTO product (description, brand, creation_date, active, id_colors, id_prod_category)
VALUES 
("Guitarra Fender Stratocaster, made in USA", "Fender", sysdate(), 1, 1, 1);

INSERT INTO product (description, brand, creation_date, active, id_colors, id_prod_category)
VALUES 
("Guitarra 6 cuerdas, color negra", "Gibson Les Paul", sysdate(), 1, 2, 1);

INSERT INTO product (description, brand, creation_date, active, id_colors, id_prod_category)
VALUES 
("Jaguar Mexico Doble Bobina", "Fender Blacktop Jaguar", sysdate(), 1, 2, 1);

INSERT INTO product (description, brand, creation_date, active, id_colors, id_prod_category)
VALUES 
("Bajo con Madera Pau Ferro, 4 cuerdas", "Fender Jazz Bass", sysdate(), 1, 4, 2);

-- 3ro poblamos las tablas secundarias 1:1 --

INSERT INTO prod_image (name, id_product)
VALUES 
('FenderStratocaster.webp', 1),
('EpihoneLesPaul.webp', 2),
('FenderJaguar.webp', 3),
('FenderJazzBass.webp', 4);

INSERT INTO prod_price (price, creation_date, active, id_product)
VALUES 
(79000, sysdate(), 1, 1),
(120000, sysdate(), 1, 2),
(77000, sysdate(), 1, 3),
(85000, sysdate(), 1, 4);


-- Verificando poblado --

select * from color;
select * from prod_category;
select * from prod_image;
select * from prod_price;
select * from prod_size;
select * from product;
