-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1
-- Време на генериране: 19 юни 2023 в 11:57
-- Версия на сървъра: 10.4.27-MariaDB
-- Версия на PHP: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данни: `million_dollar_database`
--
CREATE DATABASE IF NOT EXISTS `million_dollar_database` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `million_dollar_database`;

-- --------------------------------------------------------

--
-- Структура на таблица `grids`
--

CREATE TABLE `grids` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `x_coordinate` int(11) DEFAULT NULL,
  `y_coordinate` int(11) DEFAULT NULL,
  `width` int(11) DEFAULT NULL,
  `height` int(11) DEFAULT NULL,
  `image_path` varchar(255) DEFAULT NULL,
  `hyperlink` varchar(255) DEFAULT NULL,
  `tooltip` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Схема на данните от таблица `grids`
--

INSERT INTO `grids` (`id`, `user_id`, `x_coordinate`, `y_coordinate`, `width`, `height`, `image_path`, `hyperlink`, `tooltip`) VALUES
(105, 8, 0, 33, 27, 19, '../img/football.png', 'https://en.wikipedia.org/wiki/American_football', 'Rugby4Life'),
(112, 6, 3, 0, 10, 10, '../img/rock.png', 'https://en.wikipedia.org/wiki/Dwayne_Johnson', 'ROCKY'),
(118, 9, 2, 83, 3, 6, '../img/bottle.png', 'https://www.google.com/search?q=broken+bottle', 'Break that bottle!'),
(123, 4, 15, 14, 1, 1, '../img/lego.png', 'https://www.lego.com/', 'Go buy some legos'),
(125, 7, 7, 21, 4, 4, '../img/trex.png', 'https://www.nationalgeographic.com/animals/facts/tyrannosaurus-rex', 'My favourite dinosaur'),
(129, 13, 27, 9, 26, 11, '../img/dollar.png', 'https://www.trump.com/', 'SUPPORT TRUMP'),
(130, 14, 0, 67, 6, 2, '../img/snickers.png', 'https://www.snickers.com/', 'YUMMY'),
(131, 10, 22, 57, 7, 6, '../img/motor.png', 'http://www.motorbike-bg.com/', 'Obicham motori'),
(133, 11, 0, 2, 1, 1, '../img/freedom.png', 'https://freedom.to/', 'Everybody wants freedom!'),
(134, 16, 1, 2, 1, 1, '../img/github.png', 'https://github.com/', 'SEE MY GITHUB'),
(135, 17, 0, 27, 3, 7, '../img/oscar.png', 'https://www.oscars.org/', 'Sign up for the chance of winning an oscar statuette'),
(136, 2, 17, 89, 11, 7, '../img/hotel.png', 'https://www.hotels.com/', 'love travelling'),
(137, 18, 42, 40, 15, 7, '../img/lion.png', 'https://www.imdb.com/title/tt0110357/', 'HAKUNA MATATA'),
(138, 19, 29, 35, 11, 11, '../img/chess.png', 'https://www.chess.com/', 'Play against the best in the world!'),
(139, 20, 26, 35, 3, 3, '../img/mother.png', 'https://www.bg-mamma.com/', 'Join our community!'),
(146, 2, 19, 3, 3, 3, '../img/car.png', 'https://www.cars.bg/', 'BEST CARS'),
(149, 13, 86, 78, 12, 8, '../img/trump.png', 'https://www.trump.com/', 'MAKE AMERICA GREAT AGAIN!'),
(151, 17, 24, 84, 16, 4, '../img/hollywood.png', 'https://www.hollywood.com/', 'Become a star!'),
(153, 15, 0, 0, 2, 2, '../img/abv.png', 'https://www.abv.bg/', 'Best bulgarian mail!'),
(154, 15, 31, 96, 4, 4, '../img/abv.png', 'https://www.abv.bg/', 'Top 5 mails in Europe!'),
(163, 21, 0, 3, 2, 2, '../img/A.png', 'https://en.wikipedia.org/wiki/English_alphabet', 'Learn the English alphabet'),
(164, 21, 89, 0, 4, 4, '../img/B.png', 'https://en.wikipedia.org/wiki/English_alphabet', 'Learn the English alphabet'),
(165, 20, 15, 15, 1, 1, '../img/oscar.png', 'https://www.google.com/', 'Didn\'t know what to write here'),
(168, 6, 0, 90, 10, 10, '../img/manutd.png', 'https://www.manutd.com/', 'UK UK UK'),
(172, 16, 7, 60, 8, 8, '../img/chatgpt.png', 'https://openai.com/blog/chatgpt', 'Advanced AI chatbot'),
(174, 22, 22, 0, 5, 7, '../img/real.png', 'https://www.realmadrid.com/', 'CR7'),
(175, 18, 11, 81, 2, 2, '../img/lion.png', 'https://en.wikipedia.org/wiki/The_Lion_King', 'wiki page'),
(177, 12, 52, 21, 4, 10, '../img/snake2.png', 'https://www.britannica.com/list/9-of-the-worlds-deadliest-snakes', 'A poisonous snake'),
(178, 12, 15, 60, 25, 4, '../img/snake.png', 'https://www.nationalgeographic.com/animals/reptiles/facts/snakes-1', 'I love snakes!'),
(183, 14, 0, 16, 6, 3, '../img/kitkat.png', 'https://www.nestle.bg/bg/brands/allbrands/kitkat%C2%AE', 'KIT KAT'),
(184, 3, 15, 21, 8, 8, '../img/socks.png', 'https://www.ringsidenews.com/2021/01/12/how-mick-foley-came-up-with-mr-socko-gimmick/', 'Socks socks socks');

-- --------------------------------------------------------

--
-- Структура на таблица `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `balance` decimal(10,2) DEFAULT 0.00,
  `grid_id` int(11) DEFAULT NULL,
  `grid_id_2` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Схема на данните от таблица `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `email`, `balance`, `grid_id`, `grid_id_2`) VALUES
(1, 'admin', 'adminpass', 'vip@admin.com', NULL, NULL, NULL),
(2, 'Petya', 'petya123', 'petya@gmail.com', '4728.13', 136, 146),
(3, 'RadoslavVV', 'azrado', 'djradi10@abv.bg', '18570.21', 184, NULL),
(4, 'Jorkoo', 'aa', 'johnHenry@gmail.com', '1457.00', 123, NULL),
(5, 'Ivan4o', 'iv4o', 'ivan_a@a.b', '0.00', NULL, NULL),
(6, 'Pesho', '12345', 'newemail@nno.cl', '101458.29', 112, 168),
(7, 'T_Rex', 'iamdino', 'dinosaur@velin.fmi', '2545.35', 125, NULL),
(8, 'Juventus', '1234', 'alt@all.doo', '730843.12', 105, NULL),
(9, 'Dominik', 'domdom', 'sss@bbg.eg', '5981.13', 118, NULL),
(10, 'Krisi', 'krisi123', 'krisi_pisi@gmail.com', '49561.14', 131, NULL),
(11, 'Luchezar31', 'qwerty', 'gorn@naf.lr', '89.32', 133, NULL),
(12, 'Kostadin', 'kosta', 'kotseto@baba.bg', '60003.91', 178, 177),
(13, 'Trump', 'usa', 'donaldTrump@usa.com', '258829.69', 129, 149),
(14, 'Snickers', 'goshka', 'gosho@snickers.com', '843.23', 130, 183),
(15, 'abv_mail', 'abvabv', 'abv@abv.bg', '1842.00', 153, 154),
(16, 'github_Andy', 'andygit', 'andy@github.com', '3690.00', 134, 172),
(17, 'Oscar', 'ososos123', 'oscar@oscars.com', '556.12', 135, 151),
(18, 'lion_king', 'lion123', 'lion.king@abv.bg', '10000.00', 137, 175),
(19, 'chess_master', 'bishop', 'chess@chess.org', '1742.90', 138, NULL),
(20, 'Larisa', 'kakalara', 'lari@gmail.com', '201.43', 139, 165),
(21, 'Alpha_Guy', 'alpha', 'bigalpha@alpha.bg', '3715.00', 163, 164),
(22, 'Stancho', 'stan', 'stani@mail.bg', '932.91', NULL, 174);

--
-- Indexes for dumped tables
--

--
-- Индекси за таблица `grids`
--
ALTER TABLE `grids`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Индекси за таблица `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `grid_id` (`grid_id`),
  ADD KEY `grid_id_2` (`grid_id_2`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `grids`
--
ALTER TABLE `grids`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=185;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- Ограничения за дъмпнати таблици
--

--
-- Ограничения за таблица `grids`
--
ALTER TABLE `grids`
  ADD CONSTRAINT `grids_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Ограничения за таблица `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`grid_id`) REFERENCES `grids` (`id`),
  ADD CONSTRAINT `users_ibfk_2` FOREIGN KEY (`grid_id_2`) REFERENCES `grids` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
