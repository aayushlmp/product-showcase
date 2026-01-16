# Product Showcase

A full-stack application for managing and displaying products with categories.

## Tech Stack

- **Backend**: Django 3.2 + Django REST Framework
- **Frontend**: Angular 21
- **Database**: SQLite (development)

## Quick Start

### Option 1: Standard Python Setup (Recommended for Portability)

**Requirements:** Python 3.8+, Node.js 18+

```bash
# Backend setup
cd api-server

# Create and activate virtual environment
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies and run
pip install --upgrade pip
pip install -r showcase_api/requirements.txt
export DJANGO_SETTINGS_MODULE=showcase_api.settings
python manage.py migrate
python manage.py seed_data
python manage.py runserver

# Frontend setup (in new terminal)
cd ui-client/product-dashboard
npm install
npm start
```

*

## Project Structure

```
product-showcase/
├── api-server/              # Django backend
│   ├── manage.py
│   ├── showcase_api/        # Main Django project
│   └── catalog/             # Product catalog app
│
└── ui-client/              # Angular frontend
    └── product-dashboard/   # Angular application
        ├── src/
        └── package.json
```

## Access Points

- **Frontend**: http://localhost:4200
- **Backend API**: http://localhost:8000/api/
- **Admin Panel**: http://localhost:8000/admin/

## API Documentation

See [api-server/Readme.md](api-server/Readme.md) for detailed API endpoints.

## Development

### Backend Commands
```bash
cd api-server
source venv/bin/activate

# Run migrations
python manage.py makemigrations
python manage.py migrate

# Create admin user
python manage.py createsuperuser

# Run server
python manage.py runserver
```

### Frontend Commands
```bash
cd ui-client/product-dashboard

# Install dependencies
npm install

# Run dev server
npm start

# Build for production
npm run build
```

## Sharing This Project

To share this project with someone:

1. **Without pyenv (Simple):**
   ```bash
   # Include these files:
   - requirements.txt
   - README.md
   - .gitignore
   
   # Recipient runs:
   python3 -m venv venv
   source venv/bin/activate
   pip install -r showcase_api/requirements.txt
   python manage.py migrate
   ```

2. **Best Practice - Include:**
   - `requirements.txt` (Python dependencies)
   - `package.json` (Node dependencies)
   - `README.md` (setup instructions)
   - `.gitignore` (exclude venv, node_modules, db.sqlite3)
   - `.python-version` (optional, for pyenv users)

## Troubleshooting

### Python Issues
- **Command not found**: Make sure virtual environment is activated
- **Module not found**: Run `pip install -r showcase_api/requirements.txt`
- **Wrong Python version**: Use pyenv or specify `python3.11`
- **pip installing to system**: Virtual environment not activated properly
  - For venv: `source venv/bin/activate` (check prompt for `(venv)`)
  - Verify with: `which pip` (should show venv path, not system)

### Database Issues
- **Database locked**: Stop the server and restart
- **Migration errors**: Delete `db.sqlite3` and run migrations again

### Port Issues
- Backend: `python manage.py runserver 8001`
- Frontend: Modify `package.json` or use `ng serve --port 4201`


