/*
Скрипт развертывания для SofthemeClassBookingDatabase

Этот код был создан программным средством.
Изменения, внесенные в этот файл, могут привести к неверному выполнению кода и будут потеряны
в случае его повторного формирования.
*/

GO
SET ANSI_NULLS, ANSI_PADDING, ANSI_WARNINGS, ARITHABORT, CONCAT_NULL_YIELDS_NULL, QUOTED_IDENTIFIER ON;

SET NUMERIC_ROUNDABORT OFF;


GO
:setvar DatabaseName "SofthemeClassBookingDatabase"
:setvar DefaultFilePrefix "SofthemeClassBookingDatabase"
:setvar DefaultDataPath "C:\Program Files\Microsoft SQL Server\MSSQL13.SQLEXPRESS\MSSQL\DATA\"
:setvar DefaultLogPath "C:\Program Files\Microsoft SQL Server\MSSQL13.SQLEXPRESS\MSSQL\DATA\"

GO
:on error exit
GO
/*
Проверьте режим SQLCMD и отключите выполнение скрипта, если режим SQLCMD не поддерживается.
Чтобы повторно включить скрипт после включения режима SQLCMD выполните следующую инструкцию:
SET NOEXEC OFF; 
*/
:setvar __IsSqlCmdEnabled "True"
GO
IF N'$(__IsSqlCmdEnabled)' NOT LIKE N'True'
    BEGIN
        PRINT N'Для успешного выполнения этого скрипта должен быть включен режим SQLCMD.';
        SET NOEXEC ON;
    END


GO
USE [$(DatabaseName)];


GO
/*
Удаляется столбец [dbo].[Feedback].[Name], возможна потеря данных.

Необходимо добавить столбец [dbo].[Feedback].[Email] таблицы [dbo].[Feedback], но он не содержит значения по умолчанию и не допускает значения NULL. Если таблица содержит данные, скрипт ALTER окажется неработоспособным. Чтобы избежать возникновения этой проблемы, необходимо выполнить одно из следующих действий: добавить в столбец значение по умолчанию, пометить его как допускающий значения NULL или разрешить формирование интеллектуальных умолчаний в параметрах развертывания.

Необходимо добавить столбец [dbo].[Feedback].[FirstName] таблицы [dbo].[Feedback], но он не содержит значения по умолчанию и не допускает значения NULL. Если таблица содержит данные, скрипт ALTER окажется неработоспособным. Чтобы избежать возникновения этой проблемы, необходимо выполнить одно из следующих действий: добавить в столбец значение по умолчанию, пометить его как допускающий значения NULL или разрешить формирование интеллектуальных умолчаний в параметрах развертывания.

Необходимо добавить столбец [dbo].[Feedback].[LastName] таблицы [dbo].[Feedback], но он не содержит значения по умолчанию и не допускает значения NULL. Если таблица содержит данные, скрипт ALTER окажется неработоспособным. Чтобы избежать возникновения этой проблемы, необходимо выполнить одно из следующих действий: добавить в столбец значение по умолчанию, пометить его как допускающий значения NULL или разрешить формирование интеллектуальных умолчаний в параметрах развертывания.
*/

IF EXISTS (select top 1 1 from [dbo].[Feedback])
    RAISERROR (N'Обнаружены строки. Обновление схемы завершено из-за возможной потери данных.', 16, 127) WITH NOWAIT

GO
/*
Тип столбца Name в таблице [dbo].[Participant] на данный момент -  NVARCHAR (60) NOT NULL, но будет изменен на  NVARCHAR (50) NOT NULL. Данные могут быть утеряны.
*/

IF EXISTS (select top 1 1 from [dbo].[Participant])
    RAISERROR (N'Обнаружены строки. Обновление схемы завершено из-за возможной потери данных.', 16, 127) WITH NOWAIT

GO
PRINT N'Выполняется запуск перестройки таблицы [dbo].[Feedback]...';


GO
BEGIN TRANSACTION;

SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;

SET XACT_ABORT ON;

CREATE TABLE [dbo].[tmp_ms_xx_Feedback] (
    [Id]        INT             IDENTITY (1, 1) NOT NULL,
    [FirstName] NVARCHAR (50)   NOT NULL,
    [LastName]  NVARCHAR (50)   NOT NULL,
    [Email]     NVARCHAR (256)  NOT NULL,
    [Text]      NVARCHAR (3000) NOT NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC)
);

IF EXISTS (SELECT TOP 1 1 
           FROM   [dbo].[Feedback])
    BEGIN
        SET IDENTITY_INSERT [dbo].[tmp_ms_xx_Feedback] ON;
        INSERT INTO [dbo].[tmp_ms_xx_Feedback] ([Id], [Text])
        SELECT   [Id],
                 [Text]
        FROM     [dbo].[Feedback]
        ORDER BY [Id] ASC;
        SET IDENTITY_INSERT [dbo].[tmp_ms_xx_Feedback] OFF;
    END

DROP TABLE [dbo].[Feedback];

EXECUTE sp_rename N'[dbo].[tmp_ms_xx_Feedback]', N'Feedback';

COMMIT TRANSACTION;

SET TRANSACTION ISOLATION LEVEL READ COMMITTED;


GO
PRINT N'Выполняется изменение [dbo].[Participant]...';


GO
ALTER TABLE [dbo].[Participant] ALTER COLUMN [Name] NVARCHAR (50) NOT NULL;


GO
PRINT N'Обновление завершено.';


GO
