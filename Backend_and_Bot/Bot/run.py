from aiogram import Bot, Dispatcher
from aiogram.types.bot_command import BotCommand
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
            BotCommand(command="start", description="Запуск бота 🤖")
        ]    
    
    async def run(self):
        await self.bot.set_my_commands(self.command_list)
        await self.dp.start_polling(self.bot)


if __name__ == "__main__":
    basicConfig(level=INFO)
    bot = TelegramBot()
    try:
        asyncio.run(bot.run())
    except KeyboardInterrupt:
        print("Close connection!")
