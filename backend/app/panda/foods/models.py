from django.db import models

# Create your models here.
class Foods(models.Model):

    food_id = models.AutoField(primary_key=True)
    food_name = models.CharField(max_length=100)
    category = models.CharField(max_length=100)
    expiration_date = models.DateField()
    storage_status = models.CharField(max_length=100)
    last_update_datetime = models.DateTimeField(auto_now=True)
    registration_datetime = models.DateTimeField(auto_now_add=True)
