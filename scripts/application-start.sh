#!/bin/bash

cd /app
npm run build
pm2 start npm --name "seren-up-fe" -- start
pm2 startup
pm2 save
pm2 restart all