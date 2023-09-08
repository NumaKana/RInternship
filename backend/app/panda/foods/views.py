from django.shortcuts import render
from django.http import JsonResponse, HttpResponseBadRequest, HttpResponseNotAllowed
import json
from .models import Foods
from panda_house.models import PandaStatus
import random


def foods_handler(request):
    if request.method == 'GET':
        return get_all_foods(request)
    elif request.method == 'POST':
        return register_foods(request)
    else:
        return HttpResponseNotAllowed(['GET', 'POST'])

def food_detail_handler(request, id):
    if request.method == 'POST':
        return consume_food(request, id)
    elif request.method == 'PUT':
        return edit_food(request, id)
    elif request.method == 'DELETE':
        return delete_food(request, id)
    else:
        return HttpResponseNotAllowed(['PUT', 'DELETE'])

def get_all_foods(request):
    foods = Foods.objects.all()
    food_list = []

    for food in foods:
        food_list.append({
            "food": {
                "food_id": food.food_id,
                "food_name": food.food_name,
                "category": food.category,
                "expiration_date": food.expiration_date.strftime("%Y-%m-%d"),
                "storage_status": food.storage_status,
                "last_update_datetime": food.last_update_datetime.strftime("%Y-%m-%dT%H:%M:%S.%f"),
                "registration_datetime": food.registration_datetime.strftime("%Y-%m-%dT%H:%M:%S.%f"),
            }
        })
    return JsonResponse({"food_list": food_list})


def register_foods(request):
    if request.method != 'POST':
        return HttpResponseBadRequest("Invalid request method")

    try:
        data = json.loads(request.body)
        food_data = data.get('food_add')
        
        if not food_data:
            return HttpResponseBadRequest("Invalid request format")

        food = Foods(
            food_name=food_data.get('food_name'),
            category=food_data.get('category'),
            expiration_date=food_data.get('expiration_date'),
            storage_status=food_data.get('storage_status'),
        )
        food.save()

    except json.JSONDecodeError:
        return HttpResponseBadRequest("Failed to decode JSON")

    return JsonResponse({"status": "success", "message": "Food registered successfully"})
    

def consume_food(request, id):
    if request.method != 'POST':
        return HttpResponseBadRequest("Invalid request method")
    
    try:
        food = Foods.objects.get(pk=id)
        food.delete()

        panda_status = PandaStatus.objects.all()[0]

        rand_value = random.random()
        if rand_value < 0.7:
            panda_status.owned_normal_bamboo_count += 1
        else:
            panda_status.owned_premium_bamboo_count += 1

        panda_status.save()
        
        return JsonResponse({"status": "success", "message": "Food consumed and bamboo added"})
    except Foods.DoesNotExist:
        return JsonResponse({"status": "error", "message": "Food with given id does not exist"}, status=404)

def edit_food(request, id):
    if request.method != 'PUT':
        return HttpResponseBadRequest("Invalid request method")

    try:
        data = json.loads(request.body)
        food_data = data.get('food_edit')
        
        if not food_data:
            return HttpResponseBadRequest("Invalid request format")
        
        food = Foods.objects.get(pk=id)

        food.food_name = food_data.get('food_name', food.food_name)
        food.category = food_data.get('category', food.category)
        food.expiration_date = food_data.get('expiration_date', food.expiration_date)
        food.storage_status = food_data.get('storage_status', food.storage_status)

        food.save()

    except Foods.DoesNotExist:
            return JsonResponse({"status": "error", "message": "Food with given id does not exist"}, status=404)
    except json.JSONDecodeError:
        return HttpResponseBadRequest("Failed to decode JSON")

    return JsonResponse({"status": "success", "message": "Food updated successfully"})

def delete_food(request, id):
    if request.method != 'DELETE':
        return HttpResponseBadRequest("Invalid request method")

    try:
        food = Foods.objects.get(pk=id)
        food.delete()
        return JsonResponse({"status": "success", "message": "Food deleted successfully"})

    except Foods.DoesNotExist:
        return JsonResponse({"status": "error", "message": "Food with given id does not exist"}, status=404)
