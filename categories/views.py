from rest_framework import generics
from .models import Category
from .serializers import CategoryCrateSerializer, CategoryListSerializer


class CategoryListView(generics.ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategoryListSerializer


class CategoryCreateView(generics.CreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategoryCrateSerializer
