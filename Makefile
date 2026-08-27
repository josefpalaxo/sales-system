.PHONY: catalog validate

catalog:
	python3 scripts/build_catalog.py

validate:
	python3 scripts/validate.py
	python3 scripts/build_catalog.py --check

