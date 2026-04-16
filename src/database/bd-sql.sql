CREATE DATABASE IF NOT EXISTS jurassicpark;
USE jurassicpark;

CREATE TABLE IF NOT EXISTS `user`(
	id 			INT NOT NULL AUTO_INCREMENT,
    
    username 	VARCHAR(120) NULL,
    email 		VARCHAR(255) NOT NULL UNIQUE,
    password 	VARCHAR(120) NOT NULL,

    createdAt   DATETIME DEFAULT CURRENT_TIMESTAMP(),
    updatedAt   DATETIME DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP(),
    
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS park(
	id 			INT NOT NULL AUTO_INCREMENT,
    idUser 		INT NOT NULL UNIQUE,
    
    name 		VARCHAR(120) NOT NULL,
    rating 		INT NOT NULL DEFAULT 0,
    dinoCoins 	INT NOT NULL DEFAULT 0,
    
    createdAt   DATETIME DEFAULT CURRENT_TIMESTAMP(),
    updatedAt   DATETIME DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP(),

    PRIMARY KEY (id, idUser),
    CONSTRAINT fkParkUser 		FOREIGN KEY (idUser) REFERENCES `user`(id),
    
    CONSTRAINT chkParkRating 	CHECK(rating BETWEEN 0 AND 5),
    CONSTRAINT chkParkDinoCoins CHECK(dinoCoins > 0)
);

CREATE TABLE IF NOT EXISTS structure(
	id 				INT NOT NULL AUTO_INCREMENT,
    idPark 			INT NOT NULL,
    
    type 			INT NOT NULL,
    position_col 	INT NOT NULL,
    position_row 	INT NOT NULL,
    
    createdAt   DATETIME DEFAULT CURRENT_TIMESTAMP(),
    updatedAt   DATETIME DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP(),

    PRIMARY KEY (id, idPark),
    CONSTRAINT fkStructurePark FOREIGN KEY (idPark) REFERENCES park(id),
    
    CONSTRAINT chkStructureType CHECK(type BETWEEN 0 AND 99)
);

CREATE TABLE IF NOT EXISTS enclosure(
	id 				INT NOT NULL AUTO_INCREMENT,
    idStructure 	INT NOT NULL UNIQUE,
    
    level 			INT NOT NULL DEFAULT 1,
    durability 		INT NOT NULL DEFAULT 100,
    hp 				INT NOT NULL,
    
    createdAt   DATETIME DEFAULT CURRENT_TIMESTAMP(),
    updatedAt   DATETIME DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP(),

    PRIMARY KEY (id, idStructure),
    CONSTRAINT fkEnclosureStructure FOREIGN KEY (idStructure) REFERENCES structure(id),
    
    CONSTRAINT chkEnclosureLevel CHECK(level IN(1, 2, 3))
);

CREATE TABLE IF NOT EXISTS dinosaur(
	id INT NOT NULL,
    idEnclosure INT NOT NULL UNIQUE,
    
    species VARCHAR(120) NOT NULL,
    
    createdAt   DATETIME DEFAULT CURRENT_TIMESTAMP(),
    updatedAt   DATETIME DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP(),

    PRIMARY KEY (id, idEnclosure),
    CONSTRAINT fkDinosaurEnclosure FOREIGN KEY (idEnclosure) REFERENCES enclosure(id),
    
    CONSTRAINT chkDinosaurSpecies CHECK(species IN(
		"ceratossauro",		"tiranossauro",		"espinossauro",
        "giganotossauro",	"velociraptor",		"dilofossauro",
        "herrerassauro",	"compsognathus",	"coritossauro",
        "triceratopo",		"estegossauro",		"parassaurolofo",
        "anquilossauro",	"braquiossauro", 	"brontossauro"
	))
);