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
    heightInMeters      DECIMAL(10, 3) NOT NULL,
    weightInKilograms   DECIMAL(10, 3) NOT NULL,
    diet                VARCHAR(60) NOT NULL,
    aggressiveness      FLOAT NOT NULL,
    hatchCost           INT NOT NULL,
    hatchTimeInSeconds  INT NOT NULL,
    hatchSuccessRatio   FLOAT NOT NULL,

    createdAt   DATETIME DEFAULT CURRENT_TIMESTAMP(),
    updatedAt   DATETIME DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP(),

    PRIMARY KEY (id),

    -- | CHECK Constraints | --
	CONSTRAINT chkSpeciesDiet CHECK(diet IN('herbívoro', 'carnívoro', 'onívoro')),
    CONSTRAINT chkSpeciesHeightAndWeight CHECK(heightInMeters > 0 AND weightInKilograms > 0),
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
    heightInMeters, 
    weightInKilograms, 
    diet, 
    aggressiveness, 
    hatchCost, 
    hatchTimeInSeconds, 
    hatchSuccessRatio
) VALUES -- name		description                                                                                                             temporalRange           locomotionType    heightInMeters  weightInKilograms    diet        aggr    hchCost  hchTime  hchSuccess 
    ('compsognathus', 	'Um gênero de pequenos dinossauros terópodes carnívoros bípedes do Jurássico Superior.', 								'Jurássico Superior', 	'Bípede', 				0.260, 		3.000, 			'carnívoro', 	0.2, 	50, 	30, 	0.9),
    ('tiranossauro', 	'Um gênero de grandes dinossauros terópodes do Cretáceo Superior, amplamente conhecido como T. rex.', 					'Cretáceo Superior', 	'Bípede', 				4.000, 		8000.000, 		'carnívoro', 	1.0, 	1000, 	600, 	0.5),
    ('espinossauro', 	'Um gênero de dinossauro espinossaurídeo que viveu no que hoje é o Norte da África durante o Cretáceo Superior.', 		'Cretáceo Superior', 	'Bípede', 				4.500, 		14000.000, 		'carnívoro', 	1.0, 	1200, 	600, 	0.4),
    ('braquiossauro', 	'Um gênero de dinossauro saurópode que viveu na América do Norte durante o Jurássico Superior.', 						'Jurássico Superior', 	'Quadrúpede', 			12.000, 	40000.000, 		'herbívoro', 	0.2, 	950, 	720, 	0.5),
    ('coritossauro', 	'Um gênero de dinossauro hadrossaurídeo do período Cretáceo Superior, conhecido por sua crista distinta.', 				'Cretáceo Superior', 	'Bípede/Quadrúpede', 	2.500, 		3000.000, 		'herbívoro', 	0.4, 	150, 	180, 	0.8),
    ('parassaurolofo', 	'Um dinossauro ornitópode herbívoro que viveu na América do Norte durante o Cretáceo Superior.', 						'Cretáceo Superior', 	'Bípede/Quadrúpede', 	3.000, 		2500.000, 		'herbívoro', 	0.4, 	150, 	180, 	0.8),
    ('triceratops', 	'Um gênero de dinossauro ceratopsídeo herbívoro que surgiu durante o Cretáceo Superior.', 								'Cretáceo Superior', 	'Quadrúpede', 			3.000, 		9000.000, 		'herbívoro', 	0.6, 	250, 	300, 	0.6),
    ('velociraptor', 	'Um gênero de dinossauro terópode dromeossaurídeo que viveu durante a última parte do Cretáceo.', 						'Cretáceo Superior', 	'Bípede', 				0.500, 		15.000, 		'carnívoro', 	1.0, 	100, 	90, 	0.8),
    ('dilofossauro', 	'Um gênero de dinossauros terópodes que viveu na América do Norte durante o Jurássico Inferior.', 						'Jurássico Inferior', 	'Bípede', 				2.000, 		400.000, 		'carnívoro', 	0.6, 	100, 	90, 	0.8),
    ('anquilossauro', 	'Um gênero de dinossauro blindado do período Cretáceo Superior, conhecido por sua cauda pesada em forma de clava.', 	'Cretáceo Superior', 	'Quadrúpede', 			1.700, 		6000.000, 		'herbívoro', 	0.8, 	300, 	300, 	0.6),
    ('ceratossauro', 	'Um dinossauro terópode predador do período Jurássico Superior, possuindo um chifre proeminente.', 						'Jurássico Superior', 	'Bípede', 				2.000, 		980.000, 		'carnívoro', 	0.8, 	250, 	300, 	0.8),
    ('estegossauro', 	'Um gênero de dinossauro herbívoro quadrúpede e blindado do período Jurássico Superior.', 								'Jurássico Superior', 	'Quadrúpede', 			2.700, 		5300.000, 		'herbívoro', 	0.6, 	250, 	300, 	0.6);