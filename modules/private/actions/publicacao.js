// constant with the inputs declaration
const inputsDeclaration = {
    titulo: {required: true},
    descricao: {required: true},
    estado: {required: false},
    imagens: {required: false},
    feedback: {required: false},
    denuncia: {required: false}
}

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
}]
