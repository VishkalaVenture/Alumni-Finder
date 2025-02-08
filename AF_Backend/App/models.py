from django.db import models
from django.auth.models import User

def rename_image(instance, filename):
    ext = filename.split('.')[-1]
    new_filename = f"{instance.user.username}.{ext}"
    upload_path = f"profile_photo/{new_filename}"
    return upload_path

class UserProfileDetails(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    date_of_birth = models.DateField()
    address = models.TextField()
    mobile_number = models.CharField(max_length=20)
    profile_photo = models.ImageField(upload_to=rename_image)
    joined_on = models.DateTimeField(auto_now_add=True)
    is_verified = models.BooleanField(default=False)

class UserSessionDetails(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    login_time = DateTimeField()
    logout_time = DateTimeField()

class EmailVerification(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    token = models.CharField(max_length=16)

class UserProfileDetailsToggle(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    hide_username = models.BooleanField(default=False)
    hide_first_name = models.BooleanField(default=False)
    hide_last_name = models.BooleanField(default=False)
    hide_email = models.BooleanField(default=False)
    hide_date_of_birth = models.BooleanField(default=False)
    hide_address = models.BooleanField(default=False)
    hide_mobile_number = models.BooleanField(default=False)
    hide_profile_photo = models.BooleanField(default=False)