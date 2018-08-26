#!/usr/bin/env bash

# Install Node Modules.
npm install

# Download vendor libraries.
bower install

# Remove Fabric.js gzipped file (causes error on build/run).
rm ./www/lib/fabric/dist/fabric.min.js.gz

# Configure Ionic platform.
ionic platform add android@6.4.0

# Clone sources of external plugins.
pushd ../../
    mkdir EXTERNAL_GIT_DEP
    pushd ./EXTERNAL_GIT_DEP
        git clone http://gitlab.geomatys.com/cmourette/geolocation-cordova.git
    popd
popd
