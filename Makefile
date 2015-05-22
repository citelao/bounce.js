# https://github.com/linus/refix/blob/master/Makefile

.PHONY : init clean build test dist publish

init:
	npm install

clean:
	rm -r lib/

build:
	coffee -o lib/ -c src/ || ./node_modules/.bin/coffee -o lib/ -c src/
	# coffee -c test/refix.coffee || ./node_modules/.bin/coffee -o lib/ -c src/

test:
	echo -e 'Testing not implemented.'
	# nodeunit test/refix.js

dist: clean init build test

publish: dist
	npm publish