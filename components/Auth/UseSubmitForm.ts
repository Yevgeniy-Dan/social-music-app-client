import { LogInMutation, LogInMutationVariables, SignUpMutation, SignUpMutationVariables } from '@/@types/graphql'
import { SET_LOG_IN, SET_SIGN_UP } from '@/graphql/mutation/auth'
import { setCredentials } from '@/redux/slices/authSlice'
import { useMutation } from '@apollo/client'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { FieldValues } from 'react-hook-form'
import { useDispatch } from 'react-redux'

type TAuthState = {
  email: string,
  password: string,
  username: string,
  repeatPassword: string,
}

const UseSubmitForm = () => {
  const [isRegister, setIsRegister] = useState(false)
  const [authState, setAuthState] = useState<TAuthState>({
    email: '',
    password: '',
    username: '',
    repeatPassword: '',
  })
  const dispatch = useDispatch()
  const navigate = useRouter()
  const [signup] = useMutation<SignUpMutation, SignUpMutationVariables>(SET_SIGN_UP)
  const [login, { error }] = useMutation<LogInMutation, LogInMutationVariables>(
    SET_LOG_IN
  )
  
  const submitForm = async () => {
    const {email, password, username} = authState

    if (!isRegister) {
      await login({
        variables: {
          loginUserInput: {
            email,
            password
          },
        },
        onCompleted: (e) => {
          dispatch(
            setCredentials({
              user: e.login.user || null,
              access_token: e.login.accessToken || null,
            })
          )
          e.login.user.avatar ? navigate.push('/') : navigate.push('/auth/avatar')
        },
      })
    } else {
      await signup({
        variables: {
          signupUserInput: {
            username,
            email,
            password,
          },
        },
      })
      setIsRegister(false)
    }
  }


  return {
    isRegister,
    setIsRegister,
    submitForm,
    error,
    authState,
    setAuthState
  }
}

export default UseSubmitForm