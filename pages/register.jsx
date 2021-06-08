import Head from 'next/head'
import { useState, useEffect } from 'react'
import { Auth } from '@supabase/ui'
import { getSupabase } from '../utils/init'
import Form from '../components/pages/register/form'

import { Box, Center } from '@chakra-ui/react'

export default function Login() {
  const { user } = Auth.useUser()
  const supabase = getSupabase()

  const logout = () => supabase.auth.signOut()

  let View = <Form />

  if (user) {
    View = <Box>Already logged in...</Box>
  }

  return (
    <Center h="100vh">
      <Head>
        <title>Register</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {View}
    </Center>
  )
}
