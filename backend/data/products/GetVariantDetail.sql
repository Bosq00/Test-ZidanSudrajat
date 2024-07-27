SELECT A.[id]
      ,A.[product_id]
      ,B.[name] as product
      ,A.[code]
      ,A.[name]
      ,A.[qty]
      ,A.[image_location]
      ,A.[price]
      ,A.[active]
      ,convert(varchar, A.[created_user], 113) as created_date
      ,A.[created_date]
      ,A.[updated_user]
      ,convert(varchar, A.[updated_date], 113) as updated_date 
  FROM [db_SAP].[dbo].[TblVariant] A INNER JOIN
 [db_SAP].[dbo].[TblProduct] B ON A.product_id=B.id
 Where A.[id]=@ID