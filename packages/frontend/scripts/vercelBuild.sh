#!/bin/sh

set -e

URL=$VERCEL_BRANCH_URL
echo $VERCEL_BRANCH_URL
find="frontend"
replace="backend"
result=${URL//$find/$replace}
echo $result    
echo SERVER = \"https://$result\" >> ./src/config.js