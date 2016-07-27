targetDir=../app/src/main/assets/MainUI

rm -r $targetDir
mkdir -p $targetDir
cp ./index.html $targetDir/index.html
cp ./bundle.js $targetDir/bundle.js
cp -r ./style $targetDir/style
cp -r ./resource $targetDir/resource
