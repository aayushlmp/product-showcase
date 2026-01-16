from django.shortcuts import render


def index(request):
    """Home page with API documentation links"""
    return render(request, 'index.html')
