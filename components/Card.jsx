import React from 'react'

import { Box, Text, LinkBox, LinkOverlay } from '@chakra-ui/react'
import { Image, Transformation } from 'cloudinary-react'
import { motion } from 'framer-motion'
import NextLink from './Link'

const MotionBox = motion(Box)

function Card({ id, title, description, image }) {
  return (
    <LinkBox as="article">
      <MotionBox
        border="solid"
        borderRadius="lg"
        p={5}
        borderColor="gray.300"
        borderWidth={1}
        boxShadow="base"
        cursor="pointer"
        whileHover={{
          scale: 1.04
        }}
      >
        <Image
          crop="fill"
          width="400"
          height="250"
          cloudName={process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}
          publicId={image}
        />
        <LinkOverlay href={`/blog/${id}`}>
          <Text mt={2}>{title}</Text>
        </LinkOverlay>
      </MotionBox>
    </LinkBox>
  )
}

export default Card
