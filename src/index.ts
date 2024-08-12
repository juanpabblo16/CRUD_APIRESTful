import express, {Express, Request, Response} from 'express';
import dotenv from 'dotenv';

import { router } from './routes/posts';
import { router as user } from './routes/users';
import { db } from './config/db';

dotenv.config();

const app: Express = express();

app.use(express.json());
//Para enviar variables con post
app.use(express.urlencoded({extended: true}));

const port = process.env.port || 3000;

app.get('/', (req: Request, res: Response) =>{
    res.send('Hello word xd');
});

app.use('/api/posts', router);

//Escucha si envian get por el puerto, imprime el mensaje

db.then(() => app.listen(port, ()=>{
    console.log('Server is running on port ${Port}')
}));


