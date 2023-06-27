exports.run = {
   usage: ['ban', 'unban'],
   use: 'mention or reply',
   category: 'owner',
   async: async (m, {
      client,
      text,
      command,
      participants
   }) => {
      let number = isNaN(text) ? (text.startsWith('+') ? text.replace(/[()+\s-]/g, '') : (text).split`@` [1]) : text
      if (!text && !m.quoted) return client.reply(m.chat, Func.texted('bold', `🚩 Tag atau Reply target obrolan.`), m)
      if (isNaN(number)) return client.reply(m.chat, Func.texted('bold', `🚩 Nomor tidak valid.`), m)
      if (number.length > 15) return client.reply(m.chat, Func.texted('bold', `🚩 Format tidak valid.`), m)
      try {
         if (text) {
            var user = number + '@s.whatsapp.net'
         } else if (m.quoted.sender) {
            var user = m.quoted.sender
         } else if (m.mentionedJid) {
            var user = number + '@s.whatsapp.net'
         }
      } catch (e) {} finally {
         let is_user = global.db.users
         let is_owner = [global.client.user.id.split`@` [0], global.owner, ...global.db.setting.owners].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(user)
         if (!is_user.some(v => v.jid == user)) return client.reply(m.chat, Func.texted('bold', `🚩 Data pengguna tidak ditemukan.`), m)
         if (command == 'ban') {
            if (is_owner) return client.reply(m.chat, Func.texted('bold', `🚩 Tidak dapat banned nomor owner.`), m)
            if (user == client.user.id) return client.reply(m.chat, Func.texted('bold', `🚩 ??`), m)
            if (is_user.find(v => v.jid == user).banned) return client.reply(m.chat, Func.texted('bold', `🚩 Target sudah dibanned.`), m)
            is_user.find(v => v.jid == user).banned = true
            let banned = is_user.filter(v => v.banned).length
            client.reply(m.chat, `乂  *B A N N E D*\n\n*“Successfully added @${user.split`@`[0]} into banned list.”*\n\n*Total : ${banned}*`, m)
         } else if (command == 'unban') {
            if (!is_user.find(v => v.jid == user).banned) return client.reply(m.chat, Func.texted('bold', `🚩 Target tidak dibanned.`), m)
            is_user.find(v => v.jid == user).banned = false
            let banned = is_user.filter(v => v.banned).length
            client.reply(m.chat, `乂  *U N B A N N E D*\n\n*“Succesfully removing @${user.split`@`[0]} from banned list.”*\n\n*Total : ${banned}*`, m)
         }
      }
   },
   owner: true,
   cache: true,
   location: __filename
}