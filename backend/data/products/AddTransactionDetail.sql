INSERT INTO [dbo].[TblTransactionDetail]
           ([transaction_id]
           ,[product_variant_id]
           ,[price]
           ,[qty]
           ,[subtotal]
           ,[active]
           ,[created_user]
           ,[created_date]
           ,[updated_user]
           ,[updated_date])
     VALUES
           (@Transaction_ID
           ,@Product_Variant_ID
           ,@Price
           ,@Qty
           ,@Price*@Qty
           ,1
           ,@FullName
           ,GETDATE()
           ,@FullName
           ,GETDATE())
           
UPDATE [dbo].[TblVariant]
   SET [qty] = [qty]-@Qty
      ,[updated_user] = @FullName
      ,[updated_date] = GetDate()
 WHERE [id]=@Product_Variant_ID