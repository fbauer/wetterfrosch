# adapted from https://gist.github.com/791759
# create a new directory (in doc/)

BUILDDIR=build/www

if !(test -e "$BUILDDIR");
then 
mkdir -p "$BUILDDIR";
git clone git@github.com:fbauer/wetterfrosch.git build/www;
fi

./build.sh
cp build/sample/* "$BUILDDIR/sample"
cd "$BUILDDIR"
git checkout master && git pull && git checkout gh-pages
git add .
git commit
git push

