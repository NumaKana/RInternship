from linebot import LineBotApi
from linebot.models.send_messages import TextSendMessage


def send_line_notification(message):
    LINE_ACCESS_TOKEN = "S31I3rpwZLYWGKZdOfpPoTcl1OvDPIe07FtY8thiVbwO1u+sueqUe4ac6PaQOXOco2Jyc1p/JJ+xIjBMk6hF2M5plyTfr5t16uCFWdCgmz+8Q8xbr54Tuoc0ZMmj05XTxlRK1+ryyudgq4gt2Y6V0AdB04t89/1O/w1cDnyilFU="
    api = LineBotApi(LINE_ACCESS_TOKEN)
    user_id = "U625e0197e3331c803de47cc128c6587a"
    api.push_message(user_id, TextSendMessage(text=message))