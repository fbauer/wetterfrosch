build/sample:
	mkdir -p build/sample

build/sample/index.html:
	cp src/html/index.html build/sample/index.html

all: build/sample/index.html build/sample/%.js
