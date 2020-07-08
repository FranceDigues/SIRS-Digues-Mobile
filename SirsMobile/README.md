# SIRS Mobile

## Pré-requis

Installer **Android SDK** : http://developer.android.com/sdk/installing/index.html

Définir la variable d'environnement **ANDROID_HOME**.

Installer **NodeJS <= 6**.

**Pre-install gradle in the system** 

sudo apt-get install gradle

Installer **Bower 1.6.6**.

Installer **Cordova 8.0.0**.

Installer **Ionic 1.7.16**.



## Première installation

Executer les 2 commandes suivantes :

```
./setup.sh
./addPlg.sh
```

## Lancement de l'application

Executer la commande suivante :

```
ionic run android
```

Ajouter l'option **-l** pour activer le livereload.

## Serveur de test

Pour tester avec une base de données couchDB il faut écrire l'url vers la base de données en suivie se pattern :

http://geouser:geopw@IP_Machine:5984/data_base_name

http://geouser:geopw@51.255.38.183:5984/

## Réinstallation

Executer les 3 commandes suivantes :

```
rm -rf platforms/ plugins/
ionic platform add android@6.3.0
./addPlg.sh
```

## Générer l'APK

En cas de problème lors de l'exécution de la commande de build, rendez-vous dans `./platforms/android/build.gradle` et dans les objets `repository` mettez `jcenter()` après la propriété `maven`.

Executer les commandes suivantes :

```
cordova plugin rm cordova-plugin-console
cordova build --release android
keytool -genkey -v -keystore sirs-mobile.keystore -alias SIRS-Mobile -keyalg RSA -keysize 2048 -validity 10000
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore sirs-mobile.keystore platforms/android/build/outputs/apk/android-release-unsigned.apk SIRS-Mobile
`$PATH_TO_SDK/build-tools/$SDK_VERSION/zipalign -v 4 platforms/android/build/outputs/apk/android-release-unsigned.apk SIRS-Mobile.apk`
```

Le type d'apk utilisé est ARMV7.

Il est conseillé d'inclure le numéro de version de l'application dans le nom de l'APK.

Pour plus d'informations : http://ionicframework.com/docs/guide/publishing.html

## Make 64-bits architecture Support for Google play publish

In the directory SirsMobile/platforms/android/build/outputs/apk :

1- Convert the file android-armv7-release-unsigned.apk to android-armv7-release-unsigned.zip and unzip the file

2- Make a Copy of the directory android-armv7-release-unsigned/lib/armeabi-v7a/ and rename it arm64-v8a/

3- Save the modifications and reconvert the file android-armv7-release-unsigned.zip to android-armv7-release-unsigned.apk

4- use the tool zipalign to align the file :

```  
zipalign -v 4 android-armv7-release-unsigned.apk signed.apk  
``` 

5- Rebuild the apk from signed.apk file 
```
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore sirs-mobile.keystore platforms/android/build/outputs/apk/signed.apk SIRS-Mobile

$ANDROID_HOME/build-tools/26.0.0/zipalign -v 4 platforms/android/build/outputs/apk/signed.apk SIRS-Mobile.apk

```
