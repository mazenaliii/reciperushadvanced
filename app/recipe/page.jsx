import { useRouter } from 'next/navigation'
import React from 'react'

const RecipePage = () => {
  const router = useRouter()
  router.push('/')
  return (
    <div>Nothing exists in this page.</div>
  )
}

export default RecipePage