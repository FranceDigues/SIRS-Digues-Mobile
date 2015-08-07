#!/usr/bin/env bash
npm install -g cordova
npm install -g ionic
npm install -g bower
npm install -g gulp
npm install -g shelljs
npm install -g gulp-util
npm install -g gulp-sass
npm install -g gulp-rename
npm install -g gulp-minify-css
npm install -g gulp-concat
npm install q


npm install --save-dev main-bower-files
npm install --save-dev event-

bower install --allow-root

ionic platfrom add android
ionic browser add crosswalk
ionic add ionic-service-core
ionic add ionic-service-deploy

pushd ../../
    mkdir EXTERNAL_GIT_DEP
    pushd ./EXTERNAL_GIT_DEP
        git clone  https://github.com/pwlin/cordova-plugin-file-opener2.git
        git clone  https://github.com/driftyco/ionic-plugins-deploy.git
    popd
popd
