module.exports = {
    '/todos':{
        get: {
            tags: ["API operations"], // operation's tag.
            description: "Get todos", // operation's desc.
            operationId: "getTodos", // unique operation id.
            parameters: [], // expected params.
            // expected responses
            responses: {
                // response code
                200: {
                    description: "Todos were obtained", // response desc.
                    content: {
                        // content-type
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/Todo", // Todo model
                            },
                        },
                    },
                },
            },
        },
    }
}