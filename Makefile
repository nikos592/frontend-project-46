install:
	npm ci

gendiff:
	node src/gendiff.js

.PHONY: test