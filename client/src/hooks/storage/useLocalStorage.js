/**
 * Custom hook that provides utility functions for interacting with the browser's localStorage.
 * It allows retrieving, setting, and removing items, and specifically exposes the stored theme.
 *
 * @returns {Object} LocalStorage utilities.
 * @property {string|null} theme - The current theme value stored in localStorage.
 * @property {Function} setItem - Function to set a key-value pair in localStorage.
 * @property {Function} removeItem - Function to remove one or more keys from localStorage.
 *
 * @example
 * const { theme, setItem, removeItem } = useLocalStorage();
 * setItem('theme', 'light');
 * removeItem('theme', 'token');
 */
const useLocalStorage = () => {
  const theme = localStorage.getItem('theme')

  const setItem = (item, value) => localStorage.setItem(item, value)

  const removeItem = (...items) => {
    items.forEach((i) => localStorage.removeItem(i))
  }

  return {
    theme,
    setItem,
    removeItem
  }
}

export default useLocalStorage
