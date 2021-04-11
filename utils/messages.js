const moment = require('moment');

const formatMessages = (userName, text, bot) => {
    return {
        userName,
        text,
        time: moment().format('h:mm a'),
        bot
    }
}

module.exports = formatMessages;