import CreateProductUseCase from "./create.product.usecase";

const input = {
    name: "product 1",
    price: 10
}

const MockRepository = () => {
    return {
        create: jest.fn(),
        update: jest.fn(),
        find: jest.fn(),
        findAll: jest.fn()
    };
};

describe("Unit test create product unit test", () => {
    it("should create a product", async () => {
        const productRepository = MockRepository();
        const productCreateUseCase = new CreateProductUseCase(productRepository);

        const output = await productCreateUseCase.execute(input);

        expect(output).toEqual({
            id: expect.any(String),
            name: input.name,
            price: input.price
        });
    });

    it("it should throw an error when name is missing", async () => {
        const productRepository = MockRepository();
        const productCreateUseCase = new CreateProductUseCase(productRepository);

        const new_input = {
            name: "",
            price: input.price
        }
        await expect(productCreateUseCase.execute(new_input)).rejects.toThrow(
            "Name is required"
          );
    });

    it("it should throw an error when price is negative", async () => {
        const productRepository = MockRepository();
        const productCreateUseCase = new CreateProductUseCase(productRepository);

        const new_input = {
            name: input.name,
            price: -1
        }
        await expect(productCreateUseCase.execute(new_input)).rejects.toThrow(
            "Price must be greater than zero"
          );
    });
});