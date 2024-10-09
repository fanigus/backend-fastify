const Ticket = require('../models/ticket.model');
const Event = require('../models/event.model')
const QRCode = require('qrcode');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto-js');



exports.getAllEvent = async () => {
  return await Event.findAll();
};

exports.createTicket = async (ticketData) => {
    try{
        const data = {
            firstname:ticketData.firstname,
            lastname:ticketData.lastname,
            classe:ticketData.lastname,
            eventId:ticketData.eventId,
            isUsed:false
        };
        // creation du ticket dans la base de doonnées
        const ticket = await Ticket.create(data)
        const userData = JSON.stringify(ticket);
        // Génération du QR code du ticket avec les informations du client
        const qrData = crypto.AES.encrypt(userData,process.env.KEY).toString();
        const qrCodeFileName = `qr_${ticket.id}${data.eventId}.png`; 
        const qrCodePath = path.join(__dirname, '../qrcodes', qrCodeFileName); 
        if (!fs.existsSync(path.join(__dirname, '../qrcodes'))) {
            fs.mkdirSync(path.join(__dirname, '../qrcodes'));
        }
    
        // Génération du QR code et sauvegarde en tant qu'image
        await QRCode.toFile(qrCodePath, qrData);
    
        // URL de l'image du QR code
        const qrCodeUrl = `http://localhost:3000/qrcodes/${qrCodeFileName}`;

        return {qrCodeUrl}
    }catch(err){
        throw new Error(err.message)
    }
};

exports.verifyTicket = async (ticketData) =>{
    try{
        const bytes  = crypto.AES.decrypt(ticketData.key, process.env.KEY);
        const ticketInfo = JSON.parse(bytes.toString(crypto.enc.Utf8));
        const ticket = await Ticket.findOne({where:{id: ticketInfo.id}})
        if(ticket.eventId == ticketData.eventId){
            if(!ticket.isUsed){
                await Ticket.update({isUsed:true},{where:{id:ticket.id}})
                const response ="Ce ticket est valide"
                return{response}
            }else{
                const response ="Ce ticket a déja été utilisé"
                return {response}
            }
        }else{
            const response = "Ce ticket n'est pas valide pour cet évènement."
            return {response}
            
        }
    }catch(err){
        throw new Error(err.message)
    }
}
