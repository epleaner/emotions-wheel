#!/bin/sh

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null && pwd )"
SITE_DIR=$1

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