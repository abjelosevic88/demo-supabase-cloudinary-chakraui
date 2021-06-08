import React, { useState, useRef, useEffect } from 'react'
import { getSupabase } from '../../../utils/init'
import { useRouter } from 'next/router'
import cookieCutter from 'cookie-cutter'

import {
  VStack,
  Alert,
  AlertIcon,
  AlertTitle,
  Heading,
  Text,
  HStack,
  Tooltip,
  IconButton,
  FormControl,
  FormLabel,
  Input,
  Flex,
  InputGroup,
  InputRightElement,
  InputLeftElement,
  Button,
  useToast,
  FormErrorMessage,
  Badge
} from '@chakra-ui/react'
import { Auth } from '@supabase/ui'
import DividerWithContent from '../../DividerWithContent'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import TextField from '../../Form/components/text'
import GroupField from '../../Form/components/group'
import ChangePassword from './password'

function LoginForm({ handleResetPassword }) {
  const router = useRouter()
  const [show, setShow] = useState(false)
  const [error, setError] = useState(null)
  const { user, session } = Auth.useUser()
  const toast = useToast()
  const supabase = getSupabase()
  const [userData, setUserData] = useState({
    email: '',
    username: '',
    full_name: '',
    isSuperuser: false
  })

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const userDat = cookieCutter.get('userData')

      if (userDat) {
        setUserData(JSON.parse(userDat))
      }
    }
  }, [])

  const submit = async values => {
    setError(false)

    const { data, error } = await supabase
      .from('users')
      .update({ full_name: values.full_name })
      .eq('id', user.id)
      .single()

    if (error) {
      return setError(error.message)
    }

    cookieCutter.set('userData', JSON.stringify(data))
    setUserData(data)

    toast({
      title: 'Success',
      description: 'Successfully updated user data!',
      status: 'success',
      duration: 5000,
      isClosable: true,
      variant: 'subtle'
    })
  }

  const providerSignIn = provider => {
    let loginParams = { provider }

    if (router.query.redirect_to) {
      loginParams = {
        ...loginParams,
        options: {
          redirectTo: router.query.redirect_to
        }
      }
    }

    supabase.auth.signIn(loginParams)
  }

  console.log('userData.isSuperuser', userData)

  return (
    <VStack
      align="flex-start"
      borderWidth={1}
      borderColor="gray.300"
      p={10}
      borderRadius="xl"
      spacing={6}
      w={96}
    >
      {error && (
        <Alert status="error" borderRadius="xl">
          <AlertIcon />
          <AlertTitle mr={2}>{error}</AlertTitle>
        </Alert>
      )}
      <Heading fontSize="2xl">
        Profile
        {userData.isSuperadmin ? (
          <Badge ml="1" colorScheme="green">
            Superadmin
          </Badge>
        ) : null}
      </Heading>
      <Formik
        enableReinitialize
        initialValues={{
          email: userData.email,
          username: userData.username,
          full_name: userData.full_name
        }}
        validationSchema={Yup.object({
          email: Yup.string().email('Invalid email address').required('Required'),
          username: Yup.string().required('Required'),
          full_name: Yup.string().required('Required')
        })}
        onSubmit={(values, { setSubmitting }) => submit(values).then(() => setSubmitting(false))}
      >
        {({ isSubmitting }) => (
          <Form style={{ width: '100%' }}>
            <TextField isDisabled label="Email" name="email" type="email" />
            <TextField isDisabled label="Username" name="username" type="username" />
            <TextField label="Full name" name="full_name" type="text" />
            <Flex justify="space-between" w="100%" align="center">
              <Button
                type="submit"
                variant="outline"
                colorScheme="green"
                isLoading={isSubmitting}
                loadingText="Submitting"
              >
                Update
              </Button>
              <ChangePassword />
            </Flex>
          </Form>
        )}
      </Formik>
    </VStack>
  )
}

export default LoginForm
