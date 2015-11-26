#!/usr/bin/env bash

# Update source of external plugins.
pushd ../../EXTERNAL_GIT_DEP
    for i in ./* ; do
        if [ -d "$i" ]; then
            pushd $i
                git pull
            popd
        fi
    done
popd

# Install plugins from repository.
ionic plugin add com.ionic.keyboard@1.0.4;
ionic plugin add cordova-plugin-console@1.0.2;
ionic plugin add cordova-plugin-crosswalk-webview@1.4.0;
ionic plugin add cordova-plugin-device@1.1.0;
ionic plugin add cordova-plugin-dialogs@1.2.0;
ionic plugin add cordova-plugin-file@3.0.0;
ionic plugin add cordova-plugin-fileopener@1.0.3;
ionic plugin add cordova-plugin-file-transfer@1.4.0;
ionic plugin add cordova-plugin-media@1.0.1;
ionic plugin add cordova-plugin-media-capture@1.1.0;
ionic plugin add cordova-plugin-network-information@1.1.0;
ionic plugin add cordova-plugin-splashscreen@3.0.0;
ionic plugin add cordova-plugin-whitelist@1.2.0;
ionic plugin add org.apache.cordova.camera@0.3.6;

# Install plugins from their sources.
ionic plugin add ../pulgin/cacheMap/;
ionic plugin add ../../EXTERNAL_GIT_DEP/Canvas2ImagePlugin;
ionic plugin add ../../EXTERNAL_GIT_DEP/geolocation-cordova;

