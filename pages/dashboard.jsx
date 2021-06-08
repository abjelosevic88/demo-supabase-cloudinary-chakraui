import { useState, useEffect } from 'react'
import { getSupabase } from '../utils/init'

import { VStack, Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption } from '@chakra-ui/react'

function Dashboard() {
  const [users, setUsers] = useState([])
  const [blogs, setBlogs] = useState([])
  const supabase = getSupabase()

  useEffect(() => {
    supabase
      .from('users')
      .select('*')
      .then(({ data, error }) => {
        if (!error) {
          setUsers(data)
        }
      })
    supabase
      .from('blogs')
      .select('*')
      .then(({ data, error }) => {
        if (!error) {
          setBlogs(data)
        }
      })
  }, [])

  return (
    <VStack spacing={10}>
      {users.length > 0 && (
        <Table variant="simple">
          <TableCaption placement="top">Users</TableCaption>
          <Thead>
            <Tr>
              <Th>Id</Th>
              <Th>Email</Th>
              <Th>Username</Th>
              <Th>Full name</Th>
            </Tr>
          </Thead>
          <Tbody>
            {users.map(user => (
              <Tr>
                <Td>{user.id}</Td>
                <Td>{user.email}</Td>
                <Td>{user.username}</Td>
                <Td>{user.full_name}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
      {blogs.length > 0 && (
        <Table variant="simple">
          <TableCaption placement="top">Blogs</TableCaption>
          <Thead>
            <Tr>
              <Th>Id</Th>
              <Th>Title</Th>
              <Th>Description</Th>
              <Th>Created at</Th>
              <Th>User</Th>
            </Tr>
          </Thead>
          <Tbody>
            {blogs.map(blog => (
              <Tr>
                <Td>{blog.id}</Td>
                <Td>{blog.title}</Td>
                <Td>{blog.description}</Td>
                <Td>{blog.created_at}</Td>
                <Td>{blog.user_id}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
    </VStack>
  )
}

export default Dashboard
