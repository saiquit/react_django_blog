from .models import Comment
from .serializers import CommentListSerializer, CategoryCrateSerializer
from rest_framework import generics


class CommentCreateView(generics.ListCreateAPIView):
    def perform_create(self, serializer):
        serializer.save(author=self.request.user)
    queryset = Comment.objects.all()
    serializer_class = CommentListSerializer
