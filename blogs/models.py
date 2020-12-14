from django.db import models
from accounts.models import AuthorAccount
from django.utils.text import slugify
from django.utils.translation import gettext_lazy as _
from categories.models import Category

# Create your models here.

STATUS = (
    (0, "Draft"),
    (1, "Publish")
)


class StatusChoice(models.TextChoices):
    PUBLISHED = 'PB', 'Published'
    DRAFT = 'DF', 'Draft'


class Blog(models.Model):
    title = models.CharField(max_length=200,)
    slug = models.SlugField(max_length=200, unique=True)
    author = models.ForeignKey(
        AuthorAccount, on_delete=models.CASCADE, related_name='blog_posts')
    updated_on = models.DateTimeField(auto_now=True)
    content = models.TextField()
    created_on = models.DateTimeField(auto_now_add=True)
    status = models.TextField(
        choices=StatusChoice.choices, default=StatusChoice.DRAFT)
    thumbnile = models.ImageField(upload_to='blogs/%y/%m/%m', height_field=None, width_field=None, max_length=None,  blank=True
                                  )
    category = models.ManyToManyField(
        Category,  related_name='categories')

    class Meta:
        ordering = ['-created_on']

    def save(self, *args, **kwargs):
        self.slug = slugify(self.title)
        super(Blog, self).save(*args, **kwargs)

    def __str__(self):
        return self.title
