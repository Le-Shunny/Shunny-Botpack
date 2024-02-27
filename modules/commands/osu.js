module.exports.config = {
  name: "osucatch",
  version: "1.1",
  hasPermssion: 0,
  credits: "Shen",
  description: "Get your osu catch signature!",
  usePrefix: true,
  commandCategory: "other",
  usages: "osu <username> <std/mania/catch/taiko",
  cooldowns: 5,
  dependencies: {
        "fs-extra": "",
        "path": "",
    }
};

module.exports.run = async ({ event, api, args, }) => {
    const { readFileSync, createReadStream, unlinkSync } = global.nodemodule["fs-extra"];

    try {
        const path = __dirname + `/cache/${event.threadID}-${event.senderID}s.png`;
        await global.utils.downloadFile(`https://image.thum.io/get/width/1920/crop/400/fullpage/noanimate/https://osu-sig.vercel.app/card?user=${args[0]}&mode=${args[1]}&lang=en&w=2002&h=1165`, path);
        api.sendMessage({ attachment: createReadStream(path) }, event.threadID, () => unlinkSync(path));
    }
    catch {
        return api.sendMessage("This url could not be found, the format is incorrect ?", event.threadID, event.messageID);
    }
}
