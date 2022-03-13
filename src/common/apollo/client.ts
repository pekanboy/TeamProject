import {ApolloClient, InMemoryCache} from "@apollo/client";

export const initApolloClient = () => {
    return new ApolloClient({
        // ToDo: Тут ссылка на бек, наверно
        uri: 'https://48p1r2roz4.sse.codesandbox.io',
        cache: new InMemoryCache(),
    });
};