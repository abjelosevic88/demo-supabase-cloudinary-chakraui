import React, { useState, useRef } from 'react'
import { getSupabase } from '../../../utils/init'

import {
  Modal,
  ModalBody,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalCloseButton,
  FormControl,
  FormLabel,
  InputGroup,
  InputLeftElement,
  Input,
  Button,
  FormErrorMessage,
  useDisclosure,
  useToast,
  Text
} from '@chakra-ui/react'
import { HiOutlineMail } from 'react-icons/hi'

import { Formik, Form } from 'formik'
import TextField from '../../Form/components/text'
import * as Yup from 'yup'

function Reset() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()
  const initialModalRef = useRef()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const supabase = getSupabase()

  const onModalClose = () => {
    onClose()
    toast.closeAll()
  }

  const resetPassword = async email => {
    const { data, error } = await supabase.auth.api.resetPasswordForEmail(email)

    if (error) {
      return toast({
        title: 'Error',
        description: error.message,
        status: 'error',
        duration: 9000,
        isClosable: true,
        variant: 'subtle'
      })
    }

    onClose()
    return toast({
      title: 'Success',
      description: 'Check your email for a password reset link!',
      status: 'success',
      duration: 9000,
      isClosable: true,
      variant: 'subtle'
    })
  }

  return (
    <>
      <Text
        onClick={onOpen}
        cursor="pointer"
        color="green.600"
        _hover={{
          textDecoration: 'underline'
        }}
      >
        Forgot your password?
      </Text>
      <Modal initialFocusRef={initialModalRef} onClose={onModalClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Reset your password</ModalHeader>
          <ModalCloseButton />
          <Formik
            initialValues={{
              email: ''
            }}
            validationSchema={Yup.object({
              email: Yup.string().email('Invalid email address').required('Required')
            })}
            onSubmit={(values, { setSubmitting }) =>
              resetPassword(values.email).then(() => setSubmitting(false))
            }
          >
            {({ isSubmitting }) => (
              <Form>
                <ModalBody>
                  <TextField
                    label="Email Address"
                    name="email"
                    type="email"
                    ref={initialModalRef}
                  />
                </ModalBody>
                <ModalFooter>
                  <Button
                    colorScheme="green"
                    variant="outline"
                    type="submit"
                    isLoading={isSubmitting}
                    loadingText="Submitting"
                  >
                    Send reset email
                  </Button>
                </ModalFooter>
              </Form>
            )}
          </Formik>
        </ModalContent>
      </Modal>
    </>
  )
}

export default Reset
