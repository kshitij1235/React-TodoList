

CREATE TABLE `todo`.`tbltasks` (`t_id` INT NOT NULL AUTO_INCREMENT , `task` VARCHAR(100) NOT NULL , `create_date` DATE NOT NULL , `end_date` DATE NOT NULL , `status` BOOLEAN NOT NULL , `priority` INT NOT NULL , PRIMARY KEY (`t_id`)) ENGINE = InnoDB;




CREATE TABLE `todo`.`tblpriority` (`p_id` INT NOT NULL AUTO_INCREMENT , `priority` VARCHAR(50) NOT NULL , PRIMARY KEY (`p_id`)) ENGINE = InnoDB;
INSERT INTO `tblpriority` (`p_id`, `priority`) VALUES ('1', 'default');
INSERT INTO `tblpriority` (`p_id`, `priority`) VALUES ('2', 'low');
INSERT INTO `tblpriority` (`p_id`, `priority`) VALUES ('3', 'high');
INSERT INTO `tblpriority` (`p_id`, `priority`) VALUES ('4', 'imeddiate');