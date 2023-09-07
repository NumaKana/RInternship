from .models import PandaStatus
from django.http import JsonResponse
import json


def get_panda_status(request):
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
    panda = PandaStatus.objects.get(pk=1)
    panda_status = {
        "level": panda.level,
        "exp": panda.experience_points,
        "given_food": panda.eaten_bamboo_count,
        "items": {
            "normal_food": panda.owned_normal_bamboo_count,
            "premium_food": panda.owned_premium_bamboo_count
        }
    }
    return JsonResponse({"panda_status": panda_status})

def gain_exp(panda, normal_food_amount,premium_food_amount):
    #TODO: implement, see the miro board
    panda_level = panda.level
    # exp: 1 normal food = 10 exp, 1 premium food = 30 exp
    new_exp = panda.experience_points + normal_food_amount * 10 + premium_food_amount * 30

    required_exp_for_next_level = 50 * (1.1)**(panda_level-1)
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
        print(request_body)
        try:
            normal_food_amount = request_body["panda_feed"]["items"]["normal_food"]
            premium_food_amount = request_body["panda_feed"]["items"]["premium_food"]

            panda = PandaStatus.objects.get(pk=1)
            if panda.owned_normal_bamboo_count < normal_food_amount or panda.owned_premium_bamboo_count < premium_food_amount:
                return JsonResponse({"error": "not enough food"}, status=400)
            else:
                gain_exp(panda, normal_food_amount, premium_food_amount)
                return JsonResponse({"status": "success", "message": "feeding success"}, status=200)#TODO: comply this message format 
        except KeyError:
            return JsonResponse({"status": "error", "message": "bad_json_format \n " + str(request_body)}, status=400)
    else:
        return JsonResponse({"error": "method must be POST"}, status=405)

