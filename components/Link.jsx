import NextLink from 'next/link'
import { Link } from '@chakra-ui/react'

export default function InnerLink({ href, as, children, ...otherPros }) {
  return (
    <NextLink href={href} as={as}>
      <Link {...otherPros} _hover={{ textDecoration: 'none' }}>
        {children}
      </Link>
    </NextLink>
  )
}
