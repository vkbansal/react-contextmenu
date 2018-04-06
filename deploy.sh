#!/bin/bash
#

echo $TRAVIS_BRANCH

if ([ "$TRAVIS_BRANCH" != "master" ] && [ -z "$TRAVIS_TAG" ]) ||  [ "$TRAVIS_PULL_REQUEST" != "false" ];
then
	exit
fi

set -o errexit

# build examples
NODE_ENV=production npm run build:examples

cd public
git init

git config --global user.name "Travis CI"
git config --global user.email "${USER_EMAIL}"

git add .
git commit -m "Deploy to gh-pages"

git push --force --quiet "https://${GITHUB_TOKEN}@github.com/vkbansal/react-contextmenu.git" master:gh-pages > /dev/null 2>&1
