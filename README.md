Multiple ways to run files on vscode

Method 1) <-recomended way to run both html javascript and css
1. Install the live surver on vscode extensions
2. Click go live on login.html file


Some Other methods if you want to try

Method 2) if you only want to run html and not javascript
1. Go to login.html (Or any other page you want to test without javascript)
2. Open Terminal
3. Type in Terminal start login.html (Or any other page you want to test without javascript)


Method 3) if you want to use code runner instead (I personality had mixed results with this)

1. Install the code runner on vscode extensions
2. Go to file -> preference -> settings
3. Click on Open Settings (JSON) on the top right hand corner next to the triangle run code
4. type code and then select code-runner.excutormap
5. scroll up to top and type "html": cd $dir && start chrome $fileName
6. Click Run Code on login.html file
