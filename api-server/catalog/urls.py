from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CategoryViewSet, ProductViewSet

# Create a router and register our viewsets
router = DefaultRouter()
router.register(r'categories', CategoryViewSet, basename='category')
router.register(r'products', ProductViewSet, basename='product')

# The API URLs are determined automatically by the router
urlpatterns = [
    path('', include(router.urls)),
]
