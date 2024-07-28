from aiogram import Router, Bot, F
from aiogram.types import Message
from aiogram.utils.deep_linking import create_start_link
from aiogram.filters import Command, CommandStart
import psycopg2

connection = psycopg2.connect(
    dbname="ZombieTap_DB", 
    user="postgres", 
    host="localhost", 
    password="2008"
)

class AddFriendCommand:
    def __init__(self) -> None:
        
        self.router_add_friend = Router()
        self.is_input_id = False

        self.router_add_friend.message.register(self.add_friend_cmd, Command("add_friend"))
        self.router_add_friend.message.register(self.message_from_friend, CommandStart(deep_link=True))
    
    async def message_from_friend(self, message: Message, bot: Bot):
        friend_id = message.text[7:]
        user = await bot.get_chat(friend_id)
        with connection.cursor() as cursor:
            try:
                cursor.execute('INSERT INTO "ZombieTapApp_friends" (user_id, friend_id) VALUES (%s, %s)', (message.from_user.id, friend_id))
                connection.commit()
                await message.reply(f"You are now friends with @{user.username}!")
                await bot.send_message(chat_id=user.id, text=f"You are now friends with @{message.from_user.username}!")
            except psycopg2.errors.UniqueViolation:
                await message.reply(f"You is friends with @{user.username}!")


    async def add_friend_cmd(self, message: Message, bot: Bot):
       link = await create_start_link(bot, f'{message.from_user.id}', encode=False)
       await message.reply(text=f"Send this link to a friend so as add him\n\n<code>{link}</code>", parse_mode="html")
   
