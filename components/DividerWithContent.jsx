import React from 'react'

import {
  Box,
  Text
} from '@chakra-ui/react'

function DividerWithContent({children}) {
  return (
    <Box whiteSpace="nowrap" w="100%" textAlign="center" overflow="hidden">
      <Text
        as="span"
        display="inline-block"
        position="relative"
        color="gray.400"
        _before={{
          top: '50%',
          content: "''",
          position: 'absolute',
          height: '1px',
          background: 'gray.300',
          width: '9999px',
          right: '100%',
          marginRight: '15px'
        }}
        _after={{
          top: '50%',
          content: "''",
          position: 'absolute',
          height: '1px',
          background: 'gray.300',
          width: '9999px',
          left: '100%',
          marginLeft: '15px'
        }}
      >
        {children}
      </Text>
    </Box>
  )
}

export default DividerWithContent
