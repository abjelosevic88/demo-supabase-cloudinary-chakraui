import { Container, ChakraProvider } from '@chakra-ui/react'
import Layout from '../components/Layout'
import { Auth } from '@supabase/ui'
import { getSupabase } from '../utils/init'

function MyApp({ Component, pageProps }) {
  return (
    <Auth.UserContextProvider supabaseClient={getSupabase()}>
      <ChakraProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </Auth.UserContextProvider>
  )
}

export default MyApp
