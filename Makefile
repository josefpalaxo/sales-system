.PHONY: catalog validate

catalog:
	python3 scripts/build_catalog.py

validate:
	python3 scripts/validate.py
	python3 scripts/build_catalog.py --check
	python3 scripts/validate_investors.py
	python3 scripts/test_master_dependencies.py
	python3 scripts/test_repository_structure.py

