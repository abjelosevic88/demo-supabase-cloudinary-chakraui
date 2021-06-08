import React, { useState } from 'react'
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
  const supabase = getSupabase()

  const onModalClose = () => {
    onClose()
    toast.closeAll()
  }

  const changePassword = async ({ password }) => {
    const { error, user } = await supabase.auth.update({ password })

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
      description: 'Your password was successfully changed!',
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
        color="red.600"
        _hover={{
          textDecoration: 'underline'
        }}
      >
        Change password
      </Text>
      <Modal onClose={onModalClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Change your password</ModalHeader>
          <ModalCloseButton />
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
            onSubmit={(values, { setSubmitting }) =>
              changePassword(values).then(() => setSubmitting(false))
            }
          >
            {({ isSubmitting }) => (
              <Form>
                <ModalBody>
                  <TextField label="Password" name="password" type="password" />
                  <TextField label="Confirm Password" name="password_confirm" type="password" />
                </ModalBody>
                <ModalFooter>
                  <Button
                    colorScheme="green"
                    variant="outline"
                    type="submit"
                    isLoading={isSubmitting}
                    loadingText="Submitting"
                  >
                    Update
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
