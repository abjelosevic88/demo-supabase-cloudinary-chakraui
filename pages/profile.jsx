import Head from 'next/head'
import { useRouter } from 'next/router'
import { Auth } from '@supabase/ui'
import Form from '../components/pages/profile/form'

import {
  Center
} from '@chakra-ui/react'

function Profile() {
  const { user } = Auth.useUser()
  const router = useRouter()

  let view = <Center>You must be logged in...</Center>

  if (user) {
    view = <Form />
  }
  
  return (
    <Center h="100vh">
      <Head>
        <title>Profile</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {view}
    </Center>
  )
}

export default Profile
