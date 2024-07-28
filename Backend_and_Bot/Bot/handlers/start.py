from aiogram import Router, Bot, F
from aiogram.types import Message, InlineKeyboardButton, InlineKeyboardMarkup, WebAppInfo, CallbackQuery
from aiogram.filters import CommandStart, Command
from database.database import conn, cursor


class StartCommand:
    def __init__(self) -> None:
        
        self.router_start = Router()

        self.router_start.message.register(self.start_cmd, CommandStart())
        self.router_start.callback_query.register(self.help_callback, F.data == "help")

        self.web_app_url = 'https://immensely-frank-stingray.ngrok-free.app'


    # async def add_user_to_db(self, message: Message):
    #     cursor.execute("SELECT * FROM users WHERE id = %s", (message.from_user.id,))
    #     record = cursor.fetchone()

    #     if record is None:
    #         # Вставка нового користувача
    #         cursor.execute("INSERT INTO users (id, name, nickname) VALUES (%s, %s, %s)", (message.from_user.id, message.from_user.first_name, message.from_user.username))
    #         conn.commit()
    #     else:
    #         # Оновлення існуючого користувача, якщо ім'я або псевдонім змінені
    #         if record[1] != message.from_user.first_name or record[2] != message.from_user.username:
    #             cursor.execute("UPDATE users SET name = %s, nickname = %s WHERE id = %s", (message.from_user.first_name, message.from_user.username, message.from_user.id,))
    #             conn.commit()
                


    async def start_cmd(self, message: Message, bot: Bot):
        #await self.add_user_to_db(message=message)
        bot_info = await bot.get_me()
        keyboard = InlineKeyboardMarkup(inline_keyboard=[
            [InlineKeyboardButton(text="Play and Earn", web_app=
                                  WebAppInfo(url=self.web_app_url))],
            [InlineKeyboardButton(text="Join community", url=f"https://t.me/{bot_info.username}")],
            [InlineKeyboardButton(text="Help", callback_data="help")]
        ])
        await message.answer(f"Hello\n{bot_info.username}", reply_markup=keyboard, message_effect_id="5104841245755180586")

    async def help_callback(self, callback: CallbackQuery):
        await callback.message.answer(text="Help is on the way!", message_effect_id="5104841245755180586")


