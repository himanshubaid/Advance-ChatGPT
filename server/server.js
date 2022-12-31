import express from 'express';
import * as dotenv from 'dotenv';// This is to get data from .env file
 import cors from 'cors';//allow us to make 
 import { Configuration,OpenAIApi } from 'openai';

 dotenv.config();
 

 const configuration=new Configuration({//function that except a key 
    apiKey:process.env.OPENAI_API_KEY,
 })

 const openai =new OpenAIApi(configuration);//instance of OpenAIApi

 const app=express();
 app.use(cors());//It will allow to call urgent request to server form frontend side
 app.use(express.json());//It will allow to pass json from frontend to backend

 app.get('/',async (req,res)=>{//To get the req from frontend
    res.status(200).send({
        message:'Hello from Codex',
    })
 })

 app.post('/',async(req,res)=>{
    try{
        const promt=req.body.prompt;

        const response=await openai.createCompletion({
            model:"text-davinci-003",
            prompt:`${promt}`,
            temperature:0,//no risk more temp means more risks
            max_tokens:3000,//preety long responses can be printed
            top_p:1,
            frequency_penalty:0.5,//Its less likely to give same answer for the repeated question
            presence_penalty:0,
           })

           res.status(200).send({
            bot:response.data.choices[0].text
           })
    }catch(error)
    {
            console.timeLog(error);
            res.status(500).send({error})
    }
 })

  //we want that server always listen and will throw callback function to inform us that server is on 5000
 app.listen(5000,()=>console.log('server is running on port http://localhost:5000'));