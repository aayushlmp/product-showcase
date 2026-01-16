# Product Showcase API Server

Django REST API for managing products and categories.

The API will be available at `http://localhost:8000/`

## API Endpoints

### Products
- `GET /api/products/` - List all products
- `GET /api/products/{id}/` - Get product details
- `POST /api/products/` - Create new product
- `PUT /api/products/{id}/` - Update product
- `DELETE /api/products/{id}/` - Delete product
- `GET /api/products/featured/` - Get featured products
- `GET /api/products/by_priority/?level=high` - Filter by priority

### Categories
- `GET /api/categories/` - List all categories
- `GET /api/categories/{id}/` - Get category details
- `POST /api/categories/` - Create new category
- `PUT /api/categories/{id}/` - Update category
- `DELETE /api/categories/{id}/` - Delete category
- `GET /api/categories/{id}/products/` - Get all products in a category

### Admin
- `GET /admin/` - Django admin panel

## Project Structure
```
api-server/
├── manage.py                 # Django management script
├── showcase_api/             # Main project directory
│   ├── settings.py          # Django settings
│   ├── urls.py              # URL routing
│   └── requirements.txt     # Python dependencies
└── catalog/                 # Product catalog app
    ├── models.py           # Data models
    ├── views.py            # API views
    ├── serializers.py      # REST serializers
    └── urls.py             # API routes
```

## Database

This project uses SQLite by default (no additional setup required). The database file `db.sqlite3` will be created automatically when you run migrations


## Troubleshooting

### Port Already in Use
```bash
python manage.py runserver 8001
```
