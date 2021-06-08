/**
 * Returns supabase instance.
 *
 * @param {String} token User token.
 * @param {Object} options Supabase options.
 */
export function getSupabase(token = null, options = {}) {
  const supabase = require('@supabase/supabase-js')

  const client = supabase.createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_KEY,
    options
  )

  if (token) {
    client.auth.setAuth(token)
  }

  return client
}

/**
 * Returns supabase server instance. This instance is using supabase service key and should be used with caution.
 */
export function getSupabaseServer() {
  const supabase = require('@supabase/supabase-js')

  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY)
}

/**
 * Init and return cloudinary object.
 *
 * @returns Object Cloudinary object.
 */
export function getCloudinary() {
  const cloudinary = require('cloudinary').v2

  cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_UPLOAD_API_KEY,
    api_secret: process.env.CLOUDINARY_UPLOAD_API_SECRET
  })

  return cloudinary
}

/**
 * Returns redis client.
 */
export function getRedisClient() {
  const redis = require('redis')

  const client = redis.createClient({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD
  })

  return client
}
