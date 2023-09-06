from django.db import models

# Create your models here.
class PandaStatus(models.Model):
    panda_status_id = models.AutoField(primary_key=True)
    level = models.IntegerField()
    experience_points = models.IntegerField()
    eaten_bomboo_count = models.IntegerField()
    owned_normal_bomboo_count = models.IntegerField()
    owned_premium_bomboo_count = models.IntegerField()