import { apiUrl } from 'config'
import qs from 'qs'
import React, { useEffect, useState } from 'react'
import { cleanObject } from 'utils'
import { List } from './list'
import { SearchPanel } from './search-panel'

export const ProjectListScreen = () => {
  const [param, setParam] = useState({
    name: '',
    personId: ''
  })
  const [list, setList] = useState([])
  const [users, setUsers] = useState([])

  useEffect(() => {
    fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(param))}`).then(async res => {
      if (res.ok) {
        setList(await res.json())
      }
    })
  }, [param])
  useEffect(() => {
    fetch(`${apiUrl}/users`).then(async res => {
      if (res.ok) {
        setUsers(await res.json())
      }
    })
  }, [])
  return <div>
    <SearchPanel users={users} param={param} setParam={setParam}></SearchPanel>
    <List list={list} users={users}></List>
  </div>
}