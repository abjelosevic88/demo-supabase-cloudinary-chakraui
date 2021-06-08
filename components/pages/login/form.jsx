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
import DividerWithContent from '../../DividerWithContent'
import PasswordReset from './reset'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import TextField from '../../Form/components/text'
import GroupField from '../../Form/components/group'

function LoginForm({ handleResetPassword }) {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('HMgRJbbhSdqxoxWNtvlS')
  const [show, setShow] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const supabase = getSupabase()

  const submit = async ({ email, password }) => {
    setError(false)

    let loginParams = { email, password }

    if (router.query.redirect_to) {
      loginParams = {
        ...loginParams,
        options: {
          redirectTo: router.query.redirect_to
        }
      }
    }

    const { error } = await supabase.auth.signIn(loginParams)

    if (error) {
      setError(error.message)
    }
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
      <Heading fontSize="2xl">Login form</Heading>
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
          password: ''
        }}
        validationSchema={Yup.object({
          email: Yup.string().email('Invalid email address').required('Required'),
          password: Yup.string().required('Required')
        })}
        onSubmit={(values, { setSubmitting }) => submit(values).then(() => setSubmitting(false))}
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
            <Flex justify="space-between" w="100%" align="center">
              <Button
                type="submit"
                variant="outline"
                isLoading={isSubmitting}
                loadingText="Submitting"
              >
                Login
              </Button>
              <PasswordReset />
            </Flex>
          </Form>
        )}
      </Formik>
    </VStack>
  )
}

export default LoginForm
