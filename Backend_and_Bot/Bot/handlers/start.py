from aiogram import Router, Bot, F
from aiogram.types import Message, InlineKeyboardButton, InlineKeyboardMarkup, WebAppInfo, CallbackQuery
from aiogram.filters import CommandStart, Command



class StartCommand:
    def __init__(self) -> None:
        
        self.router_start = Router()

        self.router_start.message.register(self.start_cmd, CommandStart())
        self.router_start.callback_query.register(self.help_callback, F.data == "help")


    async def add_user_to_db(message: Message):
        pass
        # username = message.from_user.username
        # telegram_id = message.from_user.id
        # username_telegram = message.from_user.first_name
        # database.cursor.execute("SELECT * FROM users WHERE id = %s", (telegram_id,))
        # record = database.cursor.fetchone()

        # if message.chat.type == "private" or message.chat.type == "supergroup" or message.chat.type == "group":
        #     if record is None:
        #             database.cursor.execute("INSERT INTO users (id, tg_name, link) VALUES (%s, %s, %s)", (telegram_id, username_telegram, username))
        #             database.conn.commit()
        #     else:
        #         if record[1] != username_telegram or record[1] != username:
        #             database.cursor.execute("UPDATE users SET tg_name = %s, link = %s WHERE id = %s", (username_telegram, username, telegram_id,))
        #             database.conn.commit()


    async def start_cmd(self, message: Message, bot: Bot):
        # await self.add_user_to_db(message=message)
        bot_info = await bot.get_me()
        keyboard = InlineKeyboardMarkup(inline_keyboard=[
            [InlineKeyboardButton(text="Play and Earn", web_app=WebAppInfo(url=f"https://t.me/{bot_info.username}"))],
            [InlineKeyboardButton(text="Join community", url=f"https://t.me/{bot_info.username}")],
            [InlineKeyboardButton(text="Help", callback_data="help")]
        ])
        await message.answer(f"Hello\n{bot_info.username}", reply_markup=keyboard, message_effect_id="5104841245755180586")

    async def help_callback(self, callback: CallbackQuery):
        await callback.message.answer(text="Help is on the way!", message_effect_id="5104841245755180586")


