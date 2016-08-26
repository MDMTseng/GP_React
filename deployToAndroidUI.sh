targetDir=../app/src/main/assets/MainUI

#rm -r $targetDir
#mkdir -p $targetDir

rm $targetDir/index.html
rm $targetDir/bundle.js
cp ./index.html $targetDir/index.html
cp ./bundle.js $targetDir/bundle.js


rm -r $targetDir/style
cp -r ./style $targetDir/style
date -u
#cp -r ./resource $targetDir/resource
