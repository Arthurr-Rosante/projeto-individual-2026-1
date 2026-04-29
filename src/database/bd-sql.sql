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
    idUser 		INT NOT NULL UNIQUE,
    
    name 		VARCHAR(120) NOT NULL,
    rating 		INT NOT NULL DEFAULT 0,
    dinoCoins 	INT NOT NULL DEFAULT 0,
    
    createdAt   DATETIME DEFAULT CURRENT_TIMESTAMP(),
    updatedAt   DATETIME DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP(),

    PRIMARY KEY (idUser),
    CONSTRAINT fkParkUser FOREIGN KEY (idUser) REFERENCES `user`(id) ON DELETE CASCADE,
    
    -- | CHECK Constraints | --
    CONSTRAINT chkParkRating 	CHECK(rating BETWEEN 0 AND 5),
    CONSTRAINT chkParkDinoCoins CHECK(dinoCoins >= 0)
);

CREATE TABLE IF NOT EXISTS building(
	id 				INT NOT NULL AUTO_INCREMENT,
    
    name 			VARCHAR(120) NOT NULL,
    translatedName 	VARCHAR(120) NOT NULL,
    description 	VARCHAR(255) NOT NULL,
    purpose 		VARCHAR(120) NOT NULL,
    category        VARCHAR(45)  NOT NULL,
	baseCost 		INTEGER NOT NULL DEFAULT 0,
    maxUnits 		INTEGER NULL,
    removable 		TINYINT NOT NULL DEFAULT 1,
    upgradeable 	TINYINT NOT NULL DEFAULT 0,
    
    createdAt   DATETIME DEFAULT CURRENT_TIMESTAMP(),
    updatedAt   DATETIME DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP(),	
    
    PRIMARY KEY (id),
    
	-- | CHECK Constraints | --
    CONSTRAINT chkBuildingCategory CHECK(category IN('terrain', 'path', 'enclosure', 'building')),
    CONSTRAINT chkBuildingBaseCost CHECK(baseCost >= 0)
);

CREATE TABLE IF NOT EXISTS events(
	id INT NOT NULL AUTO_INCREMENT,
    
	name 			VARCHAR(120) NOT NULL,
    translatedName 	VARCHAR(120) NOT NULL,
	description 	VARCHAR(255) NOT NULL,
	consequences 	VARCHAR(255) NOT NULL,
    spawnChance 	FLOAT NOT NULL,
    
	createdAt   DATETIME DEFAULT CURRENT_TIMESTAMP(),
    updatedAt   DATETIME DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP(),	
    
    PRIMARY KEY (id),
    
	-- | CHECK Constraints | --
    CONSTRAINT chkEventsSpawnChance CHECK(spawnChance BETWEEN 0 AND 1)
);

CREATE TABLE IF NOT EXISTS species(
    id                  INT NOT NULL AUTO_INCREMENT,
    id_ancestor			INT NULL,

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
    hatchSuccessRate    FLOAT NOT NULL,

    createdAt   DATETIME DEFAULT CURRENT_TIMESTAMP(),
    updatedAt   DATETIME DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP(),

    PRIMARY KEY (id),
    CONSTRAINT fkSpeciesSpecies FOREIGN KEY (id_ancestor) REFERENCES species(id),

    -- | CHECK Constraints | --
	CONSTRAINT chkSpeciesDiet CHECK(diet IN('herbívoro', 'carnívoro', 'onívoro')),
    CONSTRAINT chkSpeciesHeightAndWeight CHECK(heightInMeters > 0 AND weightInKilograms > 0),
    CONSTRAINT chkSpeciesAggressiveness CHECK(aggressiveness BETWEEN 0 AND 1),
    CONSTRAINT chkSpeciesHatchCostAndTime CHECK(hatchCost >= 0 AND hatchTimeInSeconds >= 0),
    CONSTRAINT chkSpecieshatchSuccessRate CHECK(hatchSuccessRate BETWEEN 0 AND 1)

);

CREATE TABLE IF NOT EXISTS tile(
    idPark 			INT NOT NULL,
    position_col 	INT NOT NULL,
    position_row 	INT NOT NULL,

	idBuilding		INT NOT NULL,
    durability 	    INT NULL,
    hp 			    INT NULL,
    
    createdAt   DATETIME DEFAULT CURRENT_TIMESTAMP(),
    updatedAt   DATETIME DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP(),

    PRIMARY KEY (idPark, position_col, position_row),
    CONSTRAINT fkTilePark 		FOREIGN KEY (idPark) REFERENCES park(idUser) ON DELETE CASCADE,
    CONSTRAINT fkTileBuilding 	FOREIGN KEY (idBuilding) REFERENCES building(id),

    -- | CHECK Constraints | --
    CONSTRAINT chkTileDurability CHECK(durability >= 0),
    CONSTRAINT chkTileHp CHECK(hp >= 0)
);

CREATE TABLE IF NOT EXISTS dinosaur(
    idPark 			INT NOT NULL,
    tile_col 	    INT NOT NULL,
    tile_row 	    INT NOT NULL,

    idSpecies       INT NOT NULL, 
    
    createdAt   DATETIME DEFAULT CURRENT_TIMESTAMP(),
    updatedAt   DATETIME DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP(),

    PRIMARY KEY (idPark, tile_col, tile_row),
    CONSTRAINT fkDinosaurTile FOREIGN KEY (idPark, tile_col, tile_row) 
        REFERENCES tile(idPark, position_col, position_row) ON DELETE CASCADE,
    CONSTRAINT fkDinosaurSpecies    FOREIGN KEY (idSpecies)     REFERENCES species(id)
);

-- | POPULANDO TABELA 'species' | --
INSERT INTO species 
    (name, description, temporalRange, locomotionType, heightInMeters, weightInKilograms, diet, aggressiveness, hatchCost, hatchTimeInSeconds, hatchSuccessRate) 
VALUES 
    (
        'compsognathus', 
        'Um gênero de pequenos dinossauros terópodes carnívoros bípedes do Jurássico Superior.', 
        'Jurássico Superior', 'Bípede', 0.260, 3.000, 
        'carnívoro', 0.2, 50, 30, 0.9
    ),
    (
        'tiranossauro', 
        'Um gênero de grandes dinossauros terópodes do Cretáceo Superior, amplamente conhecido como T. rex.', 
        'Cretáceo Superior', 'Bípede', 4.000, 8000.000, 
        'carnívoro', 1.0, 1000, 600, 0.5
    ),
    (
        'espinossauro', 
        'Um gênero de dinossauro espinossaurídeo que viveu no que hoje é o Norte da África durante o Cretáceo Superior.', 
        'Cretáceo Superior', 'Bípede', 4.500, 14000.000, 
        'carnívoro', 1.0, 1200, 600, 0.4
    ),
    (
        'braquiossauro', 
        'Um gênero de dinossauro saurópode que viveu na América do Norte durante o Jurássico Superior.', 
        'Jurássico Superior', 'Quadrúpede', 12.000, 40000.000, 
        'herbívoro', 0.2, 950, 720, 0.5
    ),
    (
        'coritossauro', 
        'Um gênero de dinossauro hadrossaurídeo do período Cretáceo Superior, conhecido por sua crista distinta.', 
        'Cretáceo Superior', 'Bípede/Quadrúpede', 2.500, 3000.000, 
        'herbívoro', 0.4, 150, 180, 0.8
    ),
    (
        'parassaurolofo', 
        'Um dinossauro ornitópode herbívoro que viveu na América do Norte durante o Cretáceo Superior.', 
        'Cretáceo Superior', 'Bípede/Quadrúpede', 3.000, 2500.000, 
        'herbívoro', 0.4, 150, 180, 0.8
    ),
    (
        'triceratops', 
        'Um gênero de dinossauro ceratopsídeo herbívoro que surgiu durante o Cretáceo Superior.', 
        'Cretáceo Superior', 'Quadrúpede', 3.000, 9000.000, 
        'herbívoro', 0.6, 250, 300, 0.6
    ),
    (
        'velociraptor', 
        'Um gênero de dinossauro terópode dromeossaurídeo que viveu durante a última parte do Cretáceo.', 
        'Cretáceo Superior', 'Bípede', 0.500, 15.000, 
        'carnívoro', 1.0, 100, 90, 0.8
    ),
    (
        'dilofossauro', 
        'Um gênero de dinossauros terópodes que viveu na América do Norte durante o Jurássico Inferior.', 
        'Jurássico Inferior', 'Bípede', 2.000, 400.000, 
        'carnívoro', 0.6, 100, 90, 0.8
    ),
    (
        'anquilossauro', 
        'Um gênero de dinossauro blindado do período Cretáceo Superior, conhecido por sua cauda pesada em forma de clava.', 
        'Cretáceo Superior', 'Quadrúpede', 1.700, 6000.000, 
        'herbívoro', 0.8, 300, 300, 0.6
    ),
    (
        'ceratossauro', 
        'Um dinossauro terópode predador do período Jurássico Superior, possuindo um chifre proeminente.', 
        'Jurássico Superior', 'Bípede', 2.000, 980.000, 
        'carnívoro', 0.8, 250, 300, 0.8
    ),
    (
        'estegossauro', 
        'Um gênero de dinossauro herbívoro quadrúpede e blindado do período Jurássico Superior.', 
        'Jurássico Superior', 'Quadrúpede', 2.700, 5300.000, 
        'herbívoro', 0.6, 250, 300, 0.6
    );

-- | POPULANDO TABELA 'events' | --
INSERT INTO events (name, translatedName, description, consequences, spawnChance) 
VALUES 
    (
        'sabotage', 
        'Sabotagem', 
        'Todo cuidado é pouco. Um funcionário do seu Parque foi mandado embora e decidiu se vingar - ele desativou todos os sistemas de segurança do Parque!', 
        'A durabilidade de todos os Cercados do seu Parque caem em 50%', 
        0.2
    ),
    (
        'pouring-rain', 
        'Chuva Torrencial', 
        'O Clima tropical da Costa Rica é extremamente instável. Sob uma tempestade dessas proporções, as coisas no Parque vão ter de esperar.', 
        'Enquanto a chuva durar o atributo de Avaliação do seu Parque cai em 1 Estrela. Além disso, o tempo de incubação de todas as espécies aumenta em 33%', 
        0.5
    );

-- | POPULANDO TABELA 'building' | --
INSERT INTO building (name, translatedName, description, purpose, category, baseCost, maxUnits, removable, upgradeable) 
VALUES
	-- | TERRENO | --
	(
		'terrain-grass',
        'Terreno Grama', 
        'Toda a natureza intocada da Isla Nublar faz com que seus visitantes sintam como se tivessem retornado a 65 milhões de anos atrás.', 
        'Apenas para a estética.',
        'terrain', 
        0, null, 1, 0
    ),
	(
		'terrain-trees',
        'Terreno Árvores', 
        'Toda a natureza intocada da Isla Nublar faz com que seus visitantes sintam como se tivessem retornado a 65 milhões de anos atrás.', 
        'Apenas para a estética.',
        'terrain',
        0, null, 1, 0
    ),
	(
		'terrain-dirt',
        'Terreno Terra', 
        'Toda a natureza intocada da Isla Nublar faz com que seus visitantes sintam como se tivessem retornado a 65 milhões de anos atrás.', 
        'Apenas para a estética.',
        'terrain',
        0, null, 1, 0
    ),
	(
		'terrain-pond',
        'Terreno Lago', 
        'Toda a natureza intocada da Isla Nublar faz com que seus visitantes sintam como se tivessem retornado a 65 milhões de anos atrás.', 
        'Apenas para a estética.',
        'terrain',
        0, null, 1, 0
    ),
    
	-- | CAMINHO | --
	(
		'path',
        'Caminho Padrão', 
        'Por mais que caminhar pela mata ajudaria no aspecto da imersão, seus visitantes certamente ficariam mais confortáveis se tivessem caminhos pavimentados para andar pelo Parque.', 
        'Apenas para a estética.',
        'path',
        50, null, 1, 0
    ),
	(
		'path-l',
        'Caminho L', 
        'Por mais que caminhar pela mata ajudaria no aspecto da imersão, seus visitantes certamente ficariam mais confortáveis se tivessem caminhos pavimentados para andar pelo Parque.', 
        'Apenas para a estética.',
        'path',
        50, null, 1, 0
    ),
	(
		'path-t',
        'Caminho T', 
        'Por mais que caminhar pela mata ajudaria no aspecto da imersão, seus visitantes certamente ficariam mais confortáveis se tivessem caminhos pavimentados para andar pelo Parque.', 
        'Apenas para a estética.',
        'path',
        50, null, 1, 0
    ),
	(
		'path-cross',
        'Caminho Encruzilhada', 
        'Por mais que caminhar pela mata ajudaria no aspecto da imersão, seus visitantes certamente ficariam mais confortáveis se tivessem caminhos pavimentados para andar pelo Parque.', 
        'Apenas para a estética.',
        'path',
        50, null, 1, 0
    ),
	-- | CERCADOS | --
	(
		'enclosure-1',
        'Cercado Nível 1', 
        'Os cercados são imprescindíveis para a existência do seu Parque. Em última instância, eles são a última barreira entre nós e essas criaturas incríveis. Pelo menos, até que uma tempestade atinja a ilha...', 
        'Permite comportar até 1 espécie de dinossauro por vez. Pode receber upgrades.',
        'enclosure',
        100, null, 1, 1
    ),
	(
		'enclosure-2',
        'Cercado Nível 2', 
        'Os cercados são imprescindíveis para a existência do seu Parque. Em última instância, eles são a última barreira entre nós e essas criaturas incríveis. Pelo menos, até que uma tempestade atinja a ilha...', 
        'Permite comportar até 1 espécie de dinossauro por vez. Pode receber upgrades.',
        'enclosure',
        250, null, 1, 1
    ),
	(
		'enclosure-3',
        'Cercado Nível 3', 
        'Os cercados são imprescindíveis para a existência do seu Parque. Em última instância, eles são a última barreira entre nós e essas criaturas incríveis. Pelo menos, até que uma tempestade atinja a ilha...', 
        'Permite comportar até 1 espécie de dinossauro por vez. Pode receber upgrades.',
        'enclosure',
        500, null, 1, 0
    ),
	-- | CONSTRUÇÕES | --
	(
		'entrance',
        'Portão de Entrada', 
        'Este portão de proporções colossais é como um bastião que guarda a entrada do seu Parque. Não há nada dentro da ilha (humano ou dinossauro) que não tenha passado por ele.', 
        'Permite trocar o nome do Parque.',
        'building',
        0, 1, 0, 0
    ),
	(
		'visitor-center',
        'Centro de Visitantes', 
        'O coração de todo parque. O Centro de Visitantes não é apenas um grande hall pelo qual seus visitantes passam ao chegar no Parque, é um verdadeiro QG onde a Staff do Parque monitora tudo o que acontece na ilha.', 
        'Permite visualizar a Avaliação do seu Parque e todas as Espécies nele.',
        'building',
        0, 1, 0, 0
    ),
	(
		'hatchery',
        'Laboratório de Incubação', 
        'Trazer um dinossauro de volta à vida não é uma tarefa fácil. Para realizar tal façanha diariamente, seus cientistas precisarão de um lugar adequado para trabalhar.', 
        'Permite incubar até 1 espécie de dinossauro por vez.',
        'building',
        250, null, 1, 0
    );
    