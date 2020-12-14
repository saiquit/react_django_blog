from .models import AuthorAccount
from django.contrib.auth import get_user_model
from rest_framework import views, generics
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import permissions
from .serializers import AuthorListSerializer

User = get_user_model()


class SignUpView(APIView):
    def post(self, request, format=None):
        data = self.request.data
        username = data['username']
        email = data['email']
        password = data['password']
        password2 = data['password2']

        if password == password2:
            if User.objects.filter(email=email).exists():
                return Response({'error': 'Email Already Exist'})
            else:
                if len(password) < 6:
                    return Response({'error': 'Password must be at least 6 character'})
                else:
                    user = User.objects.create_user(
                        email=email, password=password, username=username)
                    user.save()
                    return Response({'success': 'User Create Successfully'})
        else:
            return Response({'error': 'Password Didnot Match'})


class AuthorListView(generics.ListAPIView):
    serializer_class = AuthorListSerializer

    def get_queryset(self):
        user = self.request.user
        return AuthorAccount.objects.filter(id=user.id)
