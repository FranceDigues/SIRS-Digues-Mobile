#!/usr/bin/env bash

# Android SDK require 32bit library.
sudo apt-get install lib32z1 lib32ncurses5 lib32bz2-1.0

# Install Node Modules.
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
sudo npm install -g q
sudo npm install --save-dev main-bower-files
sudo npm install --save-dev event-

# Download vendor libraries.
bower install --allow-root

# Remove Fabric.js gzipped file (causes conflict on build).
rm ./www/lib/fabric/dist/fabric.min.js.gz

# Prepare Ionic platform.
ionic platfrom add android
ionic browser add crosswalk
ionic add ionic-service-core
ionic add ionic-service-deploy

# Clone sources of external plugins.
pushd ../../
    mkdir EXTERNAL_GIT_DEP
    pushd ./EXTERNAL_GIT_DEP
        git clone https://github.com/pwlin/cordova-plugin-file-opener2.git
        git clone https://github.com/driftyco/ionic-plugins-deploy.git
        git clone https://github.com/devgeeks/Canvas2ImagePlugin.git
        git clone http://gitlab.geomatys.com/cmourette/geolocation-cordova.git
    popd
popd
