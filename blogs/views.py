from rest_framework import generics, permissions, filters
from .models import Blog
from .serializers import BlogCreateSerializer, BlogListSerializer, BlogDetailsSerializer
from .permissions import IsOwnerOrReadOnly
from .paginations import StandardResultsSetPagination


class BlogListView(generics.ListAPIView):
    queryset = Blog.objects.all()
    serializer_class = BlogListSerializer
    pagination_class = StandardResultsSetPagination
    filter_backends = [filters.SearchFilter]
    search_fields = ['title', 'content']


class SingleBlogListView(generics.RetrieveAPIView):
    queryset = Blog.objects.all()
    serializer_class = BlogDetailsSerializer
    lookup_field = 'slug'


class UpdateBlogListView(generics.UpdateAPIView):
    queryset = Blog.objects.all()
    serializer_class = BlogDetailsSerializer
    lookup_field = 'slug'
    permission_classes = [permissions.IsAuthenticated, IsOwnerOrReadOnly]


class DeleteBlogListView(generics.DestroyAPIView):
    queryset = Blog.objects.all()
    serializer_class = BlogDetailsSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwnerOrReadOnly]
    lookup_field = 'slug'


class BlogCreateView(generics.CreateAPIView):
    def perform_create(self, serializer):
        serializer.save(author=self.request.user)
    queryset = Blog.objects.all()
    serializer_class = BlogCreateSerializer
    permission_classes = [permissions.IsAuthenticated]
