import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { Auth } from '@supabase/ui'
import cookieCutter from 'cookie-cutter'
import { getSupabase } from '../../utils/init'

import {
  Flex,
  Text,
  HStack,
  Container,
  Box,
  Menu,
  MenuButton,
  Button,
  Avatar,
  MenuList,
  MenuItem,
  MenuDivider,
  useToast,
  Badge
} from '@chakra-ui/react'
import { AddIcon, EditIcon } from '@chakra-ui/icons'

import Link from '../Link'

export default function Header() {
  const router = useRouter()
  const { user } = Auth.useUser()
  const toast = useToast()
  const [userData, setUserData] = useState({ full_name: '', avatar_url: '' })
  const supabase = getSupabase()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const userDat = cookieCutter.get('userData')

      if (userDat) {
        setUserData(JSON.parse(userDat))
      }
    }

    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN') {
        cookieCutter.set('userData', '', { expires: new Date(0) })

        const { data: userInfo, error } = await supabase
          .from('users')
          .select('*')
          .eq('id', session.user.id)
          .single()

        if (!error) {
          userInfo.isSuperadmin = false

          const { data: superUser, error: superUserError } = await supabase.rpc('if_superuser', {
            user_id: session.user.id
          })

          if (!superUserError && superUser.length > 0) {
            userInfo.isSuperadmin = true
          }

          cookieCutter.set('userData', JSON.stringify(userInfo))
          setUserData(userInfo)
        }
      }

      if (event === 'SIGNED_OUT') {
        cookieCutter.set('userData', '', { expires: new Date(0) })
      }

      if (event === 'PASSWORD_RECOVERY') {
        toast({
          title: 'Success',
          title: 'Successfuly logged in!',
          description: 'You can change your password in your user settings now.',
          status: 'success',
          duration: 9000,
          isClosable: true,
          variant: 'subtle'
        })
      }

      fetch('/api/auth', {
        method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        credentials: 'same-origin',
        body: JSON.stringify({ event, session })
      }).then(res => res.json())
    })

    return () => {
      authListener.unsubscribe()
    }
  }, [])

  const logout = () => {
    supabase.auth.signOut().then(() => router.push('/'))
  }

  return (
    <Box bg="gray.500" position="fixed" top={0} left={0} w="100vw" color="white">
      <Container maxW="container.xl">
        <Flex justify="space-between" align="center" h={10}>
          <Link href="/">Site</Link>
          <HStack spacing={4}>
            <Link href="/dashboard">Dashboard</Link>
            {user ? (
              <Menu>
                <MenuButton as={Button} rounded={'full'} variant={'link'} cursor={'pointer'}>
                  <Avatar size={'sm'} name={userData.full_name} src={userData.avatar_url} />
                </MenuButton>
                <MenuList color="black">
                  <Link href="/blog/create">
                    <MenuItem icon={<AddIcon />}>New Blog</MenuItem>
                  </Link>
                  <Link href="/profile">
                    <MenuItem icon={<EditIcon />}>
                      Profile
                      {userData.isSuperadmin ? (
                        <Badge ml={1} fontSize="0.5rem" colorScheme="green">
                          Superadmin
                        </Badge>
                      ) : null}
                    </MenuItem>
                  </Link>
                  <MenuDivider />
                  <MenuItem onClick={logout}>Logout</MenuItem>
                </MenuList>
              </Menu>
            ) : (
              <>
                <Link href="/login">Login</Link>
                <Link href="/register">Register</Link>
              </>
            )}
          </HStack>
        </Flex>
      </Container>
    </Box>
  )
}
