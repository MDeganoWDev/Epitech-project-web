CREATE TABLE companies(
   id INT,
   name VARCHAR(50) NOT NULL,
   adress VARCHAR(50),
   PRIMARY KEY(id)
);

CREATE TABLE permission(
   id INT,
   name VARCHAR(50) NOT NULL,
   PRIMARY KEY(id)
);

CREATE TABLE contracts(
   id INT,
   name VARCHAR(50),
   PRIMARY KEY(id)
);

CREATE TABLE sex(
   id INT,
   name VARCHAR(50) NOT NULL,
   PRIMARY KEY(id)
);

CREATE TABLE advertisements(
   id INT,
   offerDate DATETIME NOT NULL,
   title VARCHAR(50) NOT NULL,
   description VARCHAR(50),
   workingTime VARCHAR(50) NOT NULL,
   wage DECIMAL(15,2) NOT NULL,
   id_1 INT NOT NULL,
   id_2 INT NOT NULL,
   PRIMARY KEY(id),
   FOREIGN KEY(id_1) REFERENCES contracts(id),
   FOREIGN KEY(id_2) REFERENCES companies(id)
);

CREATE TABLE utilisateurs(
   id INT,
   firstname VARCHAR(50) NOT NULL,
   lastname VARCHAR(50) NOT NULL,
   phone INT NOT NULL,
   email VARCHAR(50) NOT NULL,
   cv VARCHAR(50),
   id_1 INT NOT NULL,
   id_2 INT NOT NULL,
   PRIMARY KEY(id),
   FOREIGN KEY(id_1) REFERENCES sex(id),
   FOREIGN KEY(id_2) REFERENCES permission(id)
);

CREATE TABLE applications(
   id INT,
   message VARCHAR(50) NOT NULL,
   applyDate DATETIME NOT NULL,
   firstname VARCHAR(50),
   lastname VARCHAR(50),
   phone VARCHAR(50),
   email VARCHAR(50),
   cv VARCHAR(50),
   id_1 INT,
   id_2 INT NOT NULL,
   PRIMARY KEY(id),
   FOREIGN KEY(id_1) REFERENCES utilisateurs(id),
   FOREIGN KEY(id_2) REFERENCES advertisements(id)
);

CREATE TABLE work(
   id INT,
   id_1 INT,
   PRIMARY KEY(id, id_1),
   FOREIGN KEY(id) REFERENCES companies(id),
   FOREIGN KEY(id_1) REFERENCES utilisateurs(id)
);
