
CREATE TABLE `tbltasks` (
  `t_id` int(11) NOT NULL AUTO_INCREMENT,
  `task` varchar(100) NOT NULL,
  `create_date` date DEFAULT NULL,
  `end_date` date NOT NULL,
  `status` tinyint(1) NOT NULL,
  `priority` int(11) NOT NULL,
  `hide` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`t_id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci


CREATE TABLE `tblpriority` (
  `p_id` int(11) NOT NULL AUTO_INCREMENT,
  `priority` varchar(50) NOT NULL,
  `color` varchar(255) NOT NULL,
  PRIMARY KEY (`p_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci
INSERT INTO `tblpriority` (`p_id`, `priority`,`color`) VALUES ('1', 'default','#D2E3C9');
INSERT INTO `tblpriority` (`p_id`, `priority`,`color`) VALUES ('2', 'low','#B5DDE0');
INSERT INTO `tblpriority` (`p_id`, `priority`,`color`) VALUES ('3', 'high','#F6D5B5');
INSERT INTO `tblpriority` (`p_id`, `priority`,`color`) VALUES ('4', 'imeddiate','#FBD4CE');
