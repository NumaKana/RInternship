import sys
import os
import schedule
import time
from datetime import datetime, timedelta


sys.path.append(os.path.join(os.path.dirname(__file__), '..'))
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "panda.settings")

import django
django.setup()

from foods.models import Foods
from services import send_line_notification


def notify_upcoming_expirations():
    today = datetime.now().date()
    target_date = today + timedelta(days=3)
    expiring_foods = Foods.objects.filter(expiration_date__range=(today, target_date))
    
    for food in expiring_foods:
        days_left = (food.expiration_date - today).days
        message = f"{food.food_name}の消費/賞味期限が残り{days_left}日だよ!"
        send_line_notification(message)

def notify_recently_expired():
    today = datetime.now().date()
    seven_days_ago = today - timedelta(days=7)
    
    expired_foods = Foods.objects.filter(expiration_date__range=(seven_days_ago, today))
    
    for food in expired_foods:
        days_expired = (today - food.expiration_date).days
        message = f"{food.food_name}の消費/賞味期限が{days_expired}日前に切れたよ!"
        send_line_notification(message)


# 毎朝8:00に設定
schedule.every().day.at("08:00").do(notify_upcoming_expirations)
schedule.every().day.at("08:00").do(notify_recently_expired)

# 本番用のスケジュール実行(デモ時はコメントアウト)
while True:
    schedule.run_pending()
    time.sleep(10)

# デモ用
# notify_upcoming_expirations()
# notify_recently_expired()
