import Head from 'next/head'
import { useState, useEffect } from 'react'
import { Auth } from '@supabase/ui'
import { useRouter } from 'next/router'
import { getSupabase } from '../../../utils/init'
import Form from '../../../components/pages/blog/edit/form'

import { Center } from '@chakra-ui/react'
import SpinnerLoader from '../../../components/Spinner'

function Edit() {
  const [blog, setBlog] = useState(null)
  const { user } = Auth.useUser()
  const router = useRouter()
  const { id } = router.query

  useEffect(async () => {
    const supabase = getSupabase()

    if (user && id && !blog) {
      const { data: blog, error } = await supabase.from('blogs').select('*').eq('id', id).single()

      if (!error) {
        if (blog.user_id === user.id) {
          return setBlog(blog)
        }

        const { data: superUser, error: superUserError } = await supabase.rpc('if_superuser', {
          user_id: user.id
        })

        if (!superUserError && superUser && superUser.length > 0) {
          return setBlog(blog)
        }
      }
    }
  }, [id])

  let View = <SpinnerLoader />

  if (blog) {
    View = <Form {...blog} />
  }

  return (
    <>
      <Head>
        <title>Blog view</title>
      </Head>
      <Center h="90vh">{View}</Center>
    </>
  )
}

export default Edit
