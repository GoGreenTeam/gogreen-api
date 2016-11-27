// constant with the inputs declaration
const inputsDeclaration = {
    user_id: {required: false},
    titulo: {required: true},
    descricao: {required: true},
    tipo: {required: true},
    protecaoIdentidade: {required: false, default: false},
    concelho: {required: true},
    localizacao: {required: true},
    estado: {required: false, default: 'Por Confirmar'},
    imagens: {required: false},
    confirmacao: {required: false},
    apoio: {required: false},
    denuncia: {required: false}
}

const fs = require('fs');
const path = require('path');

// constant with the edit input declaration
const editInputDeclaration = JSON.parse(JSON.stringify(inputsDeclaration))
editInputDeclaration._id = {required: true}

module.exports = [{
    name: 'createPublicacao',
    description: 'Create a new Publicacao',

    inputs: inputsDeclaration,

    run (api, action, next) {
        // create a new model instance
        var newModel = new (api.models.get('publicacao'))(action.params)

        // save it
        newModel.save()
            .catch(error => {
                // return an error message to the client
                next(new Error('We can create that resource!'))
            })
            .then(model => {
                // append the new model on the response object
                action.response.publicacao = newModel

                // finish the action execution
                next()
            })
    }
}, {
    name: 'getPublicacaos',
    description: 'Get all Publicacaos',

    run (api, action, next) {
        api.models.get('publicacao').find({})
            .catch(error => {
                next(error)
            })
            .then(resources => {
                action.response.publicacaos = resources
                next()
            })
    }
}, {
    name: 'getPublicacao',
    description: 'Get a Publicacao',

    inputs: {
        _id: {required: true}
    },

    run (api, action, next) {
        // search for the request post on the DB
        api.models.get('publicacao').findById(action.params._id)
            .catch(error => {
                next(error)
            })
            .then(resource => {
                // append the model to the response object
                action.response.publicacao = resource

                // finish the action execution
                next()
            })
    }
}, {
    name: 'editPublicacao',
    description: 'Edit a Publicacao',

    inputs: editInputDeclaration,

    run (api, action, next) {
        // search for the Publicacao and update it
        api.models.get('publicacao').findOneAndUpdate({_id: action.params._id}, action.params, {upsert: true})
            .catch(error => {
                next(new Error('We could not find the resource you are looking for'))
            })
            .then(model => {
                // append the updated model to the response object
                action.response.publicacao = model

                // finish the action execution
                next()
            })
    }
}, {
    name: 'removePublicacao',
    description: 'Remove a Publicacao',

    inputs: {
        _id: {required: true}
    },

    run (api, action, next) {
        // search and remove the model
        api.models.get('publicacao').findByIdAndRemove(action.params._id)
            .catch(error => {
                // return an error message to the client
                next(new Error('We could not remove the requested resource'))
            })
            .then(() => {
                next()
            })
    }
}
    , {
        name: 'upload',
        description: 'Upload File',

        inputs: {
            file: {required: true}
        },

        run (api, action, next) {
            //Localização temporaria do ficheiro
            var source = fs.createReadStream(action.params.file.path);
            //criar nome unico para ficheiro com timestamp + nome real separados por -_-
            var current_date = (new Date()).getTime().toString();
            var fileName = current_date.replace(/\s/g, '_') + "-_-" + action.params.file.name.replace(/\s/g, '_');
            //Destino do ficheiro
            var dest = fs.createWriteStream(path.resolve(__dirname) + '/../../../public/uploads/' + fileName);
            //Move o ficheiro da pasta temporaria para a pasta publica
            source.pipe(dest);
            source.on('end', function () {
                action.response.file = fileName;
                next();
            });
            source.on('error', function (err) {
                action.response.error = {
                    msg: "Erro ao carregar o ficheiro"
                }
                next();
            });
        }
    }

    , {
        name: 'confirmarPublicacao',
        description: 'Confirmo Publicacao',

        run (api, action, next) {

            api.models.get('publicacao').findById(action.params._id)
                .catch(error => {
                    next(error)
                })
                .then(resource => {
                        var user_id = action.params._uid;
                        var exists = false;

                        for (var i = 0; i < resource.confirmacao.length; i++) {
                            if (resource.confirmacao[i].user_id == user_id) {
                                resource.confirmacao.splice(i, 1);
                                exists = true;
                            }
                        }

                        if (!exists) {
                            resource.confirmacao.push({
                                user_id: user_id
                            });
                        }
                        resource.save();

                        next()
                    }
                )

        }
    }
    , {
        name: 'apoiarPublicacao',
        description: 'Apoiar Publicacao',

        run (api, action, next) {

            api.models.get('publicacao').findById(action.params._id)
                .catch(error => {
                    next(error)
                })
                .then(resource => {
                        var user_id = action.params._uid;
                        var exists = false;

                        for (var i = 0; i < resource.apoio.length; i++) {
                            if (resource.apoio[i].user_id == user_id) {
                                resource.apoio.splice(i, 1);
                                exists = true;
                            }
                        }

                        if (!exists) {
                            resource.apoio.push({
                                user_id: user_id
                            });
                        }
                        resource.save();

                        next()
                    }
                )

        }
    }, {
        name: 'denunciarPublicacao',
        description: 'Denunciar  Publicacao',

        run (api, action, next) {

            api.models.get('publicacao').findById(action.params._id)
                .catch(error => {
                    next(error)
                })
                .then(resource => {
                        var user_id = action.params._uid;
                        var exists = false;

                        for (var i = 0; i < resource.denuncia.length; i++) {
                            if (resource.denuncia[i].user_id == user_id) {
                                resource.denuncia.splice(i, 1);
                                exists = true;
                            }
                        }

                        if (!exists) {
                            resource.denuncia.push({
                                user_id: user_id
                            });
                        }
                        resource.save();

                        next()
                    }
                )

        }
    }
]
