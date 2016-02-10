PACKAGE = alacarte2

IS_APP = yes
SERVE_PORT = 3341

# Templated part: do not change.
#
include node_modules/systematic/js.mk

DOCS_MK = $(shell makefile_path docs.mk 2>/dev/null)
ifneq ($(DOCS_MK),)
	-include $(DOCS_MK)
endif

RELEASE_MK = $(shell makefile_path release.mk 2>/dev/null)
ifneq ($(RELEASE_MK),)
	PACKAGE_TYPE = node
	# TODO(vperron): Force adding the dist/ folder upon releasing
	GENERIC_OPTIONS ?= --name=$(PACKAGE) \
										 --changelog=docs/changelog.rst \
										 --release-mail-folder=docs/releases
	RELEASE_OPTIONS ?=
	-include $(RELEASE_MK)
endif


# TODO(vperron): this part should also be imported from blease
image: dist
	mkdir -p $(IMAGE_DIR)
	cp -r $(BLEASEJS_PATH)assets/* $(IMAGE_DIR)
	cp -r $(DIST_DIR) $(IMAGE_DIR)
	mkdir -p $(IMAGE_DIR)/dist/config && cp -r $(INI_FILES) $(IMAGE_DIR)/dist/config/
	$(eval version = $(shell node -e "console.log(require('./package.json').version);"))
	@echo "$(ECHOPREFIX)generating Docker image: '$(DOCKER_REPOSITORY)/$(PACKAGE):$(version)'$(ECHOSUFFIX)"
	cd $(IMAGE_DIR) && docker build --rm --force-rm --tag=$(DOCKER_REPOSITORY)/$(PACKAGE):$(version) .
	@echo "$(ECHOPREFIX)Docker image available: '$(DOCKER_REPOSITORY)/$(PACKAGE):$(version)'$(ECHOSUFFIX)"
