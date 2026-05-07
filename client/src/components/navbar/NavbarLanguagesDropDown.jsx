import React from 'react'
import styled from '@emotion/styled'

import { Menu, MenuItem, IconButton } from '@mui/material'
import { useTranslation } from 'react-i18next'

import useLocalStorage from '../../hooks/storage/useLocalStorage'

const Flag = styled.img`
  border-radius: 50%;
  width: 22px;
  height: 22px;
`

const languageOptions = {
  en: { icon: '/flags/us.png', name: 'english' },
  es: { icon: '/flags/co.png', name: 'spanish' }
}

/**
 * NavbarLanguagesDropdown component provides a language selection dropdown
 * within the navigation bar, allowing users to switch between supported languages.
 *
 * It displays the current language's flag icon and stores the selected language
 * in local storage for persistence across sessions. The component updates
 * the i18n configuration dynamically upon selection.
 *
 * @example
 * <NavbarLanguagesDropdown />
 *
 * @returns {JSX.Element} A dropdown menu for selecting the application language.
 */

const NavbarLanguagesDropdown = () => {
  const { t, i18n } = useTranslation()
  const { setItem } = useLocalStorage()
  const [anchorMenu, setAnchorMenu] = React.useState(null)
  const selectedLanguage = languageOptions[i18n.language]
  const toggleMenu = (event) => {
    setAnchorMenu(event.currentTarget)
  }
  const closeMenu = () => {
    setAnchorMenu(null)
  }
  const handleLanguageChange = (language) => {
    i18n.changeLanguage(language)
    setItem('language', language)
    closeMenu()
  }
  return (
    <>
      <IconButton
        aria-owns={anchorMenu ? 'menu-appbar' : undefined}
        onClick={toggleMenu}
        size='large'
        sx={{ px: '12px' }}
      >
        <Flag src={selectedLanguage.icon} alt={selectedLanguage.name} />
      </IconButton>
      <Menu
        id='menu-appbar'
        anchorEl={anchorMenu}
        open={Boolean(anchorMenu)}
        onClose={closeMenu}
        slotProps={{ paper: { sx: { border: '1px solid #999999' } } }}
      >
        {Object.keys(languageOptions).map((language) => (
          <MenuItem
            key={language}
            onClick={() => handleLanguageChange(language)}
          >
            {t(`common.languages.${languageOptions[language].name}`)}
          </MenuItem>
        ))}
      </Menu>
    </>
  )
}

export default NavbarLanguagesDropdown
