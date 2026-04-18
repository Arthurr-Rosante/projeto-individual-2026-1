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
    
    -- | CHECK Constraints | --
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
    
    -- | CHECK Constraints | --
    CONSTRAINT chkStructureType CHECK(type BETWEEN 0 AND 99)
);

CREATE TABLE IF NOT EXISTS enclosure(
	id 			INT NOT NULL AUTO_INCREMENT,
    idStructure INT NOT NULL UNIQUE,
    
    level 		INT NOT NULL DEFAULT 1,
    durability 	INT NOT NULL DEFAULT 100,
    hp 			INT NOT NULL,
    
    createdAt   DATETIME DEFAULT CURRENT_TIMESTAMP(),
    updatedAt   DATETIME DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP(),

    PRIMARY KEY (id, idStructure),
    CONSTRAINT fkEnclosureStructure FOREIGN KEY (idStructure) REFERENCES structure(id),
    
    -- | CHECK Constraints | --
    CONSTRAINT chkEnclosureLevel CHECK(level IN(1, 2, 3))
);

CREATE TABLE IF NOT EXISTS dinosaur(
	id          INT NOT NULL AUTO_INCREMENT,
    idEnclosure INT NOT NULL UNIQUE,
    idSpecies   INT NOT NULL, 
    
    createdAt   DATETIME DEFAULT CURRENT_TIMESTAMP(),
    updatedAt   DATETIME DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP(),

    PRIMARY KEY (id, idEnclosure),
    CONSTRAINT fkDinosaurEnclosure FOREIGN KEY (idEnclosure) REFERENCES enclosure(id),
    CONSTRAINT fkDinosaurSpecies   FOREIGN KEY (idSpecies)   REFERENCES species(id)
);

CREATE TABLE IF NOT EXISTS species(
    id                  INT NOT NULL AUTO_INCREMENT,

    name                VARCHAR(120) NOT NULL,
    description         VARCHAR(255) NOT NULL,
    period              VARCHAR(60) NOT NULL,
    height              DECIMAL(10, 3) NOT NULL,
    weight              DECIMAL (10, 3) NOT NULL,
    diet                VARCHAR(60) NOT NULL,
    aggressiveness      INTEGER NOT NULL,
    hatchCost           INTEGER NOT NULL,
    hatchTimeInSeconds  INTEGER NOT NULL,
    hatchSuccessRatio   INTEGER NOT NULL,

    createdAt   DATETIME DEFAULT CURRENT_TIMESTAMP(),
    updatedAt   DATETIME DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP(),

    PRIMARY KEY (id),

    -- | CHECK Constraints | --
    CONSTRAINT chkSpeciesPeriod CHECK(period IN('cretaceous', 'jurassic', 'triassic')),
    CONSTRAINT chkSpeciesHeightAndWeight CHECK(height > 0 AND weight > 0),
    CONSTRAINT chkSpeciesAggressiveness CHECK(aggressiveness BETWEEN 0 AND 1),
    CONSTRAINT chkSpeciesHatchCostAndTime CHECK(hatchCost > 0 AND hatchTimeInSeconds > 0),
    CONSTRAINT chkSpeciesHatchSuccessRatio CHECK(hatchSuccessRatio BETWEEN 0 AND 1)

);