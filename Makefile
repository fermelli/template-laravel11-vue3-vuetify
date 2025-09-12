NAME=template-laravel11-vue3-vuetify
REPO=

ifeq ($(REPO),)
URI=$(NAME)
else
URI=$(REPO)/$(NAME)
endif

VERSION=1.0.0
TAG=$(URI):$(VERSION)

build:
	rm -rf public/build && ENV_FILE=.env.production yarn build --mode=production
	docker build -t $(TAG) . --no-cache
	docker system prune -f
save:
	docker save -o ./$(NAME)_$(VERSION).tar $(TAG)
load:
	docker load -i ./$(NAME)_$(VERSION).tar