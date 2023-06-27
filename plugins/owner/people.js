exports.run = {
   usage: ['+owner', '-owner'],
   use: 'mention or reply',
   category: 'owner',
   async: async (m, {
      client,
      text,
      isPrefix,
      command
   }) => {
      let owners = global.db.setting.owners
      let number = isNaN(text) ? (text.startsWith('+') ? text.replace(/[()+\s-]/g, '') : (text).split`@` [1]) : text
      if (!text && !m.quoted) return client.reply(m.chat, Func.texted('bold', `🚩 Tag atau Reply target obrolan.`), m)
      if (isNaN(number)) return client.reply(m.chat, Func.texted('bold', `🚩 Nomor tidak valid.`), m)
      if (number.length > 15) return client.reply(m.chat, Func.texted('bold', `🚩 Format tidak valid.`), m)
      try {
         if (text) {
            var user = number
         } else if (m.quoted.sender) {
            var user = m.quoted.sender.replace(/@.+/, '')
         } else if (m.mentionedJid) {
            var user = number
         }
      } catch (e) {} finally {
         if (command == '+owner') {
            if (owners.includes(user)) return client.reply(m.chat, Func.texted('bold', `🚩 Target sudah menjadi owner.`), m)
            owners.push(user)
            client.reply(m.chat, Func.texted('bold', `🚩 Berhasil ditambahkan @${user} menjadi owner.`), m)
         } else if (command == '-owner') {
            if (!owners.includes(user)) return client.reply(m.chat, Func.texted('bold', `🚩 Target bukan owner.`), m)
            owners.forEach((data, index) => {
               if (data === user) owners.splice(index, 1)
            })
            client.reply(m.chat, Func.texted('bold', `🚩 Berhasil menghapus @${user} dari owner.`), m)
         }
      }
   },
   owner: true
}