import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import docs from "../doc/swagger"

function swagger(server) {

    server.use(
        "/api-docs",
        swaggerUi.serve,
        swaggerUi.setup(docs)
    );
}

export default swagger