Option Explicit
On Error Resume Next

' ***                                                                      ***
' *                                                                          *
' * ATTENTION: Windows Users                                                 *
' *                                                                          *
' * Run this script to initialize the submodules of your repository
' *    From the command line: cscript install.vbs                            *
' ***                                                                      ***

Dim strWorkingDirectory, objShell, intReturnVal

' Set the working folder to the script location (i.e. the repo root)
strWorkingDirectory = GetDirectoryName(WScript.ScriptFullName)
Set objShell = WScript.CreateObject("WScript.Shell")
objShell.CurrentDirectory = strWorkingDirectory

' Initialze and update the submodules.
WScript.Echo "Getting git submodules"
intReturnVal = objShell.Run("git submodule init", 1, True)
If intReturnVal <> 0 Then
    WScript.Echo "Error initializing the submodules!"
    WScript.Quit 2
End If
intReturnVal = objShell.Run("git submodule sync", 1, True)
If intReturnVal <> 0 Then
    WScript.Echo "Error syncing the submodules!"
    WScript.Quit 6
End If
intReturnVal = objShell.Run("git submodule update --init --recursive", 1, True)
If intReturnVal <> 0 Then
    WScript.Echo "Error updating the submodules!"
    WScript.Quit 3
End If

'Install npm dependencies.
WScript.Echo vbCrLf & "Installing npm dependencies"
'The following line is the equivalent of "cd app"
objShell.CurrentDirectory = strWorkingDirectory & "\app"
intReturnVal = objShell.Run("npm install", 1, True)
If intReturnVal <> 0 Then
    WScript.Echo "Error in running npm install!"
    WScript.Quit 6
End If

'Copy js files to app/js folder'
'The following line is the equivalent of "cd .."
objShell.CurrentDirectory = strWorkingDirectory
WScript.Echo vbCrLf & "Getting js files"
intReturnVal = objShell.Run("copy external\shared\libs\react.* app\js\", 1, True)
If intReturnVal <> 0 Then
    WScript.Echo "Error in copying js files!"
    WScript.Quit 3
End If

'Run install.vbs on the SalesforceMobileSDK-Android clone
objShell.CurrentDirectory = strWorkingDirectory & "\external\android"
WScript.Echo vbCrLf & "Running install script for SalesforceMobileSDK-Android clone"
intReturnVal = objShell.run("cscript install.vbs", 1, True)
If intReturnVal <> 0 Then
    WScript.Echo "Error in running install.vbs for SalesforceMobileSDK-Android clone!"
    WScript.Quit 6
End If

WScript.Quit 0


' -------------------------------------------------------------------
' - Gets the directory name, from a file path.
' -------------------------------------------------------------------
Function GetDirectoryName(ByVal strFilePath)
    Dim strFinalSlash
    strFinalSlash = InStrRev(strFilePath, "\")
    If strFinalSlash = 0 Then
        GetDirectoryName = strFilePath
    Else
        GetDirectoryName = Left(strFilePath, strFinalSlash)
    End If
End Function
