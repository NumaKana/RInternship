from django.db import models

# Create your models here.
class PandaStatus(models.Model):
    panda_status_id = models.AutoField(primary_key=True)
    level = models.IntegerField()
    experience_points = models.IntegerField()
    eaten_bamboo_count = models.IntegerField()
    owned_normal_bamboo_count = models.IntegerField()
    owned_premium_bamboo_count = models.IntegerField()

    def __str__(self):
        return "PandaStatus: level={}, experience_points={}, eaten_bamboo_count={}, owned_normal_bamboo_count={}, owned_premium_bamboo_count={}".format(
            self.level,
            self.experience_points,
            self.eaten_bamboo_count,
            self.owned_normal_bamboo_count,
            self.owned_premium_bamboo_count
        )