import swaggerUI from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc'
import { Application } from 'express';

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Historical Exchange Data REST API",
            version: "1.0.0",
            description: "API documentation for the Historical Exchange Data service"
        },
    },
    apis:["./src/routes/*.ts"]
};

const specs = swaggerJsDoc(options);

const setupSwagger = (app: Application) => {
    app.use("/api/docs", swaggerUI.serve, swaggerUI.setup(specs));
};

export default setupSwagger;