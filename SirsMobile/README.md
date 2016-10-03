# SIRS Mobile

## Pré-requis

Installer **Android SDK** : http://developer.android.com/sdk/installing/index.html

Définir la variable d'environnement **ANDROID_HOME**.

Installer **NodeJS**.

Installer **Bower**.

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
ionic platform add android
./addPlg.sh
```

## Générer l'APK

Executer les commandes suivantes :

```
cordova plugin rm cordova-plugin-console
cordova build --release android
keytool -genkey -v -keystore sirs-mobile.keystore -alias SIRS-Mobile -keyalg RSA -keysize 2048 -validity 10000
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore sirs-mobile.keystore platforms/android/build/outputs/apk/android-release-unsigned.apk SIRS-Mobile
$PATH_TO_SDK/build-tools/$SDK_VERSION/zipalign -v 4 platforms/android/build/outputs/apk/android-release-unsigned.apk SIRS-Mobile.apk
```

Il est conseillé d'inclure le numéro de version de l'application dans le nom de l'APK.

Pour plus d'informations : http://ionicframework.com/docs/guide/publishing.html


