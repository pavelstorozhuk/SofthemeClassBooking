﻿CREATE TABLE [Feedback]
(
 [Id]  INT PRIMARY KEY  IDENTITY NOT NULL,
 [Name] NVARCHAR(50) NOT NULL,
 [Surname] NVARCHAR(50) NOT NULL,
 [Email] varchar(50) NOT NULL,
 [Text] NVARCHAR(3000) NOT NULL
)
GO
