

import { Button } from '@/components/ui/button'
import { useCurrentUser } from '@/hooks/use-current-user'
import { currentUser } from '@/lib/auth'
import { logOut } from '@/lib/logout'
import React from 'react'

const page = async () => {
  const user = await currentUser()
  return (
    <div>
      {user?.name}
    </div>
  )
}

export default page