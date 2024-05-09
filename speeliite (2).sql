-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 09, 2024 at 08:14 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `speeliite`
--

-- --------------------------------------------------------

--
-- Table structure for table `skins`
--

CREATE TABLE `skins` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `price` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `skins`
--

INSERT INTO `skins` (`id`, `name`, `price`) VALUES
(1, 'Cat', 100),
(2, 'Dog', 100),
(3, 'Apple', 100),
(4, 'Globe', 200),
(5, 'Toad', 200),
(6, 'Pickle', 200),
(7, 'Rat', 500),
(8, 'Pig', 500),
(9, 'Bacha', 500),
(10, 'Junko', 1000),
(11, 'Tike', 1000),
(12, 'Xinjo', 1000);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `credits` varchar(255) NOT NULL,
  `joinDate` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `email`, `credits`, `joinDate`) VALUES
(1, 'i', '$2y$10$1AYDXJb23QoSZo.3gUzJkuQTlSY1Lqn3jrfSE.tb0/LUmvdNNGz0K', 'i@i.i', '0', '2024-04-23'),
(2, 'a', '$2y$10$6joWj/iFwY4qy64hEWNiRebrUXZsy0CZDBPio.fKjsKhnXEZYmgte', 'a@a.a', '', '2024-04-23'),
(3, 'andrejs1234567', '$2y$10$nTashXhhrWFIn61V0iZV/ObM67iOGbs7yicOG6OKeWtJUuNVItihK', 'a@a.lv', '', '2024-04-25'),
(4, 'andrejs123456', '$2y$10$shsVn.o9LI3dreF5vrLN7u4cdb3rrcVifPuS7UNiorRAE7MlppmXy', 'ashhs@a.lv', '', '2024-04-25'),
(5, 'imants', '$2y$10$DPsM.duyPaamHG9kadFFBOhqph6SVPD8RgW8saV/aOWd2o0K7VbYO', 'imants@gmail.com', '', '2024-04-25'),
(6, 'gailis', '$2y$10$uHVmyihGaZGOofvzhpmxPuNEgS6SC9/zpmOUTVoX2Su3dN3xgJrr.', 'gailis@gail.com', '', '2024-04-25'),
(7, 'gailis1', '$2y$10$dUYLniTGNDu8kiBhkwauU.T3wxRUI/RG.oAx2Hpv/nLQRJfU0a6Ue', 'gailis1@gail.com', '', '2024-04-25'),
(8, 'hehehd', '$2y$10$uVOFIbfwTtA2hTP9IZKSSucIhwypuJfRTRRKQ70SFrfCfBc7LUun.', 'dhhdhdhh@djjdj.didi', '', '2024-05-07'),
(9, 'imants2', '$2y$10$vfO3hTB.qeClfgebvNxneObYGJ2bozcLVsbAT9hAC0tNcdlZdKaQq', 'imants2@gmail.con', '', '2024-05-07'),
(10, 'imants23', '$2y$10$B9yzo875MBW95BxpVgPQpuNcE.Gw0I0oZ6q4wVTtEYMGFLJqvCydO', 'imants23@gmail.con', '', '2024-05-07'),
(11, 'imants234', '$2y$10$EY1pJys8LjXLIGL.yV1ZhOXNWbn3vwZ0.oAwbhIFvtedAymSzTeTm', 'imants234@gmail.con', '', '2024-05-07'),
(12, 'zigis1', '$2y$10$6uuJlAYoo3H1cIBtTtcUZuIPI17GsD2RzesNklCxCnTCh1QOff2sO', 'zigis1@gmail.com', '', '2024-05-07'),
(13, 'zigis12', '$2y$10$Jx1tM9J5.cow6E2seo3Vk.Th5mgdzNMdDqfei60//ZWfxPkowdYWm', 'zigis12@gmail.com', '', '2024-05-07'),
(14, 'asdasd', '$2y$10$/kUH9Kjqkdd30ugBqhqde.jhbiz57CuPan2JXYxrdF4UQhAk3BMXm', 'asdasd@gmail.com', '', '2024-05-07'),
(15, 'asdasdd', '$2y$10$1IYBuIqLjTcyxMeTSfnJAO9CRmoY.5Giyqcar8NYMIZYJIpUeJRZW', 'asdasdd@gmail.com', '', '2024-05-07'),
(16, 'bigcoc', '$2y$10$FWp65LZmDoly10vw5.CxOeUFI/c.F4KTr/qRC/K9bup.D4h0cQWuO', 'bigcoc@gmail.com', '', '2024-05-07'),
(17, 'kaka12', '$2y$10$D/e1OVE/LG5EtBb2elYDFeuGqe/HSVqW9Ly29PReqViFooD4w6O7i', 'kaka12@gmail.com', '', '2024-05-07'),
(18, 'pipa12', '$2y$10$M24yII5HWu9Dg9y8rnVt6.huAHIKiLI7RTjoyd.xe7EAaaPBl2gRi', 'pipa12@gmail.com', '', '2024-05-07'),
(19, 'pipa123', '$2y$10$zHbNNu75imnd1hy.jA3OK.EKAE.K9o1IPnLswJNkFwJzrphimmaAq', 'pipa123@gmail.com', '', '2024-05-07'),
(20, 'traks1', '$2y$10$cGpJ4Q16PdFRKyyFYhndH.T5aXnVCHpwlDMlUflkN7fPKUOCvT3UK', 'traks1@gmail.com', '', '2024-05-07'),
(21, 'regnars', '$2y$10$exl383smOSrVvb4p3OuX4umvTY788Or2GdR4B9Pu/lKg8ABmFGfRC', 'regnars@gmqi.com', '', '2024-05-07'),
(22, 'ralfs1', '$2y$10$reSr2NMdpBIUChoBpPdDteIhkFh2vHmtPjpNdc4sgjv.ZHxF2C98W', 'ralfs1@gmail.com', '', '2024-05-07'),
(23, 'sghsbbsb', '$2y$10$x5Lz5ZoKBqRuNTmgThRRwuUCGr5h0gge0/RIruCU3E1qGMUVecSYq', 'shdhbdb@fdjjdk.com', '', '2024-05-07'),
(24, '1111111111', '$2y$10$rcCfyI7IQhWY3CjQpMK8pu.aRInLRrvRTWmk0oargGklJ/l0gVOY2', 'asd@gfd.lv', '', '2024-05-07'),
(25, 'mojibuvyvyvyv', '$2y$10$LioNM.Golt8YhB2caFWwkOcZ9WtWtJXUUB/73Y50N8v8CoJnOctyS', 'ububububyv@buhubub.cinib', '', '2024-05-07'),
(26, 'Valters', '$2y$10$roRIMcRg.MrXWthKW8j7tOHY0yOdYkEq/MVGMZUu5ObE1F9QfABPK', 'Valters@gmail.com', '', '2024-05-07'),
(27, 'Krupis', '$2y$10$QjlS0r3jAvSQl9mJwxX4/uteZRoOK8AKIRUs.SPfrvBML0.ltims6', 'Krupis@gmail.com', '', '2024-05-07'),
(28, 'Volters', '$2y$10$mWJnkO51EJQlBAXkSfHylO6hBVk6i2BHt8p2.yZ1xKVRgMHi0OD2m', 'Volters@gmail.com', '998500', '2024-05-07'),
(29, 'Uuuuuu', '$2y$10$Oe6rdVACJj6yo9NPzq/edOBHumfIqK.8Dp59yjamdkzXMHRYk8jTa', 'Uuuu@gmail.com', '', '2024-05-07');

-- --------------------------------------------------------

--
-- Table structure for table `user_skins`
--

CREATE TABLE `user_skins` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `skin_id` int(11) NOT NULL,
  `skin_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_skins`
--

INSERT INTO `user_skins` (`id`, `user_id`, `skin_id`, `skin_name`) VALUES
(59, 28, 3, 'Apple'),
(60, 28, 2, 'Dog'),
(61, 28, 4, 'Globe'),
(62, 28, 5, 'Toad'),
(63, 28, 8, 'Pig'),
(64, 28, 8, 'Pig'),
(65, 28, 6, 'Pickle'),
(66, 28, 9, 'Bacha'),
(67, 28, 10, 'Junko'),
(68, 28, 7, 'Rat');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `skins`
--
ALTER TABLE `skins`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_skins`
--
ALTER TABLE `user_skins`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `user_skins_ibfk_2` (`skin_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `skins`
--
ALTER TABLE `skins`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `user_skins`
--
ALTER TABLE `user_skins`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=69;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `user_skins`
--
ALTER TABLE `user_skins`
  ADD CONSTRAINT `user_skins_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `user_skins_ibfk_2` FOREIGN KEY (`skin_id`) REFERENCES `skins` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
