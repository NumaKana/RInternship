from .models import PandaStatus
from django.http import JsonResponse

# Create your views here.

def get_panda_status(request):
    # ensure that there is one panda status at least
    panda = PandaStatus.objects.get(pk=1) #TODO: error handling
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
