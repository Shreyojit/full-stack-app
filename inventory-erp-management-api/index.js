
import dotenv from 'dotenv'
import fastify from 'fastify'
import db from './utils/db.js'
import authRoutes from './routes/routeController.js'




dotenv.config()

const app = fastify({logger:true})

app.register(authRoutes);


const checkConnectionDb = async()=>{
    try{
        await db.raw('SELECT NOW()')
        console.log("DB Connected")
    }catch(err){
        console.log("DB connection failed!")
    }
}

const start = async() => {
    try{
        await checkConnectionDb();
        await app.listen({ port:5000 })

    }catch(err){
        app.log.error(err);
        process.exit(1)
    }
};

start();