from aiogram import Bot, Dispatcher
from aiogram.types.bot_command import BotCommand
from aiogram.types import MenuButtonWebApp, WebAppInfo
import asyncio
from logging import INFO, basicConfig

from handlers.start import StartCommand
from config import TOKEN


class TelegramBot:
    def __init__(self):
        self.bot = Bot(token=TOKEN)
        self.dp = Dispatcher()
        self.start_command = StartCommand()

        self.dp.include_router(self.start_command.router_start)
        self.command_list = [
            BotCommand(command="start", description="Start Bot 🤖")
        ]    
    
    async def run(self):
        webhook_path = f"/{TOKEN}"
        webhook_url = f"https://immensely-frank-stingray.ngrok-free.app{webhook_path}"

        # await self.bot.set_webhook(webhook_url)
        await self.dp.start_polling(self.bot)

        await self.bot.set_my_commands(self.command_list)
        web_app_info = WebAppInfo(url=self.start_command.web_app_url)
        menu_button = MenuButtonWebApp(text="Open Web App", web_app=web_app_info)

        await self.bot.set_chat_menu_button(menu_button=menu_button)

        
if __name__ == "__main__":
    basicConfig(level=INFO)
    bot = TelegramBot()
    try:
        asyncio.run(bot.run())
    except KeyboardInterrupt:
        print("Close connection!")
