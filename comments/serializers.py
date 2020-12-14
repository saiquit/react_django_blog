from rest_framework import serializers
from .models import Comment


class CommentListSerializer(serializers.ModelSerializer):
    author = serializers.ReadOnlyField(source='author.username')
    author_id = serializers.ReadOnlyField(source='author.id')

    class Meta:
        model = Comment
        fields = ['title', 'post', 'author', 'author_id', 'id', 'created_at']


class CommentPostSerializer(serializers.ModelSerializer):

    class Meta:
        model = Comment
        fields = ['title', 'author']


class CategoryCrateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ['title']
