cordova build --release android


jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore sirs-mobile.keystore platforms/android/build/outputs/apk/android-armv7-release-unsigned.apk SIRS-Mobile



$ANDROID_HOME/build-tools/26.0.0/zipalign -v 4 platforms/android/build/outputs/apk/android-armv7-release-unsigned.apk SIRS-Mobile.apk

