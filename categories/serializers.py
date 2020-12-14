from django.db.models import fields
from rest_framework import serializers
from .models import Category


class CategoryListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'


class CategoryCrateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['title']
