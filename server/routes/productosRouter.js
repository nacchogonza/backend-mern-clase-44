import { graphqlHTTP } from 'express-graphql';
import { buildSchema } from 'graphql';
import config from '../../config.js'

import ProductosController from "../controller/productosController.js";

class RouterProductos {
  constructor() {
    this.productosController = new ProductosController(); // inicializar el controller
  }

  start() {
    // GraphQL schema
    const schema = buildSchema(`
    type Query {
        productos(_id: String): [Producto]
    }
    type Mutation {
        guardarProducto(
            title: String!,
            price: Float!,
            thumbnail: String!,
        ): Producto,
        actualizarProducto(
            _id: String!,
            title: String!,
            price: Float!,
            thumbnail: String!,
        ): Producto,
        borrarProducto(
            _id: String!,
        ): Producto,                                
    },
    type Producto {
        _id: String,
        title: String
        price: Float
        thumbnail: String
    }    
`);

    // Root resolver
    const root = {
      productos: (_id) => this.productosController.getProducts(_id),
      guardarProducto:(title, price, thumbnail) => this.productosController.insertProduct(title, price, thumbnail),
      actualizarProducto: (_id, title, price, thumbnail) =>
        this.productosController.updateProduct(_id, title, price, thumbnail),
      borrarProducto: (_id) => this.productosController.removeProduct(_id),
    };

    return graphqlHTTP({
      schema: schema,
      rootValue: root,
      graphiql: config.GRAPHIQL == "true",
    });
  }
}

export default RouterProductos;
