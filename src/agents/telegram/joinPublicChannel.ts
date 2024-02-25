import { bot } from "../../inits/telegram.ts";

// Function to join a public channel by its username
function joinPublicChannel(channelUsername: string) {
  bot
    .getChat(`@${channelUsername}`)
    .then((chat: any) => {
      // Check if the chat is a channel
      if (chat.type === "channel") {
        // Join the channel
        bot
          .joinChat(chat.id)
          .then(() => {
            console.log(`Joined channel: ${channelUsername}`);
          })
          .catch((error: any) => {
            console.error(`Error joining channel: ${error}`);
          });
      } else {
        console.error(
          `The provided username is not a channel: ${channelUsername}`
        );
      }
    })
    .catch((error: any) => {
      console.error(`Error searching for channel: ${error}`);
    });
}

export default joinPublicChannel;
