
Wetterfrosch is a small server used to aggregate data from wireless
wheather stations. It is designed to run in the constrained
environment of AVM Fritz.Box WLAN routers but should be portable to
any linux system.

Dependencies
############

Wetterfrosch depends on jquery, jqplot and MochiKit.DateTime. Copies 
of jqplot 1.0.0b2_r1012 and MochiKit.DateTime v1.4.2 are included in
the source distribution.

Installation
############

Run

  $ ./build.sh

This copies data to the build/sample directory. Python 2.6 or later is
needed to build a sample data file. It should work with earlier
versions, but you have to install the json package first.
