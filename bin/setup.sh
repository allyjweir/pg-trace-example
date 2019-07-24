#!/bin/bash

# Exit if any subcommand fails
set -e

git init  # Idempotent in existing git repositories: https://git-scm.com/docs/git-init
source ~/.nvm/nvm.sh
nvm install
cp .env.example .env
yarn install
yarn db:create
