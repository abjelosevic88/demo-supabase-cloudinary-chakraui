import Head from 'next/head'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { getSupabase } from '../../utils/init'
import SpinnerLoader from '../../components/Spinner'
import SingleView from '../../components/pages/blog/view'

import { Box, Center } from '@chakra-ui/react'

function Blog() {
  const [blog, setBlog] = useState(null)
  const router = useRouter()
  const { id } = router.query
  const supabase = getSupabase()

  useEffect(async () => {
    if (id) {
      const { data: blog, error } = await supabase.from('blogs').select('*').eq('id', id).single()
      if (!error) {
        setBlog(blog)
      }
    }
  }, [id])

  let View = <SpinnerLoader />

  if (blog) {
    View = <SingleView {...blog} />
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

export default Blog
