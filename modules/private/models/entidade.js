exports.default = (api, mongoose) => {
    // get Mongoose Schema type
    const Schema = mongoose.Schema

    // create a new Schema
    const newSchema = new Schema({
        nome: {
            type: String,
            required: true
        },
        concelho: {
            type: String,
            required: true
        },
        contactos: [
            /*{
                morada: {
                    type: String,
                    required: true
                },
                telefone: {
                    type: Number,
                    required: true
                },
                email: {
                    type: Number,
                    required: true
                }
            }*/
        ]


    }, {timestamps: true})

    // return the created schema
    return newSchema
}
