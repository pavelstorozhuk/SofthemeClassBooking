﻿CREATE TABLE [Events]
(
 [Id] INT PRIMARY KEY IDENTITY NOT NULL,
 [Title] NVARCHAR(100) NOT NULL,
 [UserId] NVARCHAR(128) NOT NULL,
 [ClassRoomId] INT NOT NULL,
 [Organizer] NVARCHAR (50) NULL,
 [BeginingDate] DATETIME NOT NULL,
 [EndingDate] DATETIME NOT NULL,
 [Description] NVARCHAR(300) NULL,
 [IsPrivate] BIT DEFAULT 1 NOT NULL,
 [IsAuthorShown] BIT DEFAULT 1 NOT NULL, 
 [IsParticipantsAllowed] BIT DEFAULT 1 NOT NULL
)
GO


ALTER TABLE [Events] ADD CONSTRAINT FK_Event_User FOREIGN KEY (UserId)  REFERENCES [AspNetUsers](Id)
GO
ALTER TABLE [Events] ADD CONSTRAINT FK_Event_Room FOREIGN KEY (ClassRoomId)  REFERENCES [ClassRooms](Id)
GO