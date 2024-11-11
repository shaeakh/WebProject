-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 10, 2024 at 06:33 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `webproject`
--

-- --------------------------------------------------------

--
-- Table structure for table `auction_page`
--

CREATE TABLE `auction_page` (
  `tournament_id` int(11) DEFAULT NULL,
  `team_id` int(11) DEFAULT NULL,
  `current_player_index` int(11) DEFAULT NULL,
  `current_bid` int(11) DEFAULT NULL,
  `sold` tinyint(1) DEFAULT NULL,
  `start` tinyint(1) DEFAULT NULL,
  `pause` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `auction_page`
--

INSERT INTO `auction_page` (`tournament_id`, `team_id`, `current_player_index`, `current_bid`, `sold`, `start`, `pause`) VALUES
(7, NULL, 7, 200, 0, 1, 0),
(8, NULL, NULL, NULL, 0, 1, NULL),
(9, NULL, NULL, NULL, 0, 1, NULL),
(10, NULL, NULL, NULL, 0, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `member_request`
--

CREATE TABLE `member_request` (
  `request_id` int(11) NOT NULL,
  `tournament_id` int(11) DEFAULT NULL,
  `reg_no` varchar(50) DEFAULT NULL,
  `role` varchar(255) NOT NULL,
  `position` varchar(255) DEFAULT NULL,
  `team_name` varchar(255) DEFAULT NULL,
  `team_logo` varchar(300) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `participated_tournament`
--

CREATE TABLE `participated_tournament` (
  `tournament_id` int(11) DEFAULT NULL,
  `reg_no` varchar(255) DEFAULT NULL,
  `role` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `participated_tournament`
--

INSERT INTO `participated_tournament` (`tournament_id`, `reg_no`, `role`) VALUES
(7, '2020831022', 'admin'),
(7, '2020831043', 'player'),
(7, '2020831040', 'player'),
(7, '2020831004', 'manager'),
(7, '2020831026', 'manager'),
(7, '2020831005', 'player'),
(7, '2020831012', 'player'),
(7, '2020831016', 'player'),
(7, '2020831017', 'player'),
(7, '2020831030', 'player'),
(7, '2020831033', 'player'),
(7, '2020831036', 'player'),
(7, '2020831023', 'manager'),
(8, '2020831004', 'admin'),
(9, '2020831004', 'admin'),
(9, '2020831043', 'manager'),
(10, '2020831043', 'admin');

-- --------------------------------------------------------

--
-- Table structure for table `player`
--

CREATE TABLE `player` (
  `tournament_id` int(11) DEFAULT NULL,
  `reg_no` varchar(50) DEFAULT NULL,
  `team_id` int(11) DEFAULT NULL,
  `position` varchar(255) DEFAULT NULL,
  `player_price` int(11) DEFAULT NULL,
  `category` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `player`
--

INSERT INTO `player` (`tournament_id`, `reg_no`, `team_id`, `position`, `player_price`, `category`) VALUES
(7, '2020831043', 6, 'Midfielder ', 200, 'Platinum'),
(7, '2020831040', 6, 'Defender ', 200, 'Gold'),
(7, '2020831005', NULL, 'Goalkeeper ', 200, 'Silver'),
(7, '2020831012', NULL, 'Defender ', 200, 'Bronze'),
(7, '2020831016', 7, 'Midfielder ', 900, 'Platinum'),
(7, '2020831017', 7, 'Goalkeeper ', 500, 'Gold'),
(7, '2020831030', 7, 'Defender ', 800, 'Silver'),
(7, '2020831033', NULL, 'Midfielder ', 200, 'Bronze'),
(7, '2020831036', NULL, 'Goalkeeper ', 200, 'Platinum');

-- --------------------------------------------------------

--
-- Table structure for table `team`
--

CREATE TABLE `team` (
  `team_id` int(11) NOT NULL,
  `tournament_id` int(11) DEFAULT NULL,
  `reg_no` varchar(50) DEFAULT NULL,
  `team_name` varchar(255) NOT NULL,
  `team_logo` varchar(300) NOT NULL,
  `coin` int(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `team`
--

INSERT INTO `team` (`team_id`, `tournament_id`, `reg_no`, `team_name`, `team_logo`, `coin`) VALUES
(5, 7, '2020831023', 'Team Alpha', 'https://res.cloudinary.com/dsd4b2lkg/image/upload/v1719986628/xev9vz7walf4lfgdbusl.jpg', 7000),
(6, 7, '2020831004', 'Team Beta', 'https://res.cloudinary.com/dsd4b2lkg/image/upload/v1719986686/fhoc4lkrxydynsuusbft.jpg', 9000),
(7, 7, '2020831026', 'Team Gama', 'https://res.cloudinary.com/dsd4b2lkg/image/upload/v1719986733/kwckm8uky7biwpcpclv8.jpg', 7800),
(8, 9, '2020831043', 'Not gonna win', 'https://res.cloudinary.com/dsd4b2lkg/image/upload/v1730000286/tztw46w4bptam1hlhfjn.png', 10000);

-- --------------------------------------------------------

--
-- Table structure for table `tournament`
--

CREATE TABLE `tournament` (
  `tournament_id` int(11) NOT NULL,
  `tournament_name` varchar(200) NOT NULL,
  `tournament_date` date DEFAULT NULL,
  `sport_type` varchar(255) NOT NULL,
  `reg_no` varchar(255) NOT NULL,
  `player_base_coin` int(11) NOT NULL,
  `per_team_coin` int(11) NOT NULL,
  `tournament_logo_url` varchar(255) DEFAULT NULL,
  `join_code` varchar(255) NOT NULL,
  `num_of_player` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tournament`
--

INSERT INTO `tournament` (`tournament_id`, `tournament_name`, `tournament_date`, `sport_type`, `reg_no`, `player_base_coin`, `per_team_coin`, `tournament_logo_url`, `join_code`, `num_of_player`) VALUES
(7, 'SWE Inter Depertment Tournament ', '2024-07-29', 'Football', '2020831022', 200, 10000, 'https://res.cloudinary.com/dsd4b2lkg/image/upload/v1719986537/aflhf6xquwroagh2av50.jpg', 'wqxmn2kye', 7),
(8, '', '2024-09-23', 'Tournament type', '2020831004', 200, 10000, 'https://res.cloudinary.com/dsd4b2lkg/image/upload/v1727099972/dhzvnd9ceqsp4ccf2i79.jpg', 'jvbdud07s', 7),
(9, 'SWE Inter Depertment Cricket Tournament ', '2024-10-21', 'Cricket', '2020831004', 200, 10000, 'https://res.cloudinary.com/dsd4b2lkg/image/upload/v1718476640/rmxa26ctdkr4m0jrgwog.png', 'x0szd1joh', 7),
(10, 'EEE Inter Depertment Football Tournament ', '2024-10-07', 'Cricket', '2020831043', 500, 20000, 'https://res.cloudinary.com/dsd4b2lkg/image/upload/v1718476640/rmxa26ctdkr4m0jrgwog.png', '52tqwcjg1', 7);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `reg_no` varchar(50) NOT NULL,
  `name` varchar(255) NOT NULL,
  `edu_mail` varchar(255) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `department` varchar(100) NOT NULL,
  `user_pic_url` varchar(255) DEFAULT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`reg_no`, `name`, `edu_mail`, `phone`, `department`, `user_pic_url`, `password`) VALUES
('2020831004', 'Nafi Ullah', 'nafi04@student.sust.edu', '01704567731', 'SWE', 'https://res.cloudinary.com/dsd4b2lkg/image/upload/v1719986658/uto8dw2eomzrgvqyyeso.jpg', '$2a$10$.Naojcz6qiE4lxP.mMvG9OLoxlCVZ2PnnxOwQ.ODgHKXQgpgGMeJC'),
('2020831005', 'Mridul', 'mridul05@student.sust.edu', '01704567731', 'SWE', 'https://res.cloudinary.com/dsd4b2lkg/image/upload/v1719986264/fiqyrcbvhugsfcloucep.jpg', '$2a$10$i1Nj4N40kmv.umUwg2RJXu6al9rSxA7N1VjQ5DBqPUocSktTsap2m'),
('2020831007', 'Farzine', 'farzine07@student.sust.edu', '01704567731', 'SWE', 'https://res.cloudinary.com/dsd4b2lkg/image/upload/v1719985806/djrnxoiufmstj2evcacd.jpg', '$2a$10$3ZyIhh9AsVIkqXuX3.GUeO4pvW8jwSTyTetugTdIPpMWR4N/mf36W'),
('2020831012', 'Siam Arefin', 'siam12@student.sust.edu', '01704567731', 'SWE', 'https://res.cloudinary.com/dsd4b2lkg/image/upload/v1719986089/jnriusnniggjkr1d3xh7.jpg', '$2a$10$d5HV5TrQCjGg7D3pkpTxLuko95bDoTZL5KuaiJaTaqtUP54eArEJe'),
('2020831016', 'Towhid', 'towhid16@student.sust.edu', '01704567731', 'SWE', 'https://res.cloudinary.com/dsd4b2lkg/image/upload/v1719985988/sicucvxakduknc3mz6dr.jpg', '$2a$10$It6JbQI5HSHaFXkbg5119OnS/4elw4VNzzCi6cUUzql/CvpEsD7r6'),
('2020831017', 'Shovon', 'shovon17@student.sust.edu', '01704567731', 'SWE', 'https://res.cloudinary.com/dsd4b2lkg/image/upload/v1719986129/f9iwh1c9xagaaesnkkml.jpg', '$2a$10$Os8T4rWKDhBbw7p8eK4U9.iMk.UgDKrBEl6SVjhmOGAG83SSUGyT.'),
('2020831022', 'Shaeakh Ahmed Chowdhury', 'shaeakh22@student.sust.edu', '01704567731', 'SWE', 'https://res.cloudinary.com/dsd4b2lkg/image/upload/v1719985682/kvhugdxxrgaqkdw6i7bl.jpg', '$2a$10$8DR7dVfrDbVgwJwA0nHSiu6TNB0p9ZWocA9RpXnYxVLrqwmnX2x0C'),
('2020831023', 'Nixon', 'nixon23@student.sust.edu', '01704567731', 'SWE', 'https://res.cloudinary.com/dsd4b2lkg/image/upload/v1719985777/lgg21bbcwzjpn7cnd2lk.jpg', '$2a$10$Fq1x2c2ZbJjrav9iT1VdxOmUNoEFx70hroBAPrjzpr40FVjxkGPiy'),
('2020831026', 'Amit', 'amit26@student.sust.edu', '01704567731', 'SWE', 'https://res.cloudinary.com/dsd4b2lkg/image/upload/v1719985964/muri6gfypztmwtbcyn8w.jpg', '$2a$10$QILVlcF3f2LCVKArZzGcK.R6A6VqEjK/i8g7J4VPUC0NxJN9e8gBu'),
('2020831030', 'Rifat', 'rifat30@student.sust.edu', '01704567731', 'SWE', 'https://res.cloudinary.com/dsd4b2lkg/image/upload/v1719986333/voedltojkc2ypzpnagu6.jpg', '$2a$10$f.c35UghD319PYoSslTksOxDjECpSOu2DnkMKAKVWYsC1lvORJVpG'),
('2020831033', 'Meraj', 'meraj33@student.sust.edu', '01704567731', 'SWE', 'https://res.cloudinary.com/dsd4b2lkg/image/upload/v1719985939/ck8dwxubxshuzhqfmfjn.jpg', '$2a$10$mn1wl.mSlg.67KN2Ii9i0OkUppUH988fa9J..bGG4ExSIkp6x25t6'),
('2020831036', 'Kaykobad', 'kaykobad36@student.sust.edu', '01704567731', 'SWE', 'https://res.cloudinary.com/dsd4b2lkg/image/upload/v1719986198/elrlehiakjwoj7no4lv9.jpg', '$2a$10$EFSSxrUlCCEqudipNL4greEkGyT48dRazwzzc1Gy5nmQCkOL26ziK'),
('2020831040', 'Emran ', 'emran40@student.sust.edu', '01642907182', 'SWE', 'https://res.cloudinary.com/dsd4b2lkg/image/upload/v1719986159/leg4cowcdg6mzkmlhthq.jpg', '$2a$10$V1iczVTeUy5vOYs5jdB9m.SwaHck6GlWOfU46PB4XCayMYv30qywy'),
('2020831043', 'Robin', 'robin43@student.sust.edu', '01704567731', 'SWE', 'https://res.cloudinary.com/dsd4b2lkg/image/upload/v1719985836/lhp62pigvctjrzyewwmy.jpg', '$2a$10$17QuW6uk07y3TIRuOyuy7.3H0gIsIjJItUPOhV9ENKh3xHuzKB3Fa'),
('2020831045', 'Tajwar', 'tajwar45@student.sust.edu', '01704567731', 'SWE', 'https://res.cloudinary.com/dsd4b2lkg/image/upload/v1719986231/heerjt6awxggetvmnrb6.jpg', '$2a$10$f6.yxUy4sw4w7MIqzxlIceSitcDk9.b2LpZczgVgIl0gDbZfTx05y'),
('2020831049', 'Arif', 'arif49@student.sust.edu', '01704567731', 'SWE', 'https://res.cloudinary.com/dsd4b2lkg/image/upload/v1719986300/ex0n8w5a3vfjanldcj1f.jpg', '$2a$10$qQqfeZ5yVgHRpctN/bjE1OlxCYaAQco6bRyLuby2g5G.u/fMPrlyW'),
('2020831050', 'Imroj', 'imroj50@student.sust.edu', '01704567731', 'SWE', 'https://res.cloudinary.com/dsd4b2lkg/image/upload/v1719986051/ph67hvorjwamu13zeofp.jpg', '$2a$10$sy9BH2UtzdHceBYC1HWxQOhaFrnIxQ53onQxCyNgG8XVb7zicIpju'),
('2020831051', 'Rakib', 'rakib51@student.sust.edu', '01704567731', 'SWE', 'https://res.cloudinary.com/dsd4b2lkg/image/upload/v1719986020/gllxjzlapdmus5uwmbnj.jpg', '$2a$10$ZtgLzEVXkI4nrhXQa0OAnOPcnnnNIMi5FiJf4gsc9SEhssMm2B31u');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `auction_page`
--
ALTER TABLE `auction_page`
  ADD KEY `team_id` (`team_id`),
  ADD KEY `tournament_id` (`tournament_id`);

--
-- Indexes for table `member_request`
--
ALTER TABLE `member_request`
  ADD PRIMARY KEY (`request_id`),
  ADD KEY `reg_no` (`reg_no`),
  ADD KEY `tournament_id` (`tournament_id`);

--
-- Indexes for table `participated_tournament`
--
ALTER TABLE `participated_tournament`
  ADD KEY `reg_no` (`reg_no`),
  ADD KEY `tournament_id` (`tournament_id`);

--
-- Indexes for table `player`
--
ALTER TABLE `player`
  ADD KEY `team_id` (`team_id`),
  ADD KEY `reg_no` (`reg_no`),
  ADD KEY `tournament_id` (`tournament_id`);

--
-- Indexes for table `team`
--
ALTER TABLE `team`
  ADD PRIMARY KEY (`team_id`),
  ADD KEY `reg_no` (`reg_no`),
  ADD KEY `tournament_id` (`tournament_id`);

--
-- Indexes for table `tournament`
--
ALTER TABLE `tournament`
  ADD PRIMARY KEY (`tournament_id`),
  ADD KEY `reg_no` (`reg_no`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`reg_no`),
  ADD UNIQUE KEY `edu_mail` (`edu_mail`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `member_request`
--
ALTER TABLE `member_request`
  MODIFY `request_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `team`
--
ALTER TABLE `team`
  MODIFY `team_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `tournament`
--
ALTER TABLE `tournament`
  MODIFY `tournament_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `auction_page`
--
ALTER TABLE `auction_page`
  ADD CONSTRAINT `auction_page_ibfk_1` FOREIGN KEY (`team_id`) REFERENCES `team` (`team_id`),
  ADD CONSTRAINT `auction_page_ibfk_2` FOREIGN KEY (`tournament_id`) REFERENCES `tournament` (`tournament_id`);

--
-- Constraints for table `member_request`
--
ALTER TABLE `member_request`
  ADD CONSTRAINT `member_request_ibfk_1` FOREIGN KEY (`reg_no`) REFERENCES `users` (`reg_no`),
  ADD CONSTRAINT `member_request_ibfk_2` FOREIGN KEY (`tournament_id`) REFERENCES `tournament` (`tournament_id`);

--
-- Constraints for table `participated_tournament`
--
ALTER TABLE `participated_tournament`
  ADD CONSTRAINT `participated_tournament_ibfk_1` FOREIGN KEY (`reg_no`) REFERENCES `users` (`reg_no`),
  ADD CONSTRAINT `participated_tournament_ibfk_2` FOREIGN KEY (`tournament_id`) REFERENCES `tournament` (`tournament_id`);

--
-- Constraints for table `player`
--
ALTER TABLE `player`
  ADD CONSTRAINT `player_ibfk_1` FOREIGN KEY (`team_id`) REFERENCES `team` (`team_id`),
  ADD CONSTRAINT `player_ibfk_2` FOREIGN KEY (`reg_no`) REFERENCES `users` (`reg_no`),
  ADD CONSTRAINT `player_ibfk_3` FOREIGN KEY (`tournament_id`) REFERENCES `tournament` (`tournament_id`);

--
-- Constraints for table `team`
--
ALTER TABLE `team`
  ADD CONSTRAINT `team_ibfk_1` FOREIGN KEY (`reg_no`) REFERENCES `users` (`reg_no`),
  ADD CONSTRAINT `team_ibfk_2` FOREIGN KEY (`tournament_id`) REFERENCES `tournament` (`tournament_id`);

--
-- Constraints for table `tournament`
--
ALTER TABLE `tournament`
  ADD CONSTRAINT `tournament_ibfk_1` FOREIGN KEY (`reg_no`) REFERENCES `users` (`reg_no`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
