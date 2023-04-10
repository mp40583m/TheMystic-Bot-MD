import { addExif } from '../lib/sticker.js'
let handler = async (m, { conn, text }) => {
if (!m.quoted) throw '*يجب ان ترد علي ملصق لي يتم سرقتة🥷₸*'
let stiker = false
try {
let [packname, ...author] = text.split('|')
author = (author || []).join('|')
let mime = m.quoted.mimetype || ''
if (!/webp/.test(mime)) throw '*يجب ان ترد علي ملصق لي يتم سرقتة🥷₸*'
let img = await m.quoted.download()
if (!img) throw '*يجب ان ترد علي ملصق لي يتم سرقتة🥷₸*'
stiker = await addExif(img, packname || global.packname, author || global.author)
} catch (e) {
console.error(e)
if (Buffer.isBuffer(e)) stiker = e
} finally {
if (stiker) conn.sendFile(m.chat, stiker, 'wm.webp', '', m, false, { asSticker: true })
else throw '*عذرًا ، هناك شيء خاطئ .. تحقق من أنك قد استجابت لملصق وأن هناك اسم مستخدم*'
}}
handler.help = ['wm <packname>|<author>']
handler.tags = ['sticker']
handler.command = /^سرقة|سرقه|wm$/i
export default handler
