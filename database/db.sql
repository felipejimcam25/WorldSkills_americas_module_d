-- MySQL dump 10.13  Distrib 8.0.43, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: module_d
-- ------------------------------------------------------
-- Server version	8.0.43

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `admins`
--

DROP TABLE IF EXISTS `admins`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admins` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(200) NOT NULL,
  `user_pass` varchar(200) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admins`
--

LOCK TABLES `admins` WRITE;
/*!40000 ALTER TABLE `admins` DISABLE KEYS */;
INSERT INTO `admins` VALUES (1,'admin','12345678');
/*!40000 ALTER TABLE `admins` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `companies`
--

DROP TABLE IF EXISTS `companies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `companies` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(200) NOT NULL,
  `direccion` varchar(200) NOT NULL,
  `telefono` varchar(200) NOT NULL,
  `email` varchar(200) NOT NULL,
  `estado` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `companies`
--

LOCK TABLES `companies` WRITE;
/*!40000 ALTER TABLE `companies` DISABLE KEYS */;
INSERT INTO `companies` VALUES (3,'Café do Brasil Ltda','Rua das Flores 120, São Paulo, SP, Brazil','+55 11 3456 7890','contact@cafedobrasil.com',1),(4,'Mate Sur S.A.','Av. Corrientes 2345, Buenos Aires, Argentina','+54 11 4567 8901','info@matesur.com',1),(5,'Andes Cacao Cooperative','Km 12 Vía Quevedo, Los Ríos, Ecuador','+593 5 278 1234','sales@andescacao.ec',1),(6,'Quisqueya Chocolate SRL','Calle Duarte 456, Santo Domingo, Dominican Republic','+1 809 555 7823','info@quisqueyachocolate.do',1),(7,'Pura Vida Coffee Co.','Santa María de Dota, San José, Costa Rica','+506 2543 8899','hello@puravidacoffee.cr',1);
/*!40000 ALTER TABLE `companies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `gtin` varchar(14) DEFAULT NULL,
  `nombre` varchar(200) NOT NULL,
  `descripcion` varchar(500) NOT NULL,
  `marca` varchar(200) NOT NULL,
  `origen` varchar(200) NOT NULL,
  `bruto` int NOT NULL,
  `neto` int NOT NULL,
  `unidad` varchar(50) NOT NULL,
  `estado` tinyint(1) NOT NULL,
  `companie_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `gtin` (`gtin`),
  KEY `companie_id` (`companie_id`),
  CONSTRAINT `products_ibfk_1` FOREIGN KEY (`companie_id`) REFERENCES `companies` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (6,'7891000100103','Premium Ground Coffee','Roasted and ground coffee made from selected Brazilian Arabica beans.','Café do Brasil','Brazil',520,500,'g',1,3),(7,'7791234567895','Traditional Yerba Mate','Classic Argentine yerba mate with strong flavor and aroma.','Mate Sur','Argentina',1020,1000,'g',1,4),(8,'7862101234567','Organic Cocoa Powder','Pure organic cocoa powder produced from Ecuadorian cacao beans.','Andes Cacao','Ecuador',260,250,'g',1,5),(9,'7461239876543','Dark Chocolate Bar 70%','Rich dark chocolate made with Dominican cocoa, 70% cacao content.','Quisqueya Chocolate','Dominican Republic',110,100,'g',1,6),(10,'74410020034567','Whole Bean Coffee Tarrazú','High-altitude whole bean coffee from the Tarrazú region of Costa Rica.','Pura Vida Coffee','Costa Rica',1030,1000,'g',1,7),(17,'7891910005674','Brazilian Cassava Flour','Traditional cassava flour used for farofa and regional dishes.','Raízes do Brasil','Brazil',1050,1000,'g',1,3),(18,'7798123400012','Argentine Dulce de Leche','Creamy caramel spread made with milk and sugar.','La Estancia','Argentina',460,450,'g',1,4),(19,'7862109876541','Ecuadorian Cacao Nibs','Roasted cacao nibs with intense flavor and aroma.','Andes Cacao','Ecuador',210,200,'g',1,5),(20,'7463214567890','Dominican Organic Cane Sugar','Unrefined organic cane sugar with rich molasses notes.','Dulce Caribe','Dominican Republic',1025,1000,'g',1,6),(21,'74410098765432','Costa Rican Raw Honey','Pure raw honey harvested from Costa Rican tropical forests.','Miel Tica','Costa Rica',780,750,'g',1,7),(22,'7894561230987','Brazilian Black Beans','High-quality black beans commonly used in Brazilian cuisine.','Sabor Caseiro','Brazil',1010,1000,'g',1,3);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-12-17 18:37:41
