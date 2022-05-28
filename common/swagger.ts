import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

function swagger(server) {
    const options = {
        definition: {
            openapi: "3.0.0",
            info: {
                title: "Exchange API with Swagger",
                version: "0.1.0",
                description: "API documentation with Swagger",
                license: {
                    name: "MIT",
                    url: "https://spdx.org/licenses/MIT.html",
                }
            },
            servers: [
                {
                    url: "http://localhost:3000/api",
                },
            ],
        },
        apis: ["../doc/swagger/coin.yaml"],
    };

    const specs = swaggerJsdoc(options);
    server.use(
        "/api-docs",
        swaggerUi.serve,
        swaggerUi.setup(specs, { explorer: true })
    );
}

export default swagger;