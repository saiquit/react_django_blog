from django.urls import path, include
from . import views

urlpatterns = [
    path("create/", views.CategoryCreateView.as_view(), name="category_create"),
    path("", views.CategoryListView.as_view(), name="categories")
]
