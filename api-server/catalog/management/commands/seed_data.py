from django.core.management.base import BaseCommand
from django.core.management import call_command


class Command(BaseCommand):
    help = 'Initialize database with sample data'

    def handle(self, *args, **options):
        self.stdout.write('Loading initial data...')
        
        try:
            call_command('loaddata', 'initial_data', verbosity=0)
            self.stdout.write(self.style.SUCCESS(
                'Successfully loaded sample data!'
            ))
            self.stdout.write('\nLoaded:')
            self.stdout.write('  • 5 categories')
            self.stdout.write('  • 15 products')
            self.stdout.write('\nYou can now:')
            self.stdout.write('  • Visit http://localhost:8000/api/products/')
            self.stdout.write('  • Visit http://localhost:8000/admin/')
            
        except Exception as e:
            self.stdout.write(self.style.ERROR(f'Error loading data: {e}'))
