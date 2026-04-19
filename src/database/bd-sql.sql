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

CREATE TABLE IF NOT EXISTS species(
    id                  INT NOT NULL AUTO_INCREMENT,

    name                VARCHAR(120) NOT NULL,
    description         VARCHAR(255) NOT NULL,
    temporalRange       VARCHAR(60) NOT NULL,
    locomotionType		VARCHAR(60) NOT NULL,
    height              DECIMAL(10, 3) NOT NULL,
    weight              DECIMAL(10, 3) NOT NULL,
    diet                VARCHAR(60) NOT NULL,
    aggressiveness      INTEGER NOT NULL,
    hatchCost           INTEGER NOT NULL,
    hatchTimeInSeconds  INTEGER NOT NULL,
    hatchSuccessRatio   INTEGER NOT NULL,

    createdAt   DATETIME DEFAULT CURRENT_TIMESTAMP(),
    updatedAt   DATETIME DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP(),

    PRIMARY KEY (id),

    -- | CHECK Constraints | --
	CONSTRAINT chkSpeciesDiet CHECK(diet IN('herbívoro', 'carnívoro', 'onívoro')),
    CONSTRAINT chkSpeciesHeightAndWeight CHECK(height > 0 AND weight > 0),
    CONSTRAINT chkSpeciesAggressiveness CHECK(aggressiveness BETWEEN 0 AND 1),
    CONSTRAINT chkSpeciesHatchCostAndTime CHECK(hatchCost > 0 AND hatchTimeInSeconds > 0),
    CONSTRAINT chkSpeciesHatchSuccessRatio CHECK(hatchSuccessRatio BETWEEN 0 AND 1)

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

-- | POPULANDO TABELA 'species' | --

INSERT INTO species (
    name, 
    description, 
    temporalRange, 
    locomotionType, 
    height, 
    weight, 
    diet, 
    aggressiveness, 
    hatchCost, 
    hatchTimeInSeconds, 
    hatchSuccessRatio
) VALUES -- name		description                                                                                                             temporalRange           locomotionType          height(m)   weight(kg)  diet        aggr   hchCost hchTime hchSuccess 
    ('Compsognathus', 	'Um gênero de pequenos dinossauros terópodes carnívoros bípedes do Jurássico Superior.', 								'Jurássico Superior', 	'Bípede', 				0.260, 		3.000, 		'carnívoro', 	1, 	500, 	30, 	1),
    ('Tiranossauro', 	'Um gênero de grandes dinossauros terópodes do Cretáceo Superior, amplamente conhecido como T. rex.', 					'Cretáceo Superior', 	'Bípede', 				4.000, 		8000.000, 	'carnívoro', 	1, 	10000, 	600, 	1),
    ('Espinossauro', 	'Um gênero de dinossauro espinossaurídeo que viveu no que hoje é o Norte da África durante o Cretáceo Superior.', 		'Cretáceo Superior', 	'Bípede', 				4.500, 		14000.000, 	'carnívoro', 	1, 	12000, 	600, 	1),
    ('Braquiossauro', 	'Um gênero de dinossauro saurópode que viveu na América do Norte durante o Jurássico Superior.', 						'Jurássico Superior', 	'Quadrúpede', 			12.000, 	40000.000, 	'herbívoro', 	0, 	8000, 	720, 	1),
    ('Coritossauro', 	'Um gênero de dinossauro hadrossaurídeo do período Cretáceo Superior, conhecido por sua crista distinta.', 				'Cretáceo Superior', 	'Bípede/Quadrúpede', 	2.500, 		3000.000, 	'herbívoro', 	0, 	3000, 	180, 	1),
    ('Parassaurolofo', 	'Um dinossauro ornitópode herbívoro que viveu na América do Norte durante o Cretáceo Superior.', 						'Cretáceo Superior', 	'Bípede/Quadrúpede', 	3.000, 		2500.000, 	'herbívoro', 	0, 	3500, 	180, 	1),
    ('Triceratops', 	'Um gênero de dinossauro ceratopsídeo herbívoro que surgiu durante o Cretáceo Superior.', 								'Cretáceo Superior', 	'Quadrúpede', 			3.000, 		9000.000, 	'herbívoro', 	0, 	5000, 	300, 	1),
    ('Velociraptor', 	'Um gênero de dinossauro terópode dromeossaurídeo que viveu durante a última parte do Cretáceo.', 						'Cretáceo Superior', 	'Bípede', 				0.500, 		15.000, 	'carnívoro', 	1, 	2000, 	90, 	1),
    ('Dilofossauro', 	'Um gênero de dinossauros terópodes que viveu na América do Norte durante o Jurássico Inferior.', 						'Jurássico Inferior', 	'Bípede', 				2.000, 		400.000, 	'carnívoro', 	1, 	2500, 	90, 	1),
    ('Anquilossauro', 	'Um gênero de dinossauro blindado do período Cretáceo Superior, conhecido por sua cauda pesada em forma de clava.', 	'Cretáceo Superior', 	'Quadrúpede', 			1.700, 		6000.000, 	'herbívoro', 	0, 	4500, 	300, 	1),
    ('Ceratossauro', 	'Um dinossauro terópode predador do período Jurássico Superior, possuindo um chifre proeminente.', 						'Jurássico Superior', 	'Bípede', 				2.000, 		980.000, 	'carnívoro', 	1, 	3000, 	300, 	1),
    ('Estegossauro', 	'Um gênero de dinossauro herbívoro quadrúpede e blindado do período Jurássico Superior.', 								'Jurássico Superior', 	'Quadrúpede', 			2.700, 		5300.000, 	'herbívoro', 	0, 	4000, 	300, 	1);
    
