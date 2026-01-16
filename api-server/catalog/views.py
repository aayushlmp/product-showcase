# catalog/views.py
from rest_framework import viewsets, filters, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from django_filters.rest_framework import DjangoFilterBackend
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
from django.conf import settings
import os
import uuid
from .models import Product, Category
from .serializers import ProductSerializer, CategorySerializer

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['category', 'priority', 'is_featured']
    search_fields = ['title', 'description']
    ordering_fields = ['created_at', 'price', 'priority']
    ordering = ['-created_at']

    @action(detail=False, methods=['get'])
    def featured(self, request):
        featured_products = self.get_queryset().filter(is_featured=True)
        serializer = self.get_serializer(featured_products, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['post'], parser_classes=[MultiPartParser, FormParser])
    def upload(self, request):
        """
        Upload a file (typically an image) for a product.
        Expects a 'file' field in the request.
        Returns the URL of the uploaded file.
        """
        if 'file' not in request.FILES:
            return Response(
                {'error': 'No file provided. Please include a file in the request.'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        uploaded_file = request.FILES['file']
        
        # Validate file size (e.g., max 10MB)
        max_size = 10 * 1024 * 1024  # 10MB
        if uploaded_file.size > max_size:
            return Response(
                {'error': f'File size exceeds maximum allowed size of {max_size / (1024*1024)}MB'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Generate unique filename
        file_ext = os.path.splitext(uploaded_file.name)[1]
        unique_filename = f"{uuid.uuid4()}{file_ext}"
        
        # Save file to media directory
        media_path = os.path.join('products', unique_filename)
        file_path = default_storage.save(media_path, ContentFile(uploaded_file.read()))
        
        # Generate URL for the uploaded file
        file_url = request.build_absolute_uri(settings.MEDIA_URL + file_path)
        
        return Response({
            'url': file_url,
            'filename': unique_filename,
            'size': uploaded_file.size
        }, status=status.HTTP_201_CREATED)