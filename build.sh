#!/bin/sh
BUILDDIR=build/sample

if test -e "$BUILDDIR";
then rm -rf "$BUILDDIR/*";
else mkdir -p "$BUILDDIR";
fi

cp src/jqplot/*.css "$BUILDDIR"
cp src/jqplot/*.js "$BUILDDIR"
cp "src/jqplot/plugins/jqplot.dateAxisRenderer.js" "$BUILDDIR"
cp "src/jqplot/plugins/jqplot.canvasTextRenderer.min.js" "$BUILDDIR"
cp "src/jqplot/plugins/jqplot.canvasAxisLabelRenderer.min.js" "$BUILDDIR"
cp src/html/* "$BUILDDIR"
cp src/imgs/wetterfrosch.png "$BUILDDIR"
python src/datagen.py > "$BUILDDIR"/jsondata.txt

cat src/jqplot/jquery.min.js > "$BUILDDIR"/wetterfrosch.min.js
cat src/jqplot/jquery.jqplot.min.js >> "$BUILDDIR"/wetterfrosch.min.js
cat src/jqplot/plugins/jqplot.dateAxisRenderer.min.js >> "$BUILDDIR"/wetterfrosch.min.js
cat src/jqplot/plugins/jqplot.canvasTextRenderer.min.js >> "$BUILDDIR"/wetterfrosch.min.js
cat src/jqplot/plugins/jqplot.canvasAxisLabelRenderer.min.js >> "$BUILDDIR"/wetterfrosch.min.js
cat src/html/MochiKit.js >> "$BUILDDIR"/wetterfrosch.min.js
cat src/html/wetterfrosch.js >> "$BUILDDIR"/wetterfrosch.min.js
python jsmin.py "$BUILDDIR"/wetterfrosch.min.js > "$BUILDDIR"/temp && mv "$BUILDDIR"/temp "$BUILDDIR"/wetterfrosch.min.js