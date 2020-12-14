from django.urls import path
from . import views
urlpatterns = [
    path("", views.CommentCreateView.as_view(), name="comments")
]
