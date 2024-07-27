
INSERT INTO [dbo].[TblCategory]
           ([name]
           ,[active]
           ,[created_user]
           ,[created_date]
           ,[updated_user]
           ,[updated_date])
     VALUES
           (@Name
           ,@Active
           ,@FullName
           ,GetDate()
           ,@FullName
           ,Getdate())

