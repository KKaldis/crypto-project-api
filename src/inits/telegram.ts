import TelegramBot from "node-telegram-bot-api";

const { TELEGRAM_TOKEN } = process.env;

const bot = new TelegramBot(TELEGRAM_TOKEN as string, {
  polling: false
});

export { bot };
