from rest_framework import serializers
from .models import AuthorAccount
from blogs.models import Blog
from blogs.serializers import AccountBlogSerializer


class AuthorListSerializer(serializers.ModelSerializer):
    blogs = serializers.SerializerMethodField()

    class Meta():
        model = AuthorAccount
        fields = [
            'id',
            'username',
            'blogs'
        ]

    def get_blogs(self, author):
        blogs = Blog.objects.filter(author=author.id)
        serializedData = AccountBlogSerializer(blogs, many=True)
        return serializedData.data
