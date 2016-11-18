CREATE TABLE [dbo].[Participants]
(
	[Id] uniqueidentifier PRIMARY KEY NOT NULL,
	[UserId] uniqueidentifier NOT NULL,
	[EventId] uniqueidentifier NOT NULL
)
