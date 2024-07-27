INSERT INTO [dbo].[TblProduct]
           ([plu]
           ,[name]
           ,[product_category_id]
           ,[active]
           ,[created_user]
           ,[created_date]
           ,[updated_user]
           ,[updated_date])
     VALUES
           (@Plu
           ,@Name
           ,@Category_ID
           ,@Active
           ,@Fullname
           ,GetDate()
           ,@Fullname
           ,GetDate())


