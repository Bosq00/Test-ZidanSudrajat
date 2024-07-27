SELECT [id]
      ,[name]
      ,[active]
      ,[created_user]
      ,convert(varchar, [created_date], 113) as created_date
      ,[updated_user]
      ,convert(varchar, [updated_date], 113) as updated_date
  FROM [db_SAP].[dbo].[TblCategory]