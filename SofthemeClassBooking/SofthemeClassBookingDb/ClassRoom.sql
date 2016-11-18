CREATE TABLE [dbo].[ClassRoom]
(
	[Id] uniqueidentifier PRIMARY KEY NOT NULL,
	[Name] nvarchar(30) NOT NULL,
	[Capacity] tinyint DEFAULT 0,
	[PcCount] tinyint DEFAULT 0,
	[PrinterCount] tinyint DEFAULT 0,
	[ProjectorCount] tinyint DEFAULT 0,
	[DeskCount] tinyint DEFAULT 0,
	[Status] tinyint NOT NULL
)
