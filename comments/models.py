from django.db import models
from accounts.models import AuthorAccount
# Create your models here.


class Comment(models.Model):
    post = models.ForeignKey(
        'blogs.Blog', on_delete=models.CASCADE, related_name='comments')
    title = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now=False, auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True, auto_now_add=False)
    author = models.ForeignKey(
        AuthorAccount, on_delete=models.CASCADE, related_name='comments')

    def __str__(self):
        return self.title
