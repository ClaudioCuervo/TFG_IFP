-- MySQL Script generated by MySQL Workbench
-- Thu May 19 22:13:16 2022
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `logimad` ;

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `logimad` DEFAULT CHARACTER SET utf8 ;
USE `logimad` ;

-- -----------------------------------------------------
-- Table `mydb`.`users`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `users` ;

CREATE TABLE IF NOT EXISTS `users` (
  `id_user` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `surname` VARCHAR(45) NOT NULL,
  `password` VARCHAR(25) NOT NULL,
  `mail` VARCHAR(45) NOT NULL,
  `phone` VARCHAR(12) NOT NULL,
  PRIMARY KEY (`id_user`)
  )ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`addresses`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `addresses` ;

CREATE TABLE IF NOT EXISTS `addresses` (
  `id_address` INT NOT NULL AUTO_INCREMENT,
  `addres1` VARCHAR(45) NOT NULL,
  `address2` VARCHAR(45) NOT NULL,
  `zip` INT(10) NOT NULL,
  `city` VARCHAR(45) NOT NULL,
  `country` VARCHAR(45) NOT NULL,
  `users_id_user` INT NOT NULL,
  PRIMARY KEY (`id_address`),
  FOREIGN KEY (`users_id_user`) REFERENCES `users` (`id_user`)
  )ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`shipments`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `shipments` ;

CREATE TABLE IF NOT EXISTS `shipments` (
  `id_shipment` INT NOT NULL AUTO_INCREMENT,
  `recipient` VARCHAR(45) NOT NULL,
  `intructions` TEXT NOT NULL,
  `measures` VARCHAR(45) NOT NULL,
  `weight` INT NOT NULL,
  `users_id_user` INT NOT NULL,
  `addresses_id_address` INT NOT NULL,
  PRIMARY KEY (`id_shipment`),
  FOREIGN KEY (`users_id_user`) REFERENCES `users` (`id_user`),
  FOREIGN KEY (`addresses_id_address`) REFERENCES `addresses` (`id_address`)
  )ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`status`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `status` ;

CREATE TABLE IF NOT EXISTS `status` (
  `id_status` INT NOT NULL AUTO_INCREMENT,
  `status` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id_status`)
  )ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`shipment_status`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `shipment_status` ;

CREATE TABLE IF NOT EXISTS `shipment_status` (
  `status_id_status` INT NOT NULL,
  `shipments_id_shipment` INT NOT NULL,
  `date` DATETIME NULL DEFAULT NOW(),
  PRIMARY KEY (`status_id_status`, `shipments_id_shipment`),
  FOREIGN KEY (`status_id_status`) REFERENCES `status` (`id_status`),
  FOREIGN KEY (`shipments_id_shipment`) REFERENCES `shipments` (`id_shipment`)
  )ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
