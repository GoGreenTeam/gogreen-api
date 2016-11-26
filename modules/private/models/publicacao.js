exports.default = (api, mongoose) => {
    // get Mongoose Schema type
    const Schema = mongoose.Schema

    // create a new Schema
    const newSchema = new Schema({

        titulo: {
            type: String,
            required: true
        },
        descricao: {
            type: String,
            required: true
        },
        estado: {
            type: String,
            default: 'Por Confirmar',
            required: true
        },
        imagens: [
            {
                name:{
                    type:String,
                    required:true
                },
                serverName:{
                    type:String,
                    required:true
                }
            }
        ],
        feedback: [
            /*{
                confirmo: {
                    type: Boolean
                },
                apoio: {
                    type: Boolean
                },
                user_id: {
                    id: String
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
             },
             user_id: {
             id: String
             }
             }*/
        ]

    }, {timestamps: true})

    // return the created schema
    return newSchema
}
