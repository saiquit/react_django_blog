from django.db import models
from django.contrib.auth.models import (
    BaseUserManager, AbstractBaseUser, PermissionsMixin
)
# Create your models here.


class AuthorAccountManager(BaseUserManager):
    def create_user(self, username, email, password, **other_fields):
        if not username:
            raise ValueError('You must provide an email address')

        email = self.normalize_email(email)
        user = self.model(username=username, email=email,
                          **other_fields)
        user.set_password(password)
        user.save(using=self._db)
        print(user)
        return user

    def create_superuser(self,  username, email, password, **other_fields):
        user = self.create_user(
            username,
            email,
            password,
        )
        user.is_staff = True
        user.is_active = True
        user.is_superuser = True
        user.save(using=self._db)
        print(user)
        return user


class AuthorAccount(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(verbose_name="email Address",)
    username = models.CharField(max_length=150, unique=True)
    first_name = models.CharField(max_length=150)
    last_name = models.CharField(max_length=150)
    start_date = models.DateTimeField(auto_now_add=True)
    about = models.TextField()
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_superuser = models.BooleanField(default=False)

    USERNAME_FIELD = 'username'

    # required for superuser
    REQUIRED_FIELDS = ['email', ]

    objects = AuthorAccountManager()

    def __str__(self):
        return self.username
