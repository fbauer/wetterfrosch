#!/bin/sh
BUILDDIR=build/sample

if test -e "$BUILDDIR";
then rm -rf "$BUILDDIR/*";
else mkdir -p "$BUILDDIR";
fi

cp src/jqplot/*.css "$BUILDDIR"
cp src/jqplot/*.js "$BUILDDIR"
cp src/html/* "$BUILDDIR"
python src/datagen.py > "$BUILDDIR"/jsondata.txt
