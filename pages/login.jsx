import Head from 'next/head'
import { Auth } from '@supabase/ui'
import { getSupabase } from '../utils/init'
import Form from '../components/pages/login/form'

import { Center, VStack, Code, Button } from '@chakra-ui/react'

export default function Login() {
  const { user } = Auth.useUser()
  const supabase = getSupabase()

  const logout = () => supabase.auth.signOut()

  let View = <Form />

  if (user) {
    View = (
      <VStack>
        <Code maxW="50vw">{JSON.stringify(user, null, 2)}</Code>
        <Button colorScheme="gray" variant="outline" onClick={logout}>
          Logout
        </Button>
      </VStack>
    )
  }

  return (
    <Center h="100vh">
      <Head>
        <title>Login</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {View}
    </Center>
  )
}
