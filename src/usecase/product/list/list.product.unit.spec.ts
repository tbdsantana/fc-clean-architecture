import Product from "../../../domain/product/entity/product";
import ListProductUseCase from "./list.product.usercase";

const product1 = new Product("123", "product 1", 10);
const product2 = new Product("456", "product 2", 20);

const MockRepository = () => {
    return {
        create: jest.fn(),
        find: jest.fn(),
        findAll: jest.fn().mockReturnValue([product1, product2]),
        update: jest.fn(),
    }
};

describe("Unit test to list all products", () => {
    it("should list all products", async () => {
        const repository = MockRepository();
        const usecase = new ListProductUseCase(repository);

        const output = await usecase.execute();

        expect(output.products.length).toBe(2);
        expect(output.products[0].id).toBe(product1.id);
        expect(output.products[0].name).toBe(product1.name);
        expect(output.products[0].price).toBe(product1.price);
        expect(output.products[1].id).toBe(product2.id);
        expect(output.products[1].name).toBe(product2.name);
        expect(output.products[1].price).toBe(product2.price);
    });
});