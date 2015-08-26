#!/usr/bin/env bash
#android sdk need 32bit lib
sudo apt-get install lib32z1 lib32ncurses5 lib32bz2-1.0

sudo npm install -g cordova
sudo npm install -g ionic
sudo npm install -g bower
sudo npm install -g gulp
sudo npm install -g shelljs
sudo npm install -g gulp-util
sudo npm install -g gulp-sass
sudo npm install -g gulp-rename
sudo npm install -g gulp-minify-css
sudo npm install -g gulp-concat
sudo npm install q


sudo npm install --save-dev main-bower-files
sudo npm install --save-dev event-

bower install --allow-root
#rm fabric js gz (not extention analisis on building. gz init a conflict...)
rm ./www/lib/fabric/dist/fabric.min.js.gz


ionic platfrom add android
ionic browser add crosswalk
ionic add ionic-service-core
ionic add ionic-service-deploy

pushd ../../
    mkdir EXTERNAL_GIT_DEP
    pushd ./EXTERNAL_GIT_DEP
        git clone  https://github.com/pwlin/cordova-plugin-file-opener2.git
        git clone  https://github.com/driftyco/ionic-plugins-deploy.git
        git clone  https://github.com/devgeeks/Canvas2ImagePlugin.git
    popd
popd
