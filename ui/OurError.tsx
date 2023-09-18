import { AnimatePresence, motion as m } from 'framer-motion'
import { useEffect, useState } from 'react'

const OurError = ({ error }) => {
  const [open, setOpen] = useState(true)

  useEffect(() => {
    setTimeout(() => closeError(), 6000)
  }, [])

  const closeError = () => {
    setOpen((prev) => !prev)
  }

  return (
    <AnimatePresence>
      {open && (
        <m.div
          initial={{ x: 500 }}
          animate={{ x: 0 }}
          exit={{ x: 500 }}
          className="absolute right-[24px] bottom-[24px] py-6 px-8 bg-red-50 border-[2px] border-red-200 text-red-900 rounded-[15px]"
        >
          {error.message}
        </m.div>
      )}
    </AnimatePresence>
  )
}

export default OurError
