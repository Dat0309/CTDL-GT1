CREATE EVENT SESSION [$rawname$]
	ON SERVER
	ADD EVENT [$SomeEventPackage$].[$SomeEvent$]
	ADD TARGET [$SomeEventPackage$].[$SomeTarget$]
