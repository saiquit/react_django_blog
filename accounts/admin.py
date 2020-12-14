from django.contrib import admin
from .models import AuthorAccount
# Register your models here.


class AuthorAdmin(admin.ModelAdmin):
    list_display = ('id', 'username', 'email')
    list_display_links = ('username', 'email')
    search_fields = ('username',)
    list_per_page = 25


admin.site.register(AuthorAccount, AuthorAdmin)
