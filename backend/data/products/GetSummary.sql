  Declare @total_amount decimal(18,0),@category int,@product int,@variant int
  SET @total_amount=(
  SELECT  
  sum([total_amount]) as total
  FROM [dbo].[TblTransactionHeader] where active=1)
  SET @category=(
  SELECT
  count([name])
  FROM [dbo].[TblCategory] where active=1)
  SET @product=(
    SELECT
  count([name])
  FROM [dbo].[TblProduct] where active=1)
  SET @variant=(
    SELECT
  count([name])
  FROM [dbo].[TblVariant] where active=1)

  SELECT 'summary' as name,@total_amount as total_amount,@category as category,@product as product,@variant as variant

