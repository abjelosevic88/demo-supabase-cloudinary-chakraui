import { validation } from '../../../utils/functions'
import { getSupabase, getCloudinary } from '../../../utils/init'
import Cookies from 'cookies'

const schema = {
  type: 'object',
  properties: {
    id: { type: 'integer' },
    title: { type: 'string' },
    description: { type: 'string' },
    base64: { type: 'string' },
    addedImage: {
      type: 'object',
      properties: {
        path: { type: 'string' },
        preview: { type: 'string' },
        base64: { type: 'string' }
      },
      required: ['path', 'preview', 'base64']
    },
    deletedImages: {
      type: 'array',
      items: {
        type: 'string'
      }
    }
  },
  required: ['id', 'title', 'description']
}

export default validation(async function (req, res, data) {
  try {
    const cookies = new Cookies(req, res)
    const cloudinary = getCloudinary()
    const supabase = getSupabase(cookies.get('sb:token'))

    let updateObj = {
      title: data.title,
      description: data.description
    }

    if (data.deletedImages && data.deletedImages.length > 0) {
      for (let i = 0; i < data.deletedImages.length; i++) {
        await cloudinary.uploader.destroy(data.deletedImages[i])
      }
    }

    if (data.addedImage) {
      const cloudinaryRes = await cloudinary.uploader.upload(data.addedImage.base64, {
        folder: 'blogs'
      })
      updateObj.image = cloudinaryRes.public_id
    }

    const { data: blog, error } = await supabase
      .from('blogs')
      .update(updateObj)
      .eq('id', data.id)
      .single()

    return res.json({
      blog,
      error
    })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ message: 'Server error!' })
  }
}, schema)
