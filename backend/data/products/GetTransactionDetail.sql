SELECT A.[id]
	  ,D.[name] as product
      ,C.[name] as variant
      ,A.[price]
      ,A.[qty]
      ,A.[subtotal]
  FROM [db_SAP].[dbo].[TblTransactionDetail] A Inner Join
  [db_SAP].[dbo].[TblTransactionHeader] B ON A.transaction_id=B.id Inner Join
  [db_SAP].[dbo].[TblVariant] C on A.product_variant_id=C.id Inner Join
  [db_SAP].[dbo].[TblProduct] D on C.product_id=D.id INNER JOIN
  [db_SAP].[dbo].[TblCategory] E ON D.product_category_id=E.id
  Where A.[transaction_id]=@ID