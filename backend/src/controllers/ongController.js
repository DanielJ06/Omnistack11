const connection = require('../database/connection');
const crypto = require('crypto');

const Mail = require('../lib/Mail')

module.exports = {
    async index (req, res) {
        const ongs = await connection('ongs').select('*');
        
        return res.json(ongs);
    },

   async create(req, res) {
       const { name, email, whatsapp, city, uf } = req.body;

       const id = crypto.randomBytes(4).toString('HEX');

       await connection('ongs').insert({
           id,
           name,
           email,
           whatsapp,
           city,
           uf
       })

       await Mail.sendMail({
            to: `${name} <${email}>`,
            subject: 'Sua ONG foi cadastrada',
            text: `Sua ONG foi cadastrada, seu email de login é: ${ id }`
       })
       
       return res.json({ id });
   }
}