#init project on linux machine:
./nodeConf.sh

#you need just 2 other task
# * install android SDK
# * define ANDROID_HOME path

#test Server
5.196.17.92
user: geomatys:psw
root:psw


#Online binarie build:
#proj directorie
cd /home/geomatys/SirsBuild/mobile-hybride/SirsMobile

#update with git
git pull
#update bower if nessesary
bower install # think to remove ./www/lib/fabric/dist/*.gz
#update plugin if necessary
./rmPlg.sh
./addPlg.sh

#run Build
ionic build -debug android


#deploy apk from root user:
cp  /home/geomatys/SirsBuild/mobile-hybride/SirsMobile/platforms/android/build/outputs/apk/android-armv7-debug.apk  /usr/share/nginx/html/


#local deploy all change for js,html,css...
ionic upload --note "v0.2.1 -u07 new App Layer Menu" --deploy=dev
#--deploy => chanel targeted
#--note => simplest describe your push

#NB : you need to set up your ionic.io account first.

#Version :
les versions doivent etre renseigné a la mains dans contexte. version  avants publication sur ionic deploy


