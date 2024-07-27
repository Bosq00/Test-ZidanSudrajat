UPDATE [dbo].[TblCategory]
   SET [name] = @Name
      ,[active] = @Active
      ,[updated_user] = @FullName
      ,[updated_date] = GetDate()
 WHERE [id]=@ID

