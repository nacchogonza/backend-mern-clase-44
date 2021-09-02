import ApiProductos from "../api/productosApi.js";

class ProductosController {
  constructor() {
    this.apiProductos = new ApiProductos();
  }

  getProducts = async ({ _id }) => {
    try {
      const productos = await this.apiProductos.getProductos(_id);
      return productos;
    } catch (error) {
      console.log("error getProducts controller: ", error);
    }
  };

  insertProduct = async ({ title, price, thumbnail }) => {
    try {
      const producto = { title, price, thumbnail };
      let productoGuardado = await this.apiProductos.postProducto(producto);
      return productoGuardado;
    } catch (error) {
      console.log("error postProduct: ", error);
    }
  };

  updateProduct = async ({ _id, title, price, thumbnail }) => {
    try {
      const producto = { title, price, thumbnail };
      let productoActualizado = await this.apiProductos.actualizarProducto(
        _id,
        producto
      );
      return productoActualizado;
    } catch (error) {
      console.log("error updateProduct", error);
    }
  };

  removeProduct = async ({ _id }) => {
    try {
      let productoEliminado = await this.apiProductos.eliminarProducto(
        _id
      );
      return productoEliminado;
    } catch (error) {
      console.log("error removeProduct", error);
    }
  };
}

export default ProductosController;
