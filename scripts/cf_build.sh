#!/bin/bash

if [ "$CF_PAGES_BRANCH" = "production" ]; then
    echo "export const version = 'v2.0.0'" > packages/frontend/src/config.js
    echo "export const network = 'sepolia'" >> packages/frontend/src/config.js
    echo "export const SERVER = 'https://unirep-explorer-backend.pages.dev'" >> packages/frontend/src/config.js
elif [ "$CF_PAGES_BRANCH" = "staging" ]; then
    branch=$(git branch --show-current)
    branch="${branch%"${branch##*[![:space:]]}"}" # Trim trailing whitespace
    echo "export const version = 'v2.0.0'" > packages/frontend/src/config.js
    echo "export const network = 'sepolia'" >> packages/frontend/src/config.js
    echo "export const SERVER = 'https://${branch}.unirep-explorer-backend.pages.dev'" >> packages/frontend/src/config.js
fi
