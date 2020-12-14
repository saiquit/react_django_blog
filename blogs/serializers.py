from rest_framework import serializers
from .models import Blog
from comments.serializers import CommentListSerializer
from categories.serializers import CategoryListSerializer


class BlogCreateSerializer(serializers.ModelSerializer):
    author = serializers.ReadOnlyField(source='author.username')

    class Meta:
        model = Blog
        fields = ['title', 'author', 'content',
                  'status', 'thumbnile', 'category']


class BlogListSerializer(serializers.ModelSerializer):
    url = serializers.HyperlinkedIdentityField(
        view_name='blog_details', read_only=True, lookup_field='slug')
    author = serializers.SlugRelatedField(
        slug_field='username',
        read_only=True
    )
    category = serializers.SlugRelatedField(
        many=True, slug_field='title', read_only=True)

    class Meta:
        model = Blog
        fields = ['title', 'author', 'content',
                  'status', 'thumbnile', 'updated_on', 'slug', 'url', 'category', 'created_on']


class BlogDetailsSerializer(serializers.ModelSerializer):
    comments = CommentListSerializer(many=True, read_only=True)
    category = CategoryListSerializer(
        many=True, read_only=True)

    class Meta:
        model = Blog
        fields = ['id', 'title', 'author', 'content',
                  'status', 'thumbnile', 'updated_on', 'slug', 'category', 'comments', 'created_on']


class AccountBlogSerializer(serializers.ModelSerializer):
    # comments = CommentPostSerializer(many=True, read_only=True)
    category = serializers.SlugRelatedField(
        many=True, slug_field='slug', read_only=True)

    class Meta:
        model = Blog
        fields = ['id', 'title', 'author', 'content',
                  'status', 'thumbnile', 'updated_on', 'slug', 'category', 'created_on']
