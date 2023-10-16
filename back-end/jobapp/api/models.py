from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from pygments.lexers import get_all_lexers
from pygments.styles import get_all_styles

LEXERS = [item for item in get_all_lexers() if item[1]]
LANGUAGE_CHOICES = sorted([(item[1][0], item[0]) for item in LEXERS])
STYLE_CHOICES = sorted([(item, item) for item in get_all_styles()])

class Permission(models.Model):
    name = models.CharField(max_length=50, null=False)

class Contract(models.Model):
    name = models.CharField(max_length=50, blank=True, null=True)

class Sex(models.Model):
    name = models.CharField(max_length=50, null=False)

class UtilisateurManager(BaseUserManager):
    def get_by_natural_key(self, email):
        return self.get(email=email)

class Utilisateur(AbstractBaseUser, PermissionsMixin):
    firstname = models.CharField(max_length=50, null=False)
    lastname = models.CharField(max_length=50, null=False)
    phone = models.CharField(max_length=50, null=False)
    email = models.EmailField(unique=True, null=False)
    cv = models.CharField(max_length=50, blank=True, null=True)
    sex = models.ForeignKey(Sex, on_delete=models.SET_NULL, null=True)
    permission = models.ForeignKey(Permission, on_delete=models.SET_NULL, null=True)
    password = models.CharField(max_length=128, default='default_password')

    objects = UtilisateurManager()
    REQUIRED_FIELDS = ['password']
    USERNAME_FIELD = 'email'

class Unregister(models.Model):
    firstname = models.CharField(max_length=50, null=False)
    lastname = models.CharField(max_length=50, null=False)
    phone = models.CharField(max_length=50, null=False)
    email = models.EmailField(max_length=50, null=False)
    cv = models.CharField(max_length=50, null=False)
    sex = models.ForeignKey(Sex, on_delete=models.SET_NULL, null=True)

class Company(models.Model):
    name = models.CharField(max_length=50, null=False)
    address = models.CharField(max_length=50, blank=True, null=True)
    user = models.ForeignKey(Utilisateur, on_delete=models.CASCADE)

class Advertisement(models.Model):
    offer_date = models.DateTimeField(null=False)
    title = models.CharField(max_length=50, null=False)
    full_description = models.CharField(max_length=500, blank=True, null=True)
    quick_description = models.CharField(max_length=50, blank=True, null=True)
    working_time = models.CharField(max_length=50, null=False)
    wage = models.DecimalField(max_digits=15, decimal_places=2, null=False)
    isOnline = models.BooleanField(default=False)
    contract = models.ForeignKey(Contract, on_delete=models.SET_NULL, null=True)
    company = models.ForeignKey(Company, on_delete=models.CASCADE)

class Application(models.Model):
    apply_date = models.DateTimeField(null=False)
    message = models.CharField(max_length=50, null=False)
    user = models.ForeignKey(Utilisateur, on_delete=models.SET_NULL, blank=True, null=True)
    unregisterUser = models.ForeignKey(Unregister, on_delete=models.SET_NULL, blank=True, null=True)
    advertisement = models.ForeignKey(Advertisement, on_delete=models.CASCADE)
