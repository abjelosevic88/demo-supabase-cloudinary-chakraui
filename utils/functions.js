import Ajv from 'ajv'
import { getSupabase } from './init'

/**
 * Helper function used on the API routes to validate request data with validation schema.
 *
 * @param {Function} handlerFunction Function that will handle request after validation is performed.
 * @param {Object} schema Validation schema object.
 * @param {String} source Mapper that will extract data from requestion object. Valid values are: body, query.
 * @param {String} method HTTP method validation.
 * @param {Boolean} isAuthenticated For authenticated routes.
 * @returns
 */
export function validation(
  handlerFunction,
  schema,
  source = 'body',
  method = 'POST',
  isAuthenticated = true
) {
  return async (req, res) => {
    try {
      let data = req[source]

      if (source !== 'body' && source !== 'query') {
        console.error('Validation source error! Valida params are: body, query.')
        throw new Error('Server error!')
      }

      if (req.method !== method) {
        throw new Error('Unsupported HTTP method for this route.')
      }

      if (isAuthenticated) {
        const supabase = getSupabase()
        const userSession = await supabase.auth.api.getUserByCookie(req)

        if (!userSession.user) {
          throw new Error('You must be logged in to perform this request!')
        }

        data.user = userSession.user
      }

      const ajv = new Ajv()
      const validate = ajv.compile(schema)
      const valid = validate(data)

      if (!valid) {
        throw new Error(validate.errors[0].message)
      }

      await handlerFunction(req, res, data)
    } catch (error) {
      return res.status(400).json({ message: error.message })
    }
  }
}
