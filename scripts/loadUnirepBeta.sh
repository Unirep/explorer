#!/bin/sh

set -e

WORKDIR=$(mktemp)
TARFILE=$WORKDIR/unirep-beta-1.tar.gz

wget https://pub-0a2a0097caa84eb18d3e5c165665bffb.r2.dev/unirep-beta-1.tar.gz -P $WORKDIR

shasum -a 256 $TARFILE | grep '3352ab1803022bc82da3426003f83a4fbdfa3324ca552d7615a8894a42436301'

rm -rf node_modules/@unirep
tar -xzf $TARFILE -C node_modules
mv node_modules/unirep-beta-1 node_modules/@unirep
