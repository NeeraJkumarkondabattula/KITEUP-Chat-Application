const Messages = require('../model/messageModel');

module.exports.addmsg = async (req,res) =>{
    try{
        const {from,to,message} = req.body;
        const data = await  Messages.create({
            message:{text:message},
            users:[from,to],
            sender:from
        })
        if(data) return res.json({message:"Message added successfully"});
        return res.json({message:"Failed add msg to database!"});
    }catch(err){

    }
}

module.exports.getmsgs = async (req,res) =>{
    try{
        const {from,to}= req.body;
        const messages = await Messages.find({
            users:{
                $all:[from,to]
            }
        }).sort({updateAt:1})

        const projectMessages = messages.map((msg)=>{
            return{
                fromSelf:msg.sender.toString()===from,
                message:msg.message.text
            }
        })
        // console.log(projectMessages);
        return res.json(projectMessages)
    }catch(err){
        
    }
}