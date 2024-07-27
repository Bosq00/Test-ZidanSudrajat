INSERT INTO [dbo].[TblVariant]
           ([product_id]
           ,[code]
           ,[name]
           ,[qty]
           ,[image_location]
           ,[price]
           ,[active]
           ,[created_user]
           ,[created_date]
           ,[updated_user]
           ,[updated_date])
     VALUES
           (@Product_ID
           ,@Code
           ,@Name
           ,@Qty
           ,@Image_Location
           ,@Price
           ,@Active
           ,@Fullname
           ,GetDate()
           ,@Fullname
           ,GetDate())


