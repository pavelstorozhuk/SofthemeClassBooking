CREATE TABLE [dbo].[Event]
(
	[Id] uniqueidentifier PRIMARY KEY NOT NULL,
	[OwnerUserId] uniqueidentifier NOT NULL,
	[ClassRoomId] uniqueidentifier NOT NULL,
	[Organizer] nvarchar(50) NULL,
	[DateTime] datetime NOT NULL,
	[Title] nvarchar(100) NOT NULL,
	[Description] nvarchar(200) NULL,
	[IsPublic] tinyint,
	[IsAuthorShown] tinyint,
	[Status] tinyint NOT NULL
)
