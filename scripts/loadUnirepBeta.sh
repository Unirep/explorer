#!/bin/sh

set -e

WORKDIR=$(mktemp)
TARFILE=$WORKDIR/unirep-beta-1-2.tar.gz

wget https://pub-0a2a0097caa84eb18d3e5c165665bffb.r2.dev/unirep-beta-1-2.tar.gz -P $WORKDIR

shasum -a 256 $TARFILE | grep '65a32b54d34538465339ad21a89756ae42de1974d5f37fb67520f054ec0b9cba'

rm -rf node_modules/@unirep
tar -xzf $TARFILE -C node_modules
mv node_modules/unirep-beta-1-2 node_modules/@unirep
