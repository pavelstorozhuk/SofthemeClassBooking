CREATE TABLE [dbo].[Feedback]
(
	[Id] uniqueidentifier PRIMARY KEY NOT NULL,
	[Name] nvarchar(50) NOT NULL,
	[Text] nvarchar(max) NOT NULL
)
