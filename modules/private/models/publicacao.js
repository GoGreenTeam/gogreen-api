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
        localizacao: [],
        estado: {
            type: String,
            required: true
        },
        imagens: [String]
        ,
        feedback: [
            /*{
             confirmo: {
             type: Boolean
             },
             apoio: {
             type: Boolean
             },
             user_id: {
             type: Mixed
             }
             }*/
        ],
        denuncia: [
            /*  {
             user_id: {
             type: Mixed
             },
             menssagem: {
             type: String
             }
             }*/
        ]

    }, {timestamps: true})

    // return the created schema
    return newSchema
}
