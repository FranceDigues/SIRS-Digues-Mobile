#!/usr/bin/env bash
#update source external plugin
pushd ../../EXTERNAL_GIT_DEP
    for i in ./* ; do
      if [ -d "$i" ]; then
      pushd $i
        git pull
       popd
      fi
    done
popd




#install plugin
ionic plugin add cordova-plugin-file ;
ionic plugin add com.ionic.keyboard ;
ionic plugin add cordova-plugin-console ;
ionic plugin add cordova-plugin-crosswalk-webview ;
ionic plugin add cordova-plugin-device ;
ionic plugin add cordova-plugin-dialogs ;
ionic plugin add cordova-plugin-file-transfer ;
ionic plugin add cordova-plugin-geolocation ;
ionic plugin add cordova-plugin-media ;
ionic plugin add cordova-plugin-media-capture ;
ionic plugin add cordova-plugin-network-information ;
ionic plugin add cordova-plugin-splashscreen ;
ionic plugin add cordova-plugin-whitelist ;
ionic plugin add org.apache.cordova.camera ;

#add external plugin
ionic plugin add ../pulgin/cacheMap/ ;
ionic plugin add ../../EXTERNAL_GIT_DEP/ionic-plugins-deploy  ;
ionic plugin add ../../EXTERNAL_GIT_DEP/cordova-plugin-file-opener2   ;
