exports.default = (api, mongoose) => {
    // get Mongoose Schema type
    const Schema = mongoose.Schema

    // create a new Schema
    const newSchema = new Schema({

        user_id: {
            type: String,
            required: false
        },
        titulo: {
            type: String,
            required: true
        },
        descricao: {
            type: String,
            required: true
        },
        tipo: {
            type: String,
            required: true
        },
        protecaoIdentidade: {
            type: Boolean,
            required: true
        },
        concelho: {
            type: String,
            required: true
        },
        localizacao: {
            latitude: String,
            longitude: String
        },
        estado: {
            type: String,
            required: true
        },
        imagens: [
            {
                nome: String,
                tamanho: Number
            }
        ],
        confirmacao: [
            {
                user_id: String
            }
        ],
        apoio: [
            {
                user_id: String
            }
        ],
        denuncia: [
            {
                user_id: String,
                menssagem: String
            }
        ]

    }, {timestamps: true})

    // return the created schema
    return newSchema
}
