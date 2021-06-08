import React, { useState, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'

import { Box, Text, Center, Image, IconButton } from '@chakra-ui/react'
import { CloseIcon } from '@chakra-ui/icons'

function getBase64(file) {
  return new Promise((resolve, reject) => {
    var reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = function () {
      resolve(reader.result)
    }
    reader.onerror = function (error) {
      reject(error)
    }
  })
}

export default function ImageUpload({ image, setImage }) {
  const { acceptedFiles, getRootProps, getInputProps, isDragActive } = useDropzone({
    maxFiles: 1,
    accept: 'image/*',
    onDrop: async acceptedFiles => {
      if (acceptedFiles.length > 0) {
        setImage(
          Object.assign(acceptedFiles[0], {
            preview: URL.createObjectURL(acceptedFiles[0]),
            base64: await getBase64(acceptedFiles[0])
          })
        )
      }
    }
  })

  let ImageComponent = null
  if (image) {
    ImageComponent = (
      <Box position="relative" mb={4}>
        <IconButton
          position="absolute"
          top={4}
          right={4}
          bg="white"
          boxShadow="base"
          onClick={() => setImage(null)}
          icon={<CloseIcon color="red.500" cursor="pointer" />}
        />
        <Image src={image.preview} />
      </Box>
    )
  }

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      if (image) {
        URL.revokeObjectURL(image.preview)
      }
    },
    [image]
  )

  return (
    <Box as="section">
      {!image ? (
        <Center
          h={20}
          mb={4}
          border="dashed"
          borderColor={isDragActive ? 'green.400' : 'gray.200'}
          borderRadius="xl"
          {...getRootProps({ className: 'dropzone' })}
        >
          <input {...getInputProps()} />
          <Text cursor="pointer">Upload image</Text>
        </Center>
      ) : (
        <Box as="aside">{ImageComponent}</Box>
      )}
    </Box>
  )
}
