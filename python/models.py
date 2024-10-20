# models.py
from django.db import models
from django.contrib.auth.models import User

class CarAd(models.Model):
    image = models.ImageField(upload_to='car_images/')
    location = models.CharField(max_length=100)
    title = models.CharField(max_length=100)
    price = models.IntegerField()
    year = models.IntegerField()
    mileage = models.IntegerField()
    fuel_type = models.CharField(max_length=50)
    phone = models.CharField(max_length=20)
    description = models.TextField()
    likes = models.ManyToManyField(User, related_name='liked_ads', blank=True)  # Foydalanuvchi bo'yicha like'lar
    views = models.IntegerField(default=0)  # View soni

    def __str__(self):
        return self.title
