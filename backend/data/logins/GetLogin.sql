IF EXISTS(Select * from [dbo].[TblUser] Where [UserName]=@UserName ) Begin
    IF EXISTS(Select * from [dbo].[TblUser] Where [UserName]=@UserName and [Password]=@Password ) Begin
SELECT 
       [UserName]
      ,[Password]
      ,[Role] as role
      ,[FullName]
      ,'success' as msg
  FROM [dbo].[TblUser] Where [UserName]=@UserName and [Password]=@Password
  END
ELSE Begin
SELECT 'Password Invalid' as msg
END
END
ELSE Begin
SELECT 'UserName Invalid' as msg
END
