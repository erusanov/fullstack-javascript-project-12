build:
	npm --prefix frontend run build

dev:
	npm --prefix frontend run dev

start:
	npx start-server -s ./frontend/dist

.PHONY: build start
