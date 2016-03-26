#!/bin/bash

set -o errexit

# reset public dir
rm -rf public
mkdir public

# copy required files
cp ./examples/index.html ./public/index.html
cp ./examples/react-context-menu.css ./public/react-context-menu.css
npm run examples && cp ./bundle.js ./public/bundle.js


cd public
git init

git config user.name "Travis CI"
git config user.name "vkb0310@gmail.com"

git add .
git commit -m "Deploy to gh-pages"

git push --force --quiet "https://${GITHUB_TOKEN}@$github.com/${GITHUB_REPO}.git" master:gh-pages > /dev/null 2>&1
