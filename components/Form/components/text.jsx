import React, {forwardRef} from 'react'
import { useField } from 'formik'

import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Box
} from '@chakra-ui/react'

const Text = forwardRef(({ label, children, ...props }, ref) => {
  const [field, meta] = useField(props);
  return (
    <FormControl id={props.id || props.name} isRequired={props.isRequired} isInvalid={meta.touched && meta.error} mb={4}>
      {label && <FormLabel htmlFor={props.id || props.name}>{label}</FormLabel>}
      <Input ref={ref} w="100%" errorBorderColor="red.300" {...field} {...props} />
      <FormErrorMessage>{meta.error}</FormErrorMessage>
    </FormControl>
  )
})

export default Text
