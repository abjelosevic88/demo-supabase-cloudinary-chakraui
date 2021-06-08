import { getSupabaseServer } from '../../utils/init'

export default async function handler(req, res) {
  const supabase = getSupabaseServer()

  const { email, password, username, full_name } = req.query

  if (!email) {
    return res.status(400).json({ error: true, message: 'Email is required!' })
  }

  if (!password) {
    return res.status(400).json({ error: true, message: 'Password is required!' })
  }

  if (!username) {
    return res.status(400).json({ error: true, message: 'Username is required!' })
  }

  const { data, error } = await supabase.from('users').select('id').eq('username', username)

  if (error) {
    return res.status(400).json({ error: true, message: error.message })
  }

  if (data.length > 0) {
    return res.status(400).json({ error: true, message: 'Username already taken!' })
  }

  const { user, error: regError } = await supabase.auth.signUp({ email, password })

  if (regError) {
    return res.status(400).json({ error: true, message: regError.message })
  }

  await supabase.from('users').update({ username, full_name }).eq('id', user.id)

  res.json({
    error: false
  })
}
