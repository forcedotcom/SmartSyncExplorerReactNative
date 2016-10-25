#!/bin/sh

echo "Getting git submodules"
git submodule init
git submodule sync
git submodule update --init --recursive

echo "Installing npm dependencies"
cd app
npm install
cd ..

echo "Installing ios pods"
cd app/ios
pod update
cd ../..
