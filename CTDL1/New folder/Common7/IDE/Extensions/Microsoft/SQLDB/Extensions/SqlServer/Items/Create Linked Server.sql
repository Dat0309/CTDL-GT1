EXECUTE sp_addlinkedserver @server = N'$rawname$'
GO
EXECUTE sp_addlinkedsrvlogin @rmtsrvname = N'$rawname$'
