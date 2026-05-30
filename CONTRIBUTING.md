# Contributing to MIP

Thank you for your interest in contributing to the Manufacturing Intelligence Platform!

## Development Workflow

1. **Fork the repository** and create your branch from `main`.
2. **Environment Setup**: Use the provided `docker-compose.dev.yml` to spin up local infrastructure.
3. **Coding Standards**:
   - **Rust**: Run `cargo fmt` and `cargo clippy`.
   - **C++**: Follow C++17 standards; use smart pointers.
   - **TypeScript**: functional components + hooks; no `any`.
4. **Testing**: Add unit tests for new logic and ensure integration tests pass.
5. **Pull Requests**: Provide a clear description of changes and link any related issues.

## Reporting Issues

Use the GitHub issue tracker to report bugs or suggest enhancements. Provide as much context as possible, including steps to reproduce for bugs.
