from django.test import TestCase, Client
from django.urls import reverse
from .models import Foods
from panda_house.models import PandaStatus
import json

class FoodsTest(TestCase):
    
    def setUp(self):
        self.client = Client()

        self.food_data = {
            "food_name": "Apple",
            "category": "Fruits",
            "expiration_date": "2023-09-10",
            "storage_status": "normal"
        }
        self.food = Foods.objects.create(**self.food_data)
        self.panda_status = PandaStatus.objects.create(owned_normal_bamboo_count=0, owned_premium_bamboo_count=0, level=1, experience_points=10, eaten_bamboo_count=0)

    def test_get_all_foods(self):
        response = self.client.get(reverse('foods_handler'))
        self.assertEqual(response.status_code, 200)
        self.assertTrue("food_list" in json.loads(response.content))

    def test_register_foods(self):
        response = self.client.post(reverse('foods_handler'), {"food_add": self.food_data}, content_type='application/json')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(json.loads(response.content)["status"], "success")

    def test_consume_food(self):
        response = self.client.post(reverse('food_detail_handler', args=[self.food.pk]))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(json.loads(response.content)["status"], "success")
        self.assertFalse(Foods.objects.filter(pk=self.food.pk).exists())

    def test_edit_food(self):
        updated_data = {
            "food_edit": {
                "food_name": "Orange",
                "category": "Fruits",
                "expiration_date": "2023-10-10",
                "storage_status": "normal"
            }
        }
        response = self.client.put(reverse('food_detail_handler', args=[self.food.pk]), json.dumps(updated_data), content_type='application/json')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(Foods.objects.get(pk=self.food.pk).food_name, "Orange")

    def test_delete_food(self):
        response = self.client.delete(reverse('food_detail_handler', args=[self.food.pk]))
        self.assertEqual(response.status_code, 200)
        self.assertFalse(Foods.objects.filter(pk=self.food.pk).exists())
