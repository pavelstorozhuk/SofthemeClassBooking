/*
Post-Deployment Script Template							
--------------------------------------------------------------------------------------
 This file contains SQL statements that will be appended to the build script.		
 Use SQLCMD syntax to include a file in the post-deployment script.			
 Example:      :r .\myfile.sql								
 Use SQLCMD syntax to reference a variable in the post-deployment script.		
 Example:      :setvar TableName MyTable							
               SELECT * FROM [$(TableName)]					
--------------------------------------------------------------------------------------
*/

DELETE FROM dbo.AspNetRoles;
GO

INSERT INTO dbo.AspNetRoles VALUES ('8c8e87db-d982-4aaf-a84e-9ea54105f220', 'admin');
GO

INSERT INTO dbo.AspNetRoles VALUES ('2dd3c8f2-1620-4510-818a-a3dc37e5b7c0','user');
GO

INSERT INTO ClassRooms(Name) VALUES ('');
GO
INSERT INTO ClassRooms(Name) VALUES ('HR office');
GO
INSERT INTO ClassRooms(Name) VALUES ('Einstein Classroom');
GO
INSERT INTO ClassRooms(Name) VALUES (N'Info Центр');
GO
INSERT INTO ClassRooms(Name) VALUES ('Web & Marketing');
GO
INSERT INTO ClassRooms(Name) VALUES ('Web & Marketing');
GO
INSERT INTO ClassRooms(Name) VALUES ('Web & Marketing');
GO
INSERT INTO ClassRooms(Name) VALUES ('English');
GO
INSERT INTO ClassRooms(Name) VALUES ('Tesla Classroom');
GO
INSERT INTO ClassRooms(Name) VALUES ('Newton Classroom');
GO
