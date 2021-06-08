import Head from 'next/head'
import { Auth } from '@supabase/ui'
import Form from '../../components/pages/blog/create/form'

import { Box, Center, VStack, Code, Button } from '@chakra-ui/react'

export default function CreateBlog() {
  const { user } = Auth.useUser()

  let View = <Box>You must be logged in...</Box>

  if (user) {
    View = <Form />
  }

  return (
    <Center h="100vh">
      <Head>
        <title>Create Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {View}
    </Center>
  )
}
