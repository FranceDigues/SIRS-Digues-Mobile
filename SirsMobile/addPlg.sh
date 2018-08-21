#!/usr/bin/env bash

# @hb Modification
# Install plugins from repository.
#ionic plugin add com.ionic.keyboard@1.0.4; // Deprecated
#ionic plugin add org.apache.cordova.camera@0.3.6;// Deprecated

ionic plugin add ionic-plugin-keyboard@1.0.4;
ionic plugin add cordova-plugin-console@1.0.2;
ionic plugin add cordova-plugin-crosswalk-webview@1.4.0;
ionic plugin add cordova-plugin-device@1.1.0;
ionic plugin add cordova-plugin-file@3.0.0;
ionic plugin add cordova-plugin-fileopener@1.0.3;
ionic plugin add cordova-plugin-media@1.0.1;
ionic plugin add cordova-plugin-media-capture@1.1.0;
ionic plugin add cordova-plugin-network-information@1.1.0;
ionic plugin add cordova-plugin-splashscreen@3.0.0;
ionic plugin add cordova-plugin-whitelist@1.2.0;
ionic plugin add cordova-plugin-camera@0.3.6;
cordova plugin add cordova-plugin-x-toast@2.6.0
cordova plugin add cordova-plugin-geolocation@2.4.1;

# Plugin for use SQLite Adapter
#cordova plugin add cordova-sqlite-storage@2.0.1;

cordova plugin add cordova-sqlite-storage@2.1.5;

#cordova plugin add cordova-plugin-sqlite-2@1.0.5;



# Install plugins from their sources.
ionic plugin add ../pulgin/cacheMap/;
ionic plugin add ../../EXTERNAL_GIT_DEP/Canvas2ImagePlugin;


ionic plugin add cordova-plugin-googleplayservices;
ionic plugin add cordova-android-support-v4;
ionic plugin add ../../EXTERNAL_GIT_DEP/geolocation-cordova;

