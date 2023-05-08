import Product from "../../../domain/product/entity/product";
import UpdateProductUseCase from "./update.product.usecase";

const old_product = new Product("123", "product 1", 10);

const updated_input = {
    id: "123",
    name: "product 1",
    price: 15
};

const MockRepository = () => {
    return {
        create: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(old_product)),
        update: jest.fn(),
        findAll: jest.fn(),
    };
};

describe("Unit test update a product", () => {
    it("should update a product", async () => {
        const productRepository = MockRepository();
        const usecase = new UpdateProductUseCase(productRepository);

        const output = await usecase.execute(updated_input);
        expect(output).toEqual(updated_input)
    });

    it("should throw an error when name is missing", async () => {
        const productRepository = MockRepository();
        const usecase = new UpdateProductUseCase(productRepository);

        const invalid_input = {
            id: updated_input.id,
            name: "",
            price: updated_input.price,
        }

        expect(async () => {
            await usecase.execute(invalid_input);
        }).rejects.toThrowError("Name is required");
    });

    it("should throw an error when price is negative", async () => {
        const productRepository = MockRepository();
        const usecase = new UpdateProductUseCase(productRepository);

        const invalid_input = {
            id: updated_input.id,
            name: updated_input.name,
            price: -10,
        }

        expect(async () => {
            await usecase.execute(invalid_input);
        }).rejects.toThrowError("Price must be greater than zero");
    });
});