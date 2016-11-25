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

INSERT INTO ClassRooms(Name) VALUES ('HR office');
GO
INSERT INTO ClassRooms(Name) VALUES ('Einstein Classroom');
GO
INSERT INTO ClassRooms(Name) VALUES (N'Info Центр');
GO
INSERT INTO ClassRooms(Name) VALUES ('Web & Marketing');
GO
INSERT INTO ClassRooms(Name) VALUES ('HR office');
GO
INSERT INTO ClassRooms(Name) VALUES ('English');
GO
INSERT INTO ClassRooms(Name) VALUES ('Tesla Classroom');
GO
INSERT INTO ClassRooms(Name) VALUES ('Newton Classroom');
GO
