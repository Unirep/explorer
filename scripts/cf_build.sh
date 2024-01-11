#!/bin/bash

if [ "$CF_PAGES_BRANCH" = "main" ]; then
    echo "export const version = 'v2.0.0'" > packages/frontend/src/config.js
    echo "export const network = 'sepolia'" >> packages/frontend/src/config.js
    echo "export const SERVER = 'https://unirep-explorer-backend.pages.dev'" >> packages/frontend/src/config.js
else
    echo "export const version = 'v2.0.0'" > packages/frontend/src/config.js
    echo "export const network = 'sepolia'" >> packages/frontend/src/config.js
    echo "export const SERVER = 'https://${CF_PAGES_BRANCH}.unirep-explorer-backend.pages.dev'" >> packages/frontend/src/config.js
fi