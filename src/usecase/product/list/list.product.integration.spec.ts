import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import { OutputListProductDto } from "./list.product.dto";
import ListProductUseCase from "./list.product.usercase";

describe("Test list product use case", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should list products", async () => {
    const productRepository = new ProductRepository();
    const usecase = new ListProductUseCase(productRepository);

    const product1 = new Product("123", "product 1", 10);
    const product2 = new Product("456", "product 2", 20);

    await productRepository.create(product1);
    await productRepository.create(product2);

    await productRepository.findAll();

    const output: OutputListProductDto = {
      products: [product1, product2] 
    };

    const result = await usecase.execute();

    expect(result.products.length).toBe(output.products.length);
    expect(result.products[0].id).toBe(output.products[0].id);
    expect(result.products[0].name).toBe(output.products[0].name);
    expect(result.products[0].price).toBe(output.products[0].price);
    expect(result.products[1].id).toBe(output.products[1].id);
    expect(result.products[1].name).toBe(output.products[1].name);
    expect(result.products[1].price).toBe(output.products[1].price);
  });
});