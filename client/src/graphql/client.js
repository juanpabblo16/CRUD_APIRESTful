import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const client = new ApolloClient({
    link: new HttpLink({
        uri: 'http://localhost:5000/graphql', // Cambia a la URL de tu servidor
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Si estás usando tokens JWT
        },
    }),
    cache: new InMemoryCache(),
});

export default client;
