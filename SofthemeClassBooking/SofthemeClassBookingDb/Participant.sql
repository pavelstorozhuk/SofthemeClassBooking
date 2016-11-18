CREATE TABLE [dbo].[Participant]
(
	[Id] UNIQUEIDENTIFIER PRIMARY KEY,
	[UserId] UNIQUEIDENTIFIER NOT NULL,
	[EventId] UNIQUEIDENTIFIER NOT NULL
)
GO

ALTER TABLE [dbo].[Participant] ADD CONSTRAINT FK_participant_userid FOREIGN KEY ([UserId]) REFERENCES [dbo].[User](Id)
GO

ALTER TABLE [dbo].[Participant] ADD CONSTRAINT FK_participant_eventid FOREIGN KEY ([EventId]) REFERENCES [dbo].[Event](Id)
GO