import swaggerJSDoc from 'swagger-jsdoc';


const swaggerOptions ={
    swaggerDefinition: {
        openapi: '3.0.1',
        info: {
            title: 'Document Adoptme API',
            version: '1.0.0',
            description: 'Adoptme API Information',
        }
    },
        apis:[
            './src/docs/**/*.yaml'
        ]
    
}

export const specs = swaggerJSDoc(swaggerOptions)