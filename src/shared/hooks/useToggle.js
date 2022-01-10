import { useCallback, useState } from 'react'

const useToggle = () => {
  const [isVisible, setIsVisible] = useState(false)
  const onOpen = useCallback(() => {
    setIsVisible(true)
  }, [])

  const onClose = useCallback(() => {
    setIsVisible(false)
  }, [])

  const onToggle = useCallback(() => {
    setIsVisible(!isVisible)
  }, [isVisible])

  return { isVisible, onOpen, onClose, onToggle }
}

export default useToggle
