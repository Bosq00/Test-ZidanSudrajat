UPDATE [dbo].[TblVariant]
   SET [code] = @Code
      ,[name] = @Name
      ,[qty] = @Qty
      ,[image_location] = @Image_Location
      ,[price] = @Price
      ,[active] = @Active
      ,[updated_user] = @FullName
      ,[updated_date] = GetDate()
 WHERE [id]=@id

