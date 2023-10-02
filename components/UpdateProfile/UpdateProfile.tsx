import { UPDATE_PROFILE } from '@/graphql/mutation/updateUser'
import { selectAuth, updateProfile } from '@/redux/slices/authSlice'
import OurButton from '@/ui/OurButton'
import { useMutation } from '@apollo/client'
import { useState } from 'react'
import { FieldValues, RegisterOptions, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { inputsValidation } from '../Auth/inputsValidation'

const UpdateProfile = () => {
  const [repeatPassword, setRepeatPassword] = useState('g')
  const { user } = useSelector(selectAuth)
  const dispatch = useDispatch()

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({ mode: 'onBlur' })

  const [update] = useMutation(UPDATE_PROFILE, {
    onCompleted: (e) => {
      dispatch(updateProfile(e.updateUser))
      reset()
    },
  })

  const updateMyProfile = (e: FieldValues) => {
    // eslint-disable-next-line no-unused-vars
    const { repeatPassword, ...data } = e

    for (let i in data) {
      if (!data[i]) {
        delete data[i]
      } else {
        data[i] = data[i].trim()
      }
    }

    update({
      variables: {
        updateUserInput: {
          id: user.id,
          ...data,
        },
      },
    })
  }

  return (
    <form onSubmit={handleSubmit(updateMyProfile)}>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="relative">
          <input
            {...register('username', { ...inputsValidation.username })}
            className={`w-full p-5 border ${
              errors.username ? 'border-red-500' : 'border-border'
            } rounded-[15px]`}
            type="text"
            placeholder="Username"
          />
          {errors.username ? (
            <div className="text-red-500 absolute bottom-[-10px] right-6 bg-white px-4">
              {errors.username.message as string}
            </div>
          ) : null}
        </div>
        <div className="relative">
          <input
            {...register('email', { ...inputsValidation.email })}
            className={`w-full p-5 border ${
              errors.email ? 'border-red-500' : 'border-border'
            } rounded-[15px]`}
            type="text"
            placeholder="Email"
          />
          {errors.email ? (
            <div className="text-red-500 absolute bottom-[-10px] right-6 bg-white px-4">
              {errors.email.message as string}
            </div>
          ) : null}
        </div>
        <div className="relative">
          <input
            {...register('password', { ...inputsValidation.password })}
            className={`w-full p-5 border ${
              errors.password ? 'border-red-500' : 'border-border'
            } rounded-[15px]`}
            type="password"
            placeholder="Password"
            onChange={(e) => setRepeatPassword(e.target.value)}
          />
          {errors.password ? (
            <div className="text-red-500 absolute bottom-[-10px] right-6 bg-white px-4">
              {errors.password.message as string}
            </div>
          ) : null}
        </div>
        <div className="relative">
          <input
            {...register('repeatPassword', { pattern: new RegExp(repeatPassword, 'g') })}
            className={`w-full p-5 border ${
              errors.repeatPassword ? 'border-red-500' : 'border-border'
            } rounded-[15px]`}
            type="password"
            placeholder="Repeat Password"
          />
          {errors.repeatPassword ? (
            <div className="text-red-500 absolute bottom-[-10px] right-6 bg-white px-4">
              {errors.repeatPassword.message as string}
            </div>
          ) : null}
        </div>
      </div>
      <OurButton type="submit" name="Change" variant="primary" />
    </form>
  )
}

export default UpdateProfile
