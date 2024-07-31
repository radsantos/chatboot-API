const express = require('express')
const OpenAI = require('openai')
require('dotenv').config()

const PORT = 8082;

const server = express()

server.use(express.json())


const openai = new OpenAI({
    API_API : process.env.OPENAI_API_KEY
    
});

server.get('/', (req,res) =>{
    res.status(200).json({message: "Bem vindo ao RH+"})
})

server.get('/boot', async (req, res) =>{
    
    let message_list = [];
    
    message_list = req.body.userMessage;    

    // validando se a variavel message_list esta varzia, retornando uma mensagem de para usuário.
    if(!message_list || message_list === " " || message_list.length === 0){

        res.json({message:"Se precisar de ajuda ou tiver alguma pergunta, estou aqui para ajudar! Como posso auxiliá-lo hoje?"})

    }
    else{

        //Caso digite a palvra sair o boot será encerado.
        while(message_list != "sair"){

            if(message_list == "sair"){
                break;
            }
    
            let response = await openai.chat.completions.create({
                model:"gpt-3.5-turbo",
                messages:[
                    {"role": "system", content: "você é um assistente de recursos humano muito solícito, gentil e conciso nas respostas."},
                    {"role": "user", content: message_list}
                ],
                max_tokens: 100,
                temperature: 1
        
            }) 
             
            return res.status(200).json("boot: " + response.choices[0].message.content)
                   
    
        }
    
        res.status(200).json({message: "Obrigado! Fico feliz em poder ajudar. Se precisar de mais alguma coisa, estou à disposição."})

    }

    
   


})

server.listen(PORT, () => {
    console.log(`Servidor rodando no endereço http://localhost:${PORT}`)
});


