import { useState } from 'react'
import { UiPage } from '../../../ui/page'
import { DEMO_USERS, User } from '../../../user/data-access'
import { UserTable } from '../../../user/ui'

export function AdminUserListFeature() {
  const [data, setData] = useState<User[]>(DEMO_USERS)

  const deleteUser = (user: User) => {
    if (!window.confirm(`Are you sure you want to delete ${user.username}?`)) return
    // FIXME: Actually delete the user in the backend
    setData(data.filter((u) => u.id !== user.id))
  }

  return (
    <UiPage title="Users">
      <UserTable users={data} deleteUser={deleteUser} />
    </UiPage>
  )
}
