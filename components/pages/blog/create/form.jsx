import React, { useState, useRef, useCallback } from 'react'
import { useRouter } from 'next/router'

import {
  VStack,
  Alert,
  AlertIcon,
  AlertTitle,
  Heading,
  Text,
  IconButton,
  FormControl,
  FormLabel,
  Input,
  Flex,
  Button,
  useToast,
  FormErrorMessage
} from '@chakra-ui/react'

import { Auth } from '@supabase/ui'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import TextField from '../../../Form/components/text'
import TextAreaField from '../../../Form/components/textarea'
import ImageUpload from '../../../../components/ImageUpload'

function BlogForm() {
  const router = useRouter()
  const toast = useToast()
  const [error, setError] = useState(null)
  const [image, setImage] = useState(null)

  const submit = async ({ title, description }, resetForm) => {
    setError(false)

    if (!image) {
      return setError('Missing blog image!')
    }

    const response = await fetch('/api/blog/create', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title,
        description,
        image
      })
    })
    const resData = await response.json()

    if (response.ok === false) {
      return setError(resData.message)
    }

    if (resData.error) {
      return setError(resData.error.message)
    }

    resetForm()
    setImage(null)

    toast({
      title: 'Success',
      description: 'Successfully created a new blog!',
      status: 'success',
      duration: 5000,
      isClosable: true,
      variant: 'subtle'
    })
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
      <Heading fontSize="2xl">New blog</Heading>
      <Formik
        initialValues={{
          title: '',
          description: ''
        }}
        validationSchema={Yup.object({
          title: Yup.string().required('Required'),
          description: Yup.string().required('Required')
        })}
        onSubmit={(values, { setSubmitting, resetForm }) =>
          submit(values, resetForm).then(() => setSubmitting(false))
        }
      >
        {({ isSubmitting }) => (
          <Form style={{ width: '100%' }}>
            <TextField name="title" type="text" placeholder="Title" />
            <TextAreaField name="description" placeholder="Description" />
            <ImageUpload image={image} setImage={setImage} />
            <Flex justify="space-between" w="100%" align="center">
              <Button
                type="submit"
                variant="outline"
                colorScheme="green"
                isLoading={isSubmitting}
                loadingText="Submitting"
              >
                Create
              </Button>
            </Flex>
          </Form>
        )}
      </Formik>
    </VStack>
  )
}

export default BlogForm
