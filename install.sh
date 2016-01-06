#!/bin/sh

echo "Getting git submodules"
git submodule init
git submodule sync
git submodule update --init --recursive
cd external/ios
git submodule update --init external/ios-specs
cd ../..

echo "Installing npm dependencies"
cd app
npm install
cd ..

echo "Installing ios pods"
cd app/ios
pod update
cd ../..

echo "Getting js files"
cp external/shared/libs/react.* app/js/
