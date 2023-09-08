from .models import PandaStatus
from django.http import JsonResponse
import json

def get_first_panda_or_create_one():
    # ensure that there is one panda status at least
    # create one if there is no panda status
    if PandaStatus.objects.count() < 1:
        panda = PandaStatus(
            level=0,
            experience_points=0,
            eaten_bamboo_count=0,
            owned_normal_bamboo_count=0,
            owned_premium_bamboo_count=0
        )
        panda.save()
    return PandaStatus.objects.all()[0]

def get_panda_status(request):
    if request.method == "GET":
        panda = get_first_panda_or_create_one()
        panda_status = {
            "level": panda.level,
            "exp": panda.experience_points,
            "given_food": panda.eaten_bamboo_count,
            "items": {
                "normal_food": panda.owned_normal_bamboo_count,
                "premium_food": panda.owned_premium_bamboo_count
            }
        }
        return JsonResponse({"panda_status": panda_status}, status=200)
    else:
        return JsonResponse({"status": "error", "message": "method must be GET"}, status=405)

def gain_exp(panda, normal_food_amount,premium_food_amount):
    panda_level = panda.level
    # exp: 1 normal food = 10 exp, 1 premium food = 30 exp
    new_exp = panda.experience_points + normal_food_amount * 10 + premium_food_amount * 30

    # level up
    # ratio of increasing exps required to level up
    r = 1.1  # do not set this value to 1.0 or change the formula below
    # those exps are sum of required exps for each level
    required_exp_for_next_level = 50 * (r**(panda_level+1)-1) / (r-1)
    if new_exp >= required_exp_for_next_level:
        panda_level = panda_level + 1

    # update panda status
    panda.level = panda_level
    panda.experience_points = new_exp
    panda.eaten_bamboo_count += normal_food_amount + premium_food_amount
    panda.owned_normal_bamboo_count -= normal_food_amount
    panda.owned_premium_bamboo_count -= premium_food_amount
    panda.save()


def feed_panda(request):
    if request.method == "POST":
        request_body = json.loads(request.body)
        try:
            normal_food_amount = request_body["panda_feed"]["items"]["normal_food"]
            premium_food_amount = request_body["panda_feed"]["items"]["premium_food"]

            panda = get_first_panda_or_create_one()
            if panda.owned_normal_bamboo_count < normal_food_amount or panda.owned_premium_bamboo_count < premium_food_amount:
                return JsonResponse({"status": "error", "message": "you don't have enough food "}, status=400)
            else:
                # not to give negative amount of food
                giving_normal_food_amount = max(normal_food_amount, 0)
                giving_premium_food_amount = max(premium_food_amount, 0)
                gain_exp(panda, giving_normal_food_amount, giving_premium_food_amount)
                return JsonResponse({"status": "success", "message": "feeding success"}, status=200) 
        except KeyError:
            return JsonResponse({"status": "error", "message": "bad json format \n " + str(request_body)}, status=400)
    else:
        return JsonResponse({"status": "error", "message": "method must be POST"}, status=405)

