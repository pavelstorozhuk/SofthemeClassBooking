﻿CREATE TABLE [ClassRooms]
(
 [Id] INT PRIMARY KEY IDENTITY NOT NULL,
 [Name] NVARCHAR (30) NOT NULL,
 [Capacity] TINYINT DEFAULT 0,
 [QuantityOfBoards] TINYINT DEFAULT 0,
 [QuantityOfPrinters] TINYINT DEFAULT 0,
 [QuantityOfTables] TINYINT DEFAULT 0,
 [QuantityOfLaptops] TINYINT DEFAULT 0,
 [IsLocked]   BIT DEFAULT 0

)