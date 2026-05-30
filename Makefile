.PHONY: help infra-up infra-down ingestion-run api-run dashboard-dev test clean

help:
	@echo "MIP Platform Management Commands:"
	@echo "  infra-up      - Start all infrastructure services (Docker)"
	@echo "  infra-down    - Stop all infrastructure services"
	@echo "  ingestion-run - Run the Rust ingestion service"
	@echo "  api-run       - Run the Rust API gateway"
	@echo "  dashboard-dev - Start the React dashboard in dev mode"
	@echo "  test          - Run all tests across services"
	@echo "  clean         - Remove build artifacts"

infra-up:
	docker-compose -f infra/docker/docker-compose.dev.yml up -d

infra-down:
	docker-compose -f infra/docker/docker-compose.dev.yml down

ingestion-run:
	cd ingestion-service && cargo run

api-run:
	cd api-gateway/rust-core && cargo run

dashboard-dev:
	cd dashboard && npm run dev

test:
	cd ingestion-service && cargo test
	# cd analytics-engine && ctest (when configured)
	# cd api-gateway/rust-core && cargo test

clean:
	rm -rf target/
	rm -rf dashboard/dist/
	find . -name "node_modules" -type d -prune -exec rm -rf '{}' +
