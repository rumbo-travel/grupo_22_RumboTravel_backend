-- MySQL dump 10.13  Distrib 8.0.31, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: rumbo_travel
-- ------------------------------------------------------
-- Server version	8.0.31

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
-- Table structure for table `paquetes`
--

DROP TABLE IF EXISTS `paquetes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `paquetes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `destino` varchar(45) NOT NULL,
  `cant_dias` int NOT NULL,
  `cant_noches` int NOT NULL,
  `precio` int NOT NULL,
  `imagen` varchar(45) NOT NULL,
  `destacado` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `paquetes`
--

LOCK TABLES `paquetes` WRITE;
/*!40000 ALTER TABLE `paquetes` DISABLE KEYS */;
INSERT INTO `paquetes` VALUES (1,'Bariloche',8,6,70000,'bariloche.jpg','ARGENTINA'),(2,'Cataratas',5,4,50000,'cataratas-misiones.jpg','ARGENTINA'),(3,'Mendoza',8,6,55000,'mendoza.jpg','ARGENTINA'),(4,'Cordoba',10,8,60000,'Villa general belgrano - cordoba.jpg','ARGENTINA'),(5,'Bangkok',10,7,3000,'Bangkok.jpg','ASIA'),(6,'Tokio',9,6,3200,'Tokio.jpg','ASIA'),(7,'Estambul',8,6,2800,'Estambul.jpeg','ASIA'),(8,'Tokio',9,6,3200,'Tokio.jpg','ASIA'),(9,'Amsterdam',10,8,3000,'Amsterdan.jpg','EUROPA'),(10,'Benidorm',7,5,2800,'Benidorm.jpg','EUROPA'),(11,'Londres',6,4,3000,'Londres.jpg','EUROPA'),(12,'Paris',8,6,3300,'paris.jpg','EUROPA'),(13,'Miami - Florida',7,6,2300,'Miami-Florida.jpg','AMERICA'),(14,'Punta Cana',8,6,3000,'puntaCana.jpg','AMERICA'),(21,'Rio de Janiero',10,9,1800,'RioDeJaneiro.jpg','AMERICA'),(22,'Cancun',9,8,2200,'cancun.jpg','AMERICA'),(23,'Cancun',13,12,4000,'cancun.jpg','AMERICA');
/*!40000 ALTER TABLE `paquetes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reservas`
--

DROP TABLE IF EXISTS `reservas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reservas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) DEFAULT NULL,
  `apellido` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `dni` int DEFAULT NULL,
  `fecha_nac` date DEFAULT NULL,
  `telefono` int DEFAULT NULL,
  `direccion` varchar(45) DEFAULT NULL,
  `ciudad` varchar(45) DEFAULT NULL,
  `provincia` varchar(45) DEFAULT NULL,
  `cp` varchar(45) DEFAULT NULL,
  `cant_personas` int DEFAULT NULL,
  `fecha_reserva` date DEFAULT NULL,
  `destino` varchar(45) DEFAULT NULL,
  `fecha_inicio` date DEFAULT NULL,
  `cant_dias` int DEFAULT NULL,
  `medio_pago` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reservas`
--

LOCK TABLES `reservas` WRITE;
/*!40000 ALTER TABLE `reservas` DISABLE KEYS */;
INSERT INTO `reservas` VALUES (1,'Juan','Gomez','juan@gmail.com',30564123,'1983-11-20',1165287568,'calle rivadavia 500','CABA','Buenos Aires','1002',2,'2023-02-07','Bariloche','2023-08-10',8,'MERCADO PAGO'),(2,'Marta','Perez','marta@gmail.com',25000114,'1978-01-23',1156265410,'Salvador Del Carril 1863','Santa Fe','Santa Fe','3000',2,'2023-03-15','Mendoza','2023-10-01',8,'MERCADO PAGO'),(3,'Vanesa','Tozcano','vanesa@gmail.com',23456000,'2005-06-01',11111111,'calle 7','caba','Buenos Aires','3000',1,'2023-07-03','Cancun','2023-08-06',10,'Mercado Pago'),(4,'Eugenia','Pepito','eugenia@gmail.com',34567890,'2005-05-30',11111114,'calle Rivadavia','caba','Buenos Aires','4400',3,'2023-07-03','Miami - Florida','2024-01-04',7,'Tarjeta de Credito'),(7,'sebastian','Gomez','aaa@cod.com',28254555,'2005-05-31',11111111,'calle Rivadavia','caba','Buenos Aires','4400',2,'2023-07-04','Cancun','2023-07-03',13,'Tarjeta de Debito');
/*!40000 ALTER TABLE `reservas` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-07-04 23:12:14
