from django.db import models
from django.utils.text import slugify

# Create your models here.


class Category(models.Model):
    title = models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now=False, auto_now_add=True)
    slug = models.SlugField(max_length=200, unique=True)

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        self.slug = slugify(self.title)
        super(Category, self).save(*args, **kwargs)
