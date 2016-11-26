'use strict'

exports.core_models_add_user = {
    event: 'core.models.add.user',
    description: 'This was automatically generated',

    run: (api, params, next) => {
        params.schema.add({
            cc: {type: String, default: null},
            username: {type: String, default: null},
            concelho: {type: String, default: null}
        })

        // finish the event execution
        next()
    }
}
