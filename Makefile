build:
	npm --prefix frontend run build

dev:
	npm --prefix frontend run dev

lint:
	npm --prefix frontend run lint

lintfix:
	npm --prefix frontend run lint:fix

start:
	npx start-server -s ./frontend/dist

.PHONY: build start
