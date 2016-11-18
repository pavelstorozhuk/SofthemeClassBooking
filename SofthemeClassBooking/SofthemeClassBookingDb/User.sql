CREATE TABLE [dbo].[User]
(
	[Id] UNIQUEIDENTIFIER PRIMARY KEY,
	[UserName] nvarchar(256) NOT NULL,
	[FirstName] nvarchar(50) NOT NULL,
	[LastName] nvarchar(50) NOT NULL,
	[Email] nvarchar(256) NOT NULL,
	[PasswordHash] nvarchar(max) NOT NULL,
)
GO