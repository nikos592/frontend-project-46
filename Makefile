install:
	npm ci

gendiff:
	node bin/gendiff.js

.PHONY: test

lint:
	npx eslint .