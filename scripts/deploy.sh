#!/bin/bash

set -o errexit

rm -rf public
mkdir public
cp ./examples/index.html ./public/index.html
cp ./examples/react-context-menu.css ./public/react-context-menu.css
npm run examples && cp ./bundle.js ./public/bundle.js
