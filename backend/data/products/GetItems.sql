SELECT B.[id]
      ,C.[name] as category
	  ,A.[name] as product
      ,B.[name] as variant
      ,[qty] 
      ,[image_location]
      ,[price]
  FROM 
  [dbo].[TblProduct] A Inner Join   
  [dbo].[TblVariant] B on A.id=B.product_id Inner Join
  [dbo].[TblCategory] C on A.product_category_id=C.id
  where B.active=1 and A.active=1 and C.active=1
