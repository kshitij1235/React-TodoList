

CREATE TABLE `todo`.`tbltasks` (`t_id` INT NOT NULL AUTO_INCREMENT , `task` VARCHAR(100) NOT NULL , `create_date` DATE NOT NULL , `end_date` DATE NOT NULL , `status` BOOLEAN NOT NULL , `priority` INT NOT NULL , PRIMARY KEY (`t_id`)) ENGINE = InnoDB;




CREATE TABLE `todo`.`tblpriority` (`p_id` INT NOT NULL AUTO_INCREMENT , `priority` VARCHAR(50) NOT NULL , PRIMARY KEY (`p_id`)) ENGINE = InnoDB;
ALTER TABLE tblpriority
ADD color VARCHAR(255) NOT NULL;
INSERT INTO `tblpriority` (`p_id`, `priority`,`color`) VALUES ('1', 'default','#D2E3C9');
INSERT INTO `tblpriority` (`p_id`, `priority`,`color`) VALUES ('2', 'low','#B5DDE0');
INSERT INTO `tblpriority` (`p_id`, `priority`,`color`) VALUES ('3', 'high','#F6D5B5');
INSERT INTO `tblpriority` (`p_id`, `priority`,`color`) VALUES ('4', 'imeddiate','#FBD4CE');
