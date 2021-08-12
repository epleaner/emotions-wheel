#!/bin/sh

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null && pwd )"
SITE_DIR=$1

if [ -f "$DIR/.env" ]
then
    # read .env file if exists
    source $DIR/.env
fi

if [ -z "$SITE_DIR" ]
then
    echo "Please specify a website directory"
    exit 1
fi

cd $SITE_DIR
git fetch --all
git reset --hard origin/master
yarn
yarn build

# (re)start pm2 instance
PM2_APP_NAME=emotions
pm2 describe $PM2_APP_NAME > /dev/null
RUNNING=$?

if [ "${RUNNING}" -ne 0 ]; then
  pm2 start yarn --name $PM2_APP_NAME --interpreter bash -- serve -p $PORT
else
  pm2 restart $PM2_APP_NAME
fi