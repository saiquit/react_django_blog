from django.urls import path, include
from .views import BlogListView, SingleBlogListView, BlogCreateView, UpdateBlogListView, DeleteBlogListView

urlpatterns = [
    path("", BlogListView.as_view(), name="blog_list"),
    path("create/", BlogCreateView.as_view(), name="blog_create"),
    path("<slug>", SingleBlogListView.as_view(), name="blog_details"),
    path("<slug>/delete/", DeleteBlogListView.as_view(), name="blog_delete"),
    path("<slug>/update/", UpdateBlogListView.as_view(), name="blog_update"),
]
