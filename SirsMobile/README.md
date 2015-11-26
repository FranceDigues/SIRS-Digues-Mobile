# SIRS Mobile

## Pré-requis

Installer **Android SDK** : http://developer.android.com/sdk/installing/index.html

Définir la variable d'environnement **ANDROID_HOME**.

Installer **NodeJS**.

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

http://geouser:geopw@5.196.17.92:5984/

## Réinstallation

Executer les 3 commandes suivantes :

```
rm -rf platforms/ plugins/
ionic platform add android
./addPlg.sh
```

## Deploiement de l'APK

TODO


