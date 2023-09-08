from django.test import TestCase
from .models import PandaStatus

class PandaEntity():
        def __init__(self, level, exp, given_food, normal_food, premium_food):
            self.level = level
            self.exp = exp
            self.given_food = given_food
            self.normal_food = normal_food
            self.premium_food = premium_food

        def create_panda_status(self):
            panda = PandaStatus(
                level=self.level,
                experience_points=self.exp,
                eaten_bamboo_count=self.given_food,
                owned_normal_bamboo_count=self.normal_food,
                owned_premium_bamboo_count=self.premium_food
            )
            panda.save()

        def get_panda_status(self):
            panda_status = {
                "level": self.level,
                "exp": self.exp,
                "given_food": self.given_food,
                "items": {
                    "normal_food": self.normal_food,
                    "premium_food": self.premium_food
                }
            }
            return panda_status


# Create your tests here.
class GetPandaStatusViewTests(TestCase):
    #include PandaEntity class in the test class
    PandaEntity = PandaEntity
    def test_get_panda_status_when_no_panda(self):
        #reset database before each test
        PandaStatus.objects.all().delete()
        panda0 = PandaEntity(0, 0, 0, 0, 0)
        response = self.client.get("/panda/")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), {"panda_status": panda0.get_panda_status()})

    def test_get_panda_status_when_one_panda_exists(self):
        PandaStatus.objects.all().delete()
        panda1 = self.PandaEntity(2, 110, 8, 3, 4)
        panda1.create_panda_status()

        response = self.client.get("/panda/")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), {"panda_status": panda1.get_panda_status()})

    def test_get_panda_status_when_more_than_one_panda_exists(self):
        PandaStatus.objects.all().delete()
        panda1 = self.PandaEntity(2, 110, 8, 3, 4)
        panda2 = self.PandaEntity(3, 200, 10, 5, 6)
        panda1.create_panda_status()
        panda2.create_panda_status()

        response = self.client.get("/panda/")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), {"panda_status": panda1.get_panda_status()})

    def test_access_with_post(self):
        response = self.client.post("/panda/")
        self.assertEqual(response.status_code, 405)
        self.assertEqual(response.json(), {"status": "error", "message": "method must be GET"})

class FeedingRequestEntity():
    def __init__(self, normal_food, premium_food):
        self.normal_food = normal_food
        self.premium_food = premium_food

    def get_request_body(self):
        request_body = {
            "panda_feed": {
                "items": {
                    "normal_food": self.normal_food,
                    "premium_food": self.premium_food
                }
            }
        }
        return request_body

class FeedPandaViewTests(TestCase):
    PandaEntity = PandaEntity
    FeedingRequestEntity = FeedingRequestEntity

    # if this is successful, it means that 
    # 1.a new panda status is created when there is no panda status 
    # 2.it is not possible to give more food than the panda has
    def test_feed_panda_when_no_panda(self):
        PandaStatus.objects.all().delete()
        feeding_request = self.FeedingRequestEntity(1, 1)
        response = self.client.post("/panda/feed/", data=feeding_request.get_request_body(), content_type="application/json")
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.json(), {"status": "error", "message": "you don't have enough food "})

    def test_feed_panda_when_one_panda_exists(self):
        PandaStatus.objects.all().delete()
        panda1 = self.PandaEntity(2, 110, 8, 3, 4)
        panda1.create_panda_status()
        feeding_request = self.FeedingRequestEntity(1, 1)
        response = self.client.post("/panda/feed/", data=feeding_request.get_request_body(), content_type="application/json")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), {"status": "success", "message": "feeding success"})
        panda1 = PandaStatus.objects.get(pk=1)
        self.assertEqual(panda1.level, 2)
        self.assertEqual(panda1.experience_points, 150)
        self.assertEqual(panda1.eaten_bamboo_count, 10)
        self.assertEqual(panda1.owned_normal_bamboo_count, 2)
        self.assertEqual(panda1.owned_premium_bamboo_count, 3)

    def test_level_up(self):
        PandaStatus.objects.all().delete()
        panda1 = self.PandaEntity(2, 110, 8, 3, 4)
        panda1.create_panda_status()
        feeding_request = self.FeedingRequestEntity(0, 2)
        response = self.client.post("/panda/feed/", data=feeding_request.get_request_body(), content_type="application/json")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), {"status": "success", "message": "feeding success"})
        panda1 = PandaStatus.objects.get(pk=1)
        self.assertEqual(panda1.level, 3)
        self.assertEqual(panda1.experience_points, 170)
        self.assertEqual(panda1.eaten_bamboo_count, 10)
        self.assertEqual(panda1.owned_normal_bamboo_count, 3)
        self.assertEqual(panda1.owned_premium_bamboo_count, 2)

    def test_feed_nothing(self):
        PandaStatus.objects.all().delete()
        panda1 = self.PandaEntity(2, 110, 8, 3, 4)
        panda1.create_panda_status()
        feeding_request = self.FeedingRequestEntity(0, 0)
        response = self.client.post("/panda/feed/", data=feeding_request.get_request_body(), content_type="application/json")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), {"status": "success", "message": "feeding success"})
        panda1 = PandaStatus.objects.get(pk=1)
        self.assertEqual(panda1.level, 2)
        self.assertEqual(panda1.experience_points, 110)
        self.assertEqual(panda1.eaten_bamboo_count, 8)
        self.assertEqual(panda1.owned_normal_bamboo_count, 3)
        self.assertEqual(panda1.owned_premium_bamboo_count, 4)

    def test_feed_negative_amount_of_food(self):
        PandaStatus.objects.all().delete()
        panda1 = self.PandaEntity(2, 110, 8, 3, 4)
        panda1.create_panda_status()
        feeding_request = self.FeedingRequestEntity(-1, -1)
        response = self.client.post("/panda/feed/", data=feeding_request.get_request_body(), content_type="application/json")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), {"status": "success", "message": "feeding success"})
        panda1 = PandaStatus.objects.get(pk=1)
        self.assertEqual(panda1.level, 2)
        self.assertEqual(panda1.experience_points, 110)
        self.assertEqual(panda1.eaten_bamboo_count, 8)
        self.assertEqual(panda1.owned_normal_bamboo_count, 3)
        self.assertEqual(panda1.owned_premium_bamboo_count, 4)

    def test_bad_json_format(self):
        PandaStatus.objects.all().delete()
        panda1 = self.PandaEntity(2, 110, 8, 3, 4)
        panda1.create_panda_status()
        response = self.client.post("/panda/feed/", data={"panda_feed":{"items":{"normal_food":1}}}, content_type="application/json")
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.json(), {"status": "error", "message": "bad json format \n " + str({"panda_feed":{"items":{"normal_food":1}}})})

    def test_access_with_get(self):
        response = self.client.get("/panda/feed/")
        self.assertEqual(response.status_code, 405)
        self.assertEqual(response.json(), {"status": "error", "message": "method must be POST"})