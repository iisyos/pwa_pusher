setup:
	@echo "Setting up..."
	chmod +x setup.sh
	./setup.sh
	docker-compose up -d

.PHONY: setup
