import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware as apolloMiddleware } from '@apollo/server/express4';
import { readFile } from 'node:fs/promises';

import { router as commentRouter } from './routes/comments';
import { router as reactionRouter } from './routes/reactions';
import { router } from './routes/posts';
import { router as user } from './routes/users';
import { db } from './config/db';
import { resolvers } from '../src/graphql/resolvers';

dotenv.config();

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 3000;

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World');
});

// Rutas para las API REST
app.use('/api/comments', commentRouter);
app.use('/api/reactions', reactionRouter);
app.use('/api/posts', router);
app.use('/api/users', user);

async function startServer() {
    let typeDefs = await readFile("./src/graphql/schema.graphql", 'utf-8');
    const apolloServer = new ApolloServer({ typeDefs, resolvers });
    await apolloServer.start();

    // Configuración del middleware de Apollo Server en la ruta /graphql
    app.use('/graphql', apolloMiddleware(apolloServer));

    db.then(() => {
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
            console.log(`GraphQL endpoint: http://localhost:${port}/graphql`);
        });
    });
}

startServer().catch((error) => console.error("Error starting the server:", error));