from django.urls import path, include
from .views import SignUpView, AuthorListView

urlpatterns = [
    path("sign-up/", SignUpView.as_view(), name="sign-up"),
    path("", AuthorListView.as_view(), name="authors")
]
