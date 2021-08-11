import { ApolloServer, PubSub } from "apollo-server"
import mongoose from 'mongoose';
import typeDefs from './TypeDefs'
import resolvers from './Resolvers'


(async()=>{
    await mongoose.connect('mongodb+srv://admin:admin@cluster0.ru1lu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', { useNewUrlParser: true, useCreateIndex: true, autoIndex: false, useUnifiedTopology: true });
    const pubsub = new PubSub();
    const server = new ApolloServer({
      typeDefs,
      resolvers,
      context: ({ req, res }) => ({ req, res, pubsub }),
    });
    
    server
      .listen()
      .then(({ url }) =>
        console.log('\x1b[33m%s\x1b[0m:', `Server started ${JSON.stringify(url)}`)
      );
})()

