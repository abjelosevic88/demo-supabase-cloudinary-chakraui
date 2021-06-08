import { getSupabase } from '../../utils/init'

export default function handler(req, res) {
  const supabase = getSupabase()
  supabase.auth.api.setAuthCookie(req, res)
}
