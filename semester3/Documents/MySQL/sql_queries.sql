skinskinuserCREATE DATABASE IF NOT EXISTS `dbi500182` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `dbi500182`;

CREATE TABLE `skin` (
  `id` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255),
  `price` DOUBLE,
  `description` TEXT,
  `img` MEDIUMBLOB DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `user` (
  `id` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255),
  `password` VARCHAR(255),
  `email` VARCHAR(255),
  `balance` DOUBLE,
  `age` INT,
  `user_type` VARCHAR(255),
  `img` MEDIUMBLOB DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `message` (
  `message_id` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `sender_id` BIGINT(20) NOT NULL,
  `receiver_id` BIGINT(20) NOT NULL,
  `message_text` TEXT NOT NULL,
  `timestamp` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`message_id`),
  FOREIGN KEY (`sender_id`) REFERENCES `user`(`id`),
  FOREIGN KEY (`receiver_id`) REFERENCES `user`(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `blackjack_game` (
  `game_id` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `user_id` BIGINT(20) NOT NULL,
  `result` DECIMAL(10, 2) NOT NULL,
  `timestamp` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`game_id`),
  FOREIGN KEY (`user_id`) REFERENCES `user`(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `transaction_history` (
  `transaction_id` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `user_id` BIGINT(20) NOT NULL,
  `transaction_type` VARCHAR(50) NOT NULL,
  `amount` DECIMAL(10, 2) NOT NULL,
  `transaction_date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`transaction_id`),
  FOREIGN KEY (`user_id`) REFERENCES `user`(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `purchase_history` (
  `purchase_id` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `user_id` BIGINT(20) NOT NULL,
  `skin_id` BIGINT(20) NOT NULL,  -- Add this column
  `item_name` VARCHAR(255) NOT NULL,
  `item_price` DECIMAL(10, 2) NOT NULL,
  `purchase_date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`purchase_id`),
  FOREIGN KEY (`user_id`) REFERENCES `user`(`id`),
  FOREIGN KEY (`skin_id`) REFERENCES `skin`(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;