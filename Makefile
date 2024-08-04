install:
	npm ci

gendiff:
	node src/gendiff.js

.PHONY: test

lint:
	npx eslint .