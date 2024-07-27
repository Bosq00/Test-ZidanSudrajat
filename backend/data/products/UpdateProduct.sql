UPDATE [dbo].[TblProduct]
   SET [plu] = @Plu
      ,[name] = @Name
      ,[product_category_id] = @Category_ID
      ,[active] = @Active
      ,[updated_user] = @FullName
      ,[updated_date] = GETDATE()
 WHERE [id]=@ID

