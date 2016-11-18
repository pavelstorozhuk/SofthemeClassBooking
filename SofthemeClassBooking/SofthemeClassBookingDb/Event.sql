CREATE TABLE [dbo].[Event]
(
	[Id] uniqueidentifier PRIMARY KEY NOT NULL,
	[UserId] uniqueidentifier NOT NULL,
	[ClassRoomId] uniqueidentifier NOT NULL,
	[Organizer] nvarchar(50) NULL,
	[BeginDateTime] datetime NOT NULL,
	[EndDateTime] datetime NOT NULL,
	[Title] nvarchar(100) NOT NULL,
	[Description] nvarchar(200) NULL,
	[IsPublic] bit DEFAULT 1,
	[IsAuthorShown] bit DEFAULT 1
)
GO

ALTER TABLE [dbo].[Event] ADD CONSTRAINT FK_event_userid FOREIGN KEY ([UserId]) REFERENCES [dbo].[User](Id)
GO

ALTER TABLE [dbo].[Event] ADD CONSTRAINT FK_event_classroomid FOREIGN KEY ([ClassRoomId]) REFERENCES [dbo].[ClassRoom](Id)
GO