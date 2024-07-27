SELECT A.[id]
      ,[plu]
      ,A.[name]
      ,A.[product_category_id] 
      ,B.[name] as category
      ,A.[active]
      ,A.[created_user]
      ,convert(varchar, A.[created_date], 113) as created_date
      ,A.[updated_user]
      ,convert(varchar, A.[updated_date], 113) as updated_date
  FROM [db_SAP].[dbo].[TblProduct] A INNER JOIN
  [db_SAP].[dbo].[TblCategory] B ON A.[product_category_id]=B.[id]