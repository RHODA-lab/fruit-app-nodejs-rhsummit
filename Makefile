
IMAGE_TAG ?= quay.io/myeung/fruit-app-nodejs-pg:v0.0.1

.PHONY: docker-build
docker-build:
	docker build -f Dockerfile-pg -t ${IMAGE_TAG} .

.PHONY: docker-push
docker-push:
	docker push ${IMAGE_TAG}
