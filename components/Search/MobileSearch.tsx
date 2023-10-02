'use client'

import React, { useState } from 'react'

import { useQuery } from '@apollo/client'
import { useRouter } from 'next/navigation'

import OurInput from '@/ui/OurInput'
import { GET_USER_BY_NAME } from '@/graphql/query/searchByName'
import { SearchNameQueryVariables, SearchResponse } from '@/@types/graphql'
import UserBage from '@/ui/UserBage'
import { GET_USER_BY_HASHTAG } from '@/graphql/query/searchByHashtag'

const Search = () => {
  const [value, setValue] = useState('')
  const navigator = useRouter()
  const [foundUsers, setFoundUsers] = useState([])

  const { refetch: refetchName, loading: loadingName } = useQuery<
    { searchByName: SearchResponse[] },
    SearchNameQueryVariables
  >(GET_USER_BY_NAME, { onCompleted: (e) => setFoundUsers(e.searchByName) })
  const { refetch: refetchHash, loading: loadingHash } = useQuery(GET_USER_BY_HASHTAG, {
    onCompleted: (e) => setFoundUsers(e.searchByHashtag),
  })

  if (loadingHash || loadingName) return

  const searchFriend: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    if (!value) return
    if (value.includes('#')) {
      refetchHash({ hashtagId: value })
    } else {
      refetchName({ username: value })
    }
  }

  return (
    <div className="hidden lg:absolute lg:w-full lg:l-0 lg:bottom-20 lg:bg-white lg:p-4 lg:block">
      <form
        className="relative"
        onChange={(e) => searchFriend(e)}
        onSubmit={(e) => e.preventDefault()}
      >
        <OurInput
          value={value}
          onKeyDown={(e) => {
            if (e.key === 'Enter') navigator.push(`/search?value=${value}`)
          }}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Search..."
          submitIcon={value ? null : '../Search.svg'}
        />
        {value ? (
          <img
            onClick={() => setValue('')}
            className="absolute top-[16px] scale-150 rotate-45 right-5"
            src="../Plus.svg"
            alt=""
          />
        ) : null}
      </form>
      <div className="lg:absolute lg:bottom-[85px] lg:bg-white lg:px-4 lg:w-full lg:left-0 lg:h-auto">
        {foundUsers &&
          value &&
          foundUsers.slice(0, 2).map((item, key) => {
            return (
              <div key={key} className="mt-4">
                <UserBage {...item.user} />
              </div>
            )
          })}

        {foundUsers.length > 2 && value && (
          <button
            onClick={() => navigator.push(`/search?value=${value}`)}
            className="bg-white text-blueText font-semibold py-2 w-full border border-blueText rounded-full mt-4"
          >
            Show more
          </button>
        )}
      </div>
    </div>
  )
}

export default Search
