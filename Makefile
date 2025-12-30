install:
	npm i
	npm --prefix frontend i

build:
	npm --prefix frontend run build

lint:
	npm --prefix frontend run lint

lintfix:
	npm --prefix frontend run lint:fix

start:
	npx start-server -s ./frontend/dist

.PHONY: install build start
