#!/bin/bash

cd /home/app
sudo npm run build
sudo pm2 start npm --name "seren-up-fe" -- start
sudo pm2 startup
sudo pm2 save
sudo pm2 restart all