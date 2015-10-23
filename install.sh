#!/bin/sh

echo "Getting git submodules"
git submodule init
git submodule sync
git submodule update --init --recursive

echo "Installing npm dependencies"
cd js/
npm install
cd ..

echo "Installing ios pods"
cd ios
pod update
cd ..

echo "Getting js files"
cp external/shared/libs/react.* js/
