import React, { useState, useRef } from 'react'
import { getSupabase } from '../../../utils/init'
import { useRouter } from 'next/router'

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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  useToast,
  FormErrorMessage
} from '@chakra-ui/react'
import { RiGoogleFill, RiGithubFill, RiFacebookFill, RiGitlabFill } from 'react-icons/ri'
import { SiMicrosoftazure } from 'react-icons/si'
import { FaBitbucket } from 'react-icons/fa'
import { Auth } from '@supabase/ui'
import DividerWithContent from '../../DividerWithContent'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import TextField from '../../Form/components/text'
import GroupField from '../../Form/components/group'

function LoginForm() {
  const router = useRouter()
  const [show, setShow] = useState(false)
  const [error, setError] = useState(null)
  const { user, session } = Auth.useUser()
  const toast = useToast()
  const supabase = getSupabase()

  const submit = async values => {
    setError(false)

    const res = await fetch(
      `/api/register?email=${values.email}&password=${values.password}&username=${
        values.username
      }&full_name=${values.full_name || ''}`
    )
    const resJson = await res.json()

    if (resJson.error) {
      return setError(resJson.message)
    }

    toast({
      title: 'Success',
      description: 'Successfully registered! Check your email for a confimation link!',
      status: 'success',
      duration: 9000,
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
      <Heading fontSize="2xl">Register form</Heading>
      <VStack justify="flex-start" spacing={4}>
        <Text w="100%">Sign in with</Text>
        <HStack align="flex-start" w="100%">
          <IconButton onClick={() => providerSignIn('google')} icon={<RiGoogleFill />} />
          <IconButton onClick={() => providerSignIn('facebook')} icon={<RiFacebookFill />} />
          <IconButton onClick={() => providerSignIn('github')} icon={<RiGithubFill />} />
          <IconButton onClick={() => providerSignIn('bitbucket')} icon={<FaBitbucket />} />
          <IconButton onClick={() => providerSignIn('gitlab')} icon={<RiGitlabFill />} />
          <IconButton icon={<SiMicrosoftazure />} />
        </HStack>
        <DividerWithContent>or continue with</DividerWithContent>
      </VStack>
      <Formik
        initialValues={{
          email: '',
          password: '',
          password_confirm: '',
          username: '',
          full_name: ''
        }}
        validationSchema={Yup.object({
          email: Yup.string().email('Invalid email address').required('Required'),
          password: Yup.string().required('Required'),
          password_confirm: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Required'),
          username: Yup.string().required('Required'),
          username: Yup.string().required('Required'),
          full_name: Yup.string()
        })}
        onSubmit={(values, { setSubmitting, resetForm }) =>
          submit(values)
            .then(() => setSubmitting(false))
            .then(() => resetForm())
        }
      >
        {({ isSubmitting }) => (
          <Form style={{ width: '100%' }}>
            <TextField name="email" type="email" placeholder="Email address" />
            <InputGroup size="md">
              <TextField
                name="password"
                type={show ? 'text' : 'password'}
                placeholder="Enter password"
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={() => setShow(!show)}>
                  {show ? 'Hide' : 'Show'}
                </Button>
              </InputRightElement>
            </InputGroup>
            <TextField name="password_confirm" type="password" placeholder="Confirm password" />
            <TextField name="username" type="text" placeholder="Enter username" />
            <TextField name="full_name" type="text" placeholder="Enter full name" />
            <Flex justify="space-between" w="100%" align="center">
              <Button
                type="submit"
                variant="outline"
                isLoading={isSubmitting}
                loadingText="Submitting"
              >
                Register
              </Button>
            </Flex>
          </Form>
        )}
      </Formik>
    </VStack>
  )
}

export default LoginForm
