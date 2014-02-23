REPORTER ?= nyan

test:
	@./node_modules/mocha/bin/_mocha -R $(REPORTER)

.PHONY: test

prod:
	@npm install > /dev/null 2>&1
	@cat styles/styles.css | ./node_modules/.bin/autoprefixer > styles/styles.prefixed.css
	@perl -0777 -pi -e 's/<style>.*<\/style>/<style>\nSTYLE_PLACEHOLDER\n<\/style>/si' index.html
	@sed -i '' -e '/STYLE_PLACEHOLDER/r styles/styles.prefixed.css' -e "s///" index.html