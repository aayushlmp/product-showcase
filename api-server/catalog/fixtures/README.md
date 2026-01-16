# Database Fixtures

This directory contains sample data fixtures for the Product Showcase application.

## Files

- `initial_data.json` - Sample products and categories for demonstration

## What's Included

### Categories (5 total):
1. **Electronics** - Latest gadgets and electronic devices
2. **Clothing** - Fashion and apparel
3. **Home & Kitchen** - Home essentials
4. **Books** - Reading materials
5. **Sports & Outdoors** - Sports and outdoor gear

### Products (15 total):
- 6 Electronics products (including 4 featured items)
- 3 Clothing items
- 3 Home & Kitchen items
- 2 Books
- 4 Sports & Outdoors items

Products include various priority levels (low, medium, high, critical) and some are marked as featured.

## How to Load Fixtures

### Load all data:
```bash
python manage.py loaddata initial_data
```

### Load from specific file:
```bash
python manage.py loaddata catalog/fixtures/initial_data.json
```

### Clear database and reload:
```bash
# Delete the database
rm db.sqlite3

# Run migrations
python manage.py migrate

# Load fixtures
python manage.py loaddata initial_data

# Create superuser (optional)
python manage.py createsuperuser
```

## How to Create Your Own Fixtures

### Export current data:
```bash
# Export all catalog data
python manage.py dumpdata catalog --indent 2 > catalog/fixtures/my_data.json

# Export specific models
python manage.py dumpdata catalog.Category --indent 2 > categories.json
python manage.py dumpdata catalog.Product --indent 2 > products.json
```

### Load your custom fixtures:
```bash
python manage.py loaddata my_data
```

## Image URLs

The fixture uses placeholder images from Unsplash. These are royalty-free images perfect for demos. In production, you would:
1. Upload images to your own storage (S3, Cloudinary, etc.)
2. Update the `image_url` field with your storage URLs
3. Or use Django's ImageField to handle uploads

## Notes

- All dates are in ISO 8601 format with UTC timezone
- Prices are stored as strings in the JSON but will be converted to Decimal in the database
- Primary keys (pk) are explicitly set to ensure referential integrity
- Images use Unsplash's dynamic resizing parameter (`?w=400`)
