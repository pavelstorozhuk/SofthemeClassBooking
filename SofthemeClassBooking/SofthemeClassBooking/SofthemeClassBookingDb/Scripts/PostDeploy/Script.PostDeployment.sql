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

INSERT INTO ClassRoom(Name) VALUES ('HR office');
GO
INSERT INTO ClassRoom(Name) VALUES ('Einstein Classroom');
GO
INSERT INTO ClassRoom(Name) VALUES ('Info Центр');
GO
INSERT INTO ClassRoom(Name) VALUES ('Web & Marketing');
GO
INSERT INTO ClassRoom(Name) VALUES ('HR office');
GO
INSERT INTO ClassRoom(Name) VALUES ('English');
GO
INSERT INTO ClassRoom(Name) VALUES ('Tesla Classroom');
GO
INSERT INTO ClassRoom(Name) VALUES ('Newton Classroom');
GO
