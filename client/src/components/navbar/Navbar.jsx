import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import Toolbar from '@mui/material/Toolbar'

import { alpha, styled } from '@mui/material/styles'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import NavbarLanguagesDropdown from './NavbarLanguagesDropDown'
import NavbarDrawer from './Drawer'
import PersonalBlogIcon from '../icons/SistemarkIcon'

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexShrink: 0,
  borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
  backdropFilter: 'blur(24px)',
  border: '1px solid',
  borderColor: (theme.vars || theme).palette.divider,
  backgroundColor: theme.vars
    ? `rgba(${theme.vars.palette.background.defaultChannel} / 0.4)`
    : alpha(theme.palette.background.default, 0.4),
  boxShadow: (theme.vars || theme).shadows[1],
  padding: '8px 12px'
}))

function NavBar () {
  const { t, i18n } = useTranslation()

  useEffect(() => {
  }, [i18n])
  const [open, setOpen] = useState(false)

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen)
  }

  return (
    <AppBar
      position='fixed'
      enableColorOnDark
      sx={{
        boxShadow: 0,
        bgcolor: 'transparent',
        backgroundImage: 'none',
        mt: 'calc(var(--template-frame-height, 0px) + 28px)'
      }}
    >
      <Container maxWidth='lg'>
        <StyledToolbar variant='dense' disableGutters>
          {/* ============ LEFT SECTION ============ */}
          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', px: 0 }}>
            <PersonalBlogIcon />
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              <Button variant='text' color='info' size='small'>
                Features
              </Button>
              <Button variant='text' color='info' size='small'>
                Testimonials
              </Button>
              <Button variant='text' color='info' size='small'>
                Highlights
              </Button>
              <Button variant='text' color='info' size='small'>
                Pricing
              </Button>
              <Button variant='text' color='info' size='small' sx={{ minWidth: 0 }}>
                FAQ
              </Button>
              <Button variant='text' color='info' size='small' sx={{ minWidth: 0 }}>
                Blog
              </Button>
            </Box>
          </Box>
          {/* ============ CENTER SECTION ============ */}
          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              gap: 1,
              alignItems: 'center'
            }}
          >
            {/* ============ SIGN IN ============ */}
            <Button color='primary' variant='text' size='small'>
              {t('navbar.center.sign-in')}
            </Button>
            {/* ============ SIGN UP ============ */}
            <Button color='primary' variant='contained' size='small'>
              {t('navbar.center.sign-up')}
            </Button>
            {/* ============ LANGUAGE DROPDOWN ============ */}
            <NavbarLanguagesDropdown />
          </Box>
          {/* ============ RIGHT SECTION (MOBILE) ============ */}
          <Box sx={{ display: { xs: 'flex', md: 'none' }, gap: 1 }}>
            <NavbarLanguagesDropdown />
            <IconButton aria-label='Menu button' onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
            <NavbarDrawer open={open} toggleDrawer={toggleDrawer} />
          </Box>
        </StyledToolbar>
      </Container>
    </AppBar>
  )
}

export default NavBar
