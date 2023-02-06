#!/bin/sh

set -e

WORKDIR=$(mktemp)
TARFILE=$WORKDIR/unirep-beta-1-2.tar.gz

wget https://pub-0a2a0097caa84eb18d3e5c165665bffb.r2.dev/unirep-beta-1-2.tar.gz -P $WORKDIR

shasum -a 256 $TARFILE | grep 'a24463dd40a551d66f30fc53c1f42ecece4dccc1784f5d2ebe406852dba68bef'

rm -rf node_modules/@unirep
tar -xzf $TARFILE -C node_modules
mv node_modules/unirep-beta-1-2 node_modules/@unirep
