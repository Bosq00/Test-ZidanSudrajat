Declare @TranNo varchar(50)
Declare @Seq int
SET @Seq=(SELECT ISNULL(MAX(id),0)+1 from [dbo].[TblTransactionHeader])
Set @TranNo=(
SELECT 'TR'+CAST(RIGHT(YEAR(GetDate()),2) AS VARCHAR)+'N'+ 
Case When @Seq < 10 Then '0000'+CAST(@Seq as Varchar)
When @Seq < 100 Then '000'+CAST(@Seq as Varchar)
When @Seq < 1000 Then '00'+CAST(@Seq as Varchar)
When @Seq < 10000 Then '0'+CAST(@Seq as Varchar)
When @Seq < 100000 Then CAST(@Seq as Varchar)END)

INSERT INTO [dbo].[TblTransactionHeader]
           ([transaction_no]
           ,[total_amount]
           ,[active]
           ,[created_user]
           ,[created_date]
           ,[updated_user]
           ,[updated_date])
     VALUES
           (@TranNo
           ,@Total_Amount
           ,1
           ,@FullName
           ,GETDATE()
           ,@FullName
           ,GETDATE())

Select [id] from [dbo].[TblTransactionHeader] where [transaction_no]=@TranNo
