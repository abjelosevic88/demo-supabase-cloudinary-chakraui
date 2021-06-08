import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import {
  Box,
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
import { CloseIcon } from '@chakra-ui/icons'

import { Image } from 'cloudinary-react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import TextField from '../../../Form/components/text'
import TextAreaField from '../../../Form/components/textarea'
import ImageUpload from '../../../../components/ImageUpload'

function EditForm({ id, title, description, image, created_at, user_id }) {
  const router = useRouter()
  const toast = useToast()
  const [error, setError] = useState(null)
  const [editImage, setEditImage] = useState(null)
  const [showCloudinaryImage, setShowCloudinaryImage] = useState(!!image)
  const [deletedImages, setDeletedImages] = useState([])

  const deleteCloudinaryImage = public_id => {
    setShowCloudinaryImage(false)
    setDeletedImages([...deletedImages, public_id])
  }

  const submit = async ({ title, description }, resetForm) => {
    setError(false)

    if (!editImage && !image) {
      return setError('Missing blog image!')
    }

    let reqData = {
      id,
      title,
      description,
      deletedImages
    }

    if (editImage) {
      reqData.addedImage = editImage
    }

    const response = await fetch('/api/blog/edit', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(reqData)
    })
    const resData = await response.json()

    if (response.ok === false) {
      return setError(resData.message)
    }

    if (resData.error) {
      return setError(resData.error.message)
    }

    toast({
      title: 'Success',
      description: 'Successfully edited blog!',
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
      <Heading fontSize="2xl">Edit blog</Heading>
      <Formik
        initialValues={{
          title,
          description
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
            {showCloudinaryImage ? (
              <Box position="relative" mb={4}>
                <IconButton
                  position="absolute"
                  top={4}
                  right={4}
                  bg="white"
                  boxShadow="base"
                  onClick={() => deleteCloudinaryImage(image)}
                  icon={<CloseIcon color="red.500" cursor="pointer" />}
                />
                <Image cloudName={process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME} publicId={image} />
              </Box>
            ) : (
              <ImageUpload image={editImage} setImage={setEditImage} />
            )}
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
            </Flex>
          </Form>
        )}
      </Formik>
    </VStack>
  )
}

export default EditForm
