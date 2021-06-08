import Header from './Header'
import {
  Box,
  Container
} from '@chakra-ui/react'

export default function Layout({children}) {
  return (
    <Box>
      <Header />
      <Container maxW='container.xl' mt={14}>{children}</Container>
    </Box>
  )
}