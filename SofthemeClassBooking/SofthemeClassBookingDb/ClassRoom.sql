CREATE TABLE [dbo].[ClassRoom]
(
	[Id] uniqueidentifier PRIMARY KEY NOT NULL,
	[Name] nvarchar(30) NOT NULL,
	[Capacity] tinyint,
	[PcCount] tinyint,
	[PrinterCount] tinyint,
	[ProjectorCount] tinyint,
	[DeskCount] tinyint,
	[Status] tinyint NOT NULL
)
