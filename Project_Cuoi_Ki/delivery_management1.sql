-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th12 14, 2024 lúc 06:09 AM
-- Phiên bản máy phục vụ: 10.4.32-MariaDB
-- Phiên bản PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `delivery_management`
--
CREATE DATABASE IF NOT EXISTS `delivery_management` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `delivery_management`;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `district`
--
-- Error reading structure for table delivery_management.district: #1932 - Table 'delivery_management.district' doesn't exist in engine
-- Error reading data for table delivery_management.district: #1064 - You have an error in your SQL syntax; check the manual that corresponds to your MariaDB server version for the right syntax to use near 'FROM `delivery_management`.`district`' at line 1

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `item`
--
-- Error reading structure for table delivery_management.item: #1932 - Table 'delivery_management.item' doesn't exist in engine
-- Error reading data for table delivery_management.item: #1064 - You have an error in your SQL syntax; check the manual that corresponds to your MariaDB server version for the right syntax to use near 'FROM `delivery_management`.`item`' at line 1

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `orders`
--
-- Error reading structure for table delivery_management.orders: #1932 - Table 'delivery_management.orders' doesn't exist in engine
-- Error reading data for table delivery_management.orders: #1064 - You have an error in your SQL syntax; check the manual that corresponds to your MariaDB server version for the right syntax to use near 'FROM `delivery_management`.`orders`' at line 1

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `payment_type`
--
-- Error reading structure for table delivery_management.payment_type: #1932 - Table 'delivery_management.payment_type' doesn't exist in engine
-- Error reading data for table delivery_management.payment_type: #1064 - You have an error in your SQL syntax; check the manual that corresponds to your MariaDB server version for the right syntax to use near 'FROM `delivery_management`.`payment_type`' at line 1

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `province`
--
-- Error reading structure for table delivery_management.province: #1932 - Table 'delivery_management.province' doesn't exist in engine
-- Error reading data for table delivery_management.province: #1064 - You have an error in your SQL syntax; check the manual that corresponds to your MariaDB server version for the right syntax to use near 'FROM `delivery_management`.`province`' at line 1

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `shippers`
--
-- Error reading structure for table delivery_management.shippers: #1932 - Table 'delivery_management.shippers' doesn't exist in engine
-- Error reading data for table delivery_management.shippers: #1064 - You have an error in your SQL syntax; check the manual that corresponds to your MariaDB server version for the right syntax to use near 'FROM `delivery_management`.`shippers`' at line 1

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `users`
--
-- Error reading structure for table delivery_management.users: #1932 - Table 'delivery_management.users' doesn't exist in engine
-- Error reading data for table delivery_management.users: #1064 - You have an error in your SQL syntax; check the manual that corresponds to your MariaDB server version for the right syntax to use near 'FROM `delivery_management`.`users`' at line 1

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `ward`
--
-- Error reading structure for table delivery_management.ward: #1932 - Table 'delivery_management.ward' doesn't exist in engine
-- Error reading data for table delivery_management.ward: #1064 - You have an error in your SQL syntax; check the manual that corresponds to your MariaDB server version for the right syntax to use near 'FROM `delivery_management`.`ward`' at line 1
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
