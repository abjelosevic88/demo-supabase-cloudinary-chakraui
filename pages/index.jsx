import Head from 'next/head'
import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'
import { Auth } from '@supabase/ui'
import { getSupabase } from '../utils/init'
import { Center, Text, SimpleGrid, useToast, Heading } from '@chakra-ui/react'
import Card from '../components/Card'
import SpinnerLoader from '../components/Spinner'

export default function Home() {
  const { user, session } = Auth.useUser()
  const [blogs, setBlogs] = useState([])
  const supabase = getSupabase()

  useEffect(() => {
    supabase
      .from('blogs')
      .select('*')
      .then(({ data: blogs, error }) => {
        if (!error) {
          setBlogs(blogs)
        }
      })
  }, [])

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Center h="90vh" flexDirection="column">
        <Heading
          pointerEvents="none"
          userSelect="none"
          bgGradient="linear(to-l, #7928CA,#FF0080)"
          bgClip="text"
          fontSize="6xl"
          fontWeight="extrabold"
          mb={8}
        >
          Check our blog
        </Heading>
        {blogs.length > 0 ? (
          <SimpleGrid columns={3} spacing={6}>
            {blogs.map(blog => (
              <Card key={blog.id} {...blog} />
            ))}
          </SimpleGrid>
        ) : (
          <SpinnerLoader />
        )}
      </Center>
    </>
  )
}
