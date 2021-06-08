import React from 'react'
import { useField } from 'formik'

import {
  InputGroup,
  FormLabel,
  Input,
  FormErrorMessage
} from '@chakra-ui/react'

function Group({ label, children, ...props }) {
  const [field, meta] = useField(props);
  return (
    <InputGroup {...props.group}>
      <FormLabel htmlFor={props.id || props.name}>{label}</FormLabel>
      <Input {...field} {...props} />
      {children}
      <FormErrorMessage>{meta.error}</FormErrorMessage>
    </InputGroup>
  )
}

export default Group
