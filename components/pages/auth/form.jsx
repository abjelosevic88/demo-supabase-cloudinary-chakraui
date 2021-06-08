import React, {useState, useRef} from 'react'
import { getSupabase } from '../../../utils/init'

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
import { RiGoogleFill, RiGithubFill, RiFacebookFill, RiGitlabFill } from "react-icons/ri"
import { SiMicrosoftazure } from "react-icons/si"
import { FaBitbucket } from "react-icons/fa"
import { Auth } from '@supabase/ui'
import DividerWithContent from '../../DividerWithContent'
import {Formik, Form} from 'formik'
import * as Yup from 'yup'
import TextField from '../../Form/components/text'
import GroupField from '../../Form/components/group'

function ResetForm({user}) {
  const [error, setError] = useState(null)
  
  const submit = async ({password, password_confirm}) => {
    setError(false)
    
    if (password !== password_confirm) {
      return setError('Passwords are not equal!')
    }
    
    const supabase = getSupabase()
    
    const { data, error } = await supabase.auth.api.updateUser('ts', {password: 'TEST'})
  
    if (error) {
      setError(error.message)
    }
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
      <Heading fontSize="2xl">Reset password</Heading>
      <Formik 
        initialValues={{
          password: '',
          password_confirm: ''
        }}
        validationSchema={Yup.object({
          password: Yup.string().required('Required'),
          password_confirm: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Required')
        })}
        onSubmit={(values, { setSubmitting }) => submit(values).then(() => setSubmitting(false))}
      >
        {({ isSubmitting }) => (
          <Form style={{width: '100%'}}>
            <TextField
              name="password"
              type="password"
              placeholder="Enter password"
            />
            <TextField
              name="password_confirm"
              type="password"
              placeholder="Confirm password"
            />
            <Flex justify="space-between" w="100%" align="center">
              <Button
                type="submit"
                variant="outline"
                isLoading={isSubmitting}
                loadingText="Submitting"
              >
                Login
              </Button>
            </Flex>
          </Form>
        )}
      </Formik>
    </VStack>
  )
}

export default ResetForm
