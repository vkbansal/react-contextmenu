#!/bin/bash
#
echo $TRAVIS_BRANCH

if ([ "$TRAVIS_BRANCH" != "master" ] && [ -z "$TRAVIS_TAG" ]) ||  [ "$TRAVIS_PULL_REQUEST" == "true" ];
then
	exit
fi

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

git config --global user.name "Travis CI"
git config --global user.email "vkb0310@gmail.com"

git add .
git commit -m "Deploy to gh-pages"

git push --force --quiet "https://${GITHUB_TOKEN}@github.com/${GITHUB_REPO}.git" master:gh-pages > /dev/null 2>&1
