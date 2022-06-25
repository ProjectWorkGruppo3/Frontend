#!/bin/bash

cd /home/app

curl -sL  https://deb.nodesource.com/setup_14.x | sudo -E bash -
sudo apt -y install nodejs npm
sudo npm install npm@latest -g