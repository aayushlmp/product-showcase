from rest_framework import serializers
from .models import Category, Product


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'description', 'created_at']
        read_only_fields = ['id', 'created_at']


class ProductSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.name', read_only=True)
    
    class Meta:
        model = Product
        fields = [
            'id', 'title', 'description', 'category', 'category_name',
            'price', 'priority', 'is_featured', 'image_url',
            'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']


class ProductListSerializer(serializers.ModelSerializer):
    """Simplified serializer for list views"""
    category_name = serializers.CharField(source='category.name', read_only=True)
    
    class Meta:
        model = Product
        fields = [
            'id', 'title', 'category', 'category_name',
            'price', 'priority', 'is_featured', 'image_url'
        ]
