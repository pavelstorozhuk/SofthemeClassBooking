﻿CREATE TABLE [dbo].[UserRole]
(
	[Id] UNIQUEIDENTIFIER PRIMARY KEY,
	[UserId] UNIQUEIDENTIFIER NOT NULL,
	[RoleId] UNIQUEIDENTIFIER NOT NULL
)
GO

ALTER TABLE [dbo].[UserRole] ADD CONSTRAINT FK_userrole_userid FOREIGN KEY ([UserId]) REFERENCES [dbo].[User](Id)
GO

ALTER TABLE [dbo].[UserRole] ADD CONSTRAINT FK_userrole_roleid FOREIGN KEY ([RoleId]) REFERENCES [dbo].[Role](Id)
GO