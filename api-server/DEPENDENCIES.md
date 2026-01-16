# Python Dependencies

This project uses two files for dependency management:

## requirements.txt
Contains the main dependencies with flexible version ranges:
- `django>=3.2,<4.0`
- `djangorestframework>=3.12`
- etc.

This allows pip to install the latest compatible versions.

## constraints.txt
Contains the exact versions that were tested and are known to work:
- `Django==3.2.25`
- `djangorestframework==3.15.1`
- etc.

## Installation

### Flexible Installation (Recommended)
Get the latest compatible versions:
```bash
pip install -r showcase_api/requirements.txt
```

### Exact Reproduction
Use the exact tested versions:
```bash
pip install -r showcase_api/requirements.txt -c showcase_api/constraints.txt
```

This approach follows [PEP 665](https://peps.python.org/pep-0665/) best practices for reproducible builds while maintaining flexibility.
