import React, { useState, useEffect } from 'react'
import { Image } from 'cloudinary-react'
import { useRouter } from 'next/router'
import { Auth } from '@supabase/ui'
import { getSupabase } from '../../../utils/init'

import { Box, Center, Flex, Heading, Stack, Text, VStack, Button } from '@chakra-ui/react'
import { ArrowBackIcon, EditIcon } from '@chakra-ui/icons'
import NextLink from '../../Link'

function SingleView({ id, title, description, image, created_at, user_id }) {
  const [showEditBtn, setShowEditBtn] = useState(false)
  const router = useRouter()
  const { user } = Auth.useUser()

  useEffect(async () => {
    if (user) {
      if (user_id === user.id) {
        return setShowEditBtn(true)
      }

      const supabase = getSupabase()

      const { data: superUser, error: superUserError } = await supabase.rpc('if_superuser', {
        user_id: user.id
      })

      if (!superUserError && superUser && superUser.length > 0) {
        return setShowEditBtn(true)
      }
    }
  }, [])

  return (
    <Stack direction="column" spacing={20}>
      <Flex justify="space-between">
        <Button variant="outline" leftIcon={<ArrowBackIcon />} onClick={() => router.back()}>
          Back
        </Button>
        {showEditBtn ? (
          <Button variant="outline" leftIcon={<EditIcon />}>
            <NextLink href={`/blog/edit/${id}`}>Edit</NextLink>
          </Button>
        ) : null}
      </Flex>
      <VStack spacing={6} alignItems="flex-start">
        <Heading>{title}</Heading>
        <Box borderRadius="lg" overflow="hidden">
          <Image
            cloudName={process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}
            publicId={image}
            width="300"
            crop="scale"
          />
        </Box>
        <Text>{description}</Text>
      </VStack>
    </Stack>
  )
}

export default SingleView
