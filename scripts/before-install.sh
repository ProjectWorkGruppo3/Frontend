#!/bin/bash

cd /home/app

curl -sL https://rpm.nodesource.com/setup_14.x | sudo -E bash -
sudo apt -y install nodejs npm