json.user_name @message.user_id.name
json.date message.created_at.strftime("%Y／%m／%d %H：%M")
json.content @message.content
json.image @message.image.url
