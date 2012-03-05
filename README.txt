
Wetterfrosch is a small server used to aggregate data from wireless
wheather stations. It is designed to run in the constrained
environment of AVM Fritz.Box WLAN routers but should be portable to
any POSIX system.

Dependencies
############

Wetterfrosch depends on jquery and jqplot. A copy of jqplot
1.0.0b2_r1012 is included in the source distribution.

Installation
############

Run

  $ ./build.sh

This copies data to the build/sample directory. Python 2.6 or later is
needed to build a sample data file. It should work with earlier
versions, but you have to install the json package first.
