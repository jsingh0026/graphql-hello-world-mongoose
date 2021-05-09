import { Cat } from "../Models/cat";
const NEW_USER = "NEW_USER";
const resolvers = {
  Subscription: {
    newUser: {
      subscribe: (_, __, { pubsub }) => pubsub.asyncIterator(NEW_USER),
    },
  },
  User: {
    firstLetter: (parent, args, context) => {
      //   console.log(context);
      console.log(parent);
      return parent.username[0];
    },
  },
  Query: {
    hello: () => "naam002",
    user: () => ({
      id: 11,
      username: "A01",
    }),
    cats: ()=> Cat.find()
  },
  Mutation: {
    login: (parent, args, context, info) => args.userInfo.username,
    add: (parent, { args }, context, info) => {
      const user = {
        id: 11,
        username: "pubsub",
      };
      context.pubsub.publish(NEW_USER, {
        newUser: user,
      });
      return {
        error: [null],
        user: user,
      };
    },
    createCat: (_, { name }) => {
      const cat = new Cat({ name });
      cat.save();
      console.log(cat);
      return cat;
    },
  },
};
export default resolvers;
