// constant with the inputs declaration
const inputsDeclaration = {
    nome: {required: true},
    concelho: {required: true},
    /*contactos: [
     {
     morada: {
     required: true
     },
     telefone: {
     required: true
     },
     email: {
     required: true
     }
     }
     ]*/
    contactos: {required: true}
}

// constant with the edit input declaration
const editInputDeclaration = JSON.parse(JSON.stringify(inputsDeclaration))
editInputDeclaration._id = {required: true}

module.exports = [{
    name: 'createEntidade',
    description: 'Create a new Entidade',

    inputs: inputsDeclaration,

    run (api, action, next) {
        // create a new model instance
        var newModel = new (api.models.get('entidade'))(action.params)

        // save it
        newModel.save()
            .catch(error => {
                // return an error message to the client
                next(new Error('We can create that resource!'))
            })
            .then(model => {
                // append the new model on the response object
                action.response.entidade = newModel

                // finish the action execution
                next()
            })
    }
}, {
    name: 'getEntidades',
    description: 'Get all Entidades',

    run (api, action, next) {
        api.models.get('entidade').find({})
            .catch(error => {
                next(error)
            })
            .then(resources => {
                action.response.entidades = resources
                next()
            })
    }
}, {
    name: 'getEntidade',
    description: 'Get a Entidade',

    inputs: {
        _id: {required: true}
    },

    run (api, action, next) {
        // search for the request post on the DB
        api.models.get('entidade').findById(action.params._id)
            .catch(error => {
                next(error)
            })
            .then(resource => {
                // append the model to the response object
                action.response.entidade = resource

                // finish the action execution
                next()
            })
    }
}, {
    name: 'editEntidade',
    description: 'Edit a Entidade',

    inputs: editInputDeclaration,

    run (api, action, next) {
        // search for the Entidade and update it
        api.models.get('entidade').findOneAndUpdate({_id: action.params._id}, action.params, {upsert: true})
            .catch(error => {
                next(new Error('We could not find the resource you are looking for'))
            })
            .then(model => {
                // append the updated model to the response object
                action.response.entidade = model

                // finish the action execution
                next()
            })
    }
}, {
    name: 'removeEntidade',
    description: 'Remove a Entidade',

    inputs: {
        _id: {required: true}
    },

    run (api, action, next) {
        // search and remove the model
        api.models.get('entidade').findByIdAndRemove(action.params._id)
            .catch(error => {
                // return an error message to the client
                next(new Error('We could not remove the requested resource'))
            })
            .then(() => {
                next()
            })
    }
}]
