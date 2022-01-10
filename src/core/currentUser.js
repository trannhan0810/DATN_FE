export const CURRENT_USER = 'current-user'

export const getCurrentUser = () => localStorage.getItem(CURRENT_USER) ?? ''
export const removeCurrentUser = () => localStorage.removeItem(CURRENT_USER)
export const setCurrentUser = currentUser => localStorage.setItem(CURRENT_USER, JSON.stringify(currentUser))
