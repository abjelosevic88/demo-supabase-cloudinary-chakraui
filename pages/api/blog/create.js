import { validation } from '../../../utils/functions'
import { getSupabase, getCloudinary } from '../../../utils/init'
import Cookies from 'cookies'

const schema = {
  type: 'object',
  properties: {
    title: { type: 'string' },
    description: { type: 'string' },
    base64: { type: 'string' },
    image: {
      type: 'object',
      properties: {
        path: { type: 'string' },
        preview: { type: 'string' },
        base64: { type: 'string' }
      },
      required: ['path', 'preview', 'base64']
    }
  },
  required: ['title', 'description', 'image']
}

export default validation(async function (req, res, data) {
  try {
    const cookies = new Cookies(req, res)
    const supabase = getSupabase(cookies.get('sb:token'))

    const cloudinary = getCloudinary()
    const cloudinaryRes = await cloudinary.uploader.upload(data.image.base64, { folder: 'blogs' })

    const { data: blogs, error } = await supabase.from('blogs').insert([
      {
        title: data.title,
        description: data.description,
        user_id: data.user.id,
        image: cloudinaryRes.public_id
      }
    ])

    if (error) {
      await cloudinary.uploader.destroy(cloudinaryRes.public_id)
    }

    return res.json({
      blogs,
      error
    })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ message: 'Server error!' })
  }
}, schema)
