import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import { IconButton, MenuItem, MenuList } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';

function NavbarDrawer({ open, toggleDrawer }) {
  const { t, i18n } = useTranslation();

  useEffect(() => {
  }, [i18n]);

  return (
    <>
        <Drawer
          anchor="top"
          open={open}
          onClose={toggleDrawer(false)}
          slotProps={{ paper: { sx: { top: 'var(--template-frame-height, 0px)' } } }}
        >
          <Box sx={{ p: 2, backgroundColor: 'background.default' }}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <IconButton onClick={toggleDrawer(false)}>
                <CloseRoundedIcon />
              </IconButton>
            </Box>
            <MenuList>
              <MenuItem>Features</MenuItem>
              <MenuItem>Testimonials</MenuItem>
              <MenuItem>Highlights</MenuItem>
              <MenuItem>Pricing</MenuItem>
              <MenuItem>FAQ</MenuItem>
              <MenuItem>Blog</MenuItem>
              <Divider sx={{ my: 3 }} />
              <MenuItem>
                <Button color="primary" variant="contained" fullWidth>
                  {t('navbar.center.sign-up')}
                </Button>
              </MenuItem>
              <MenuItem>
                <Button color="primary" variant="outlined" fullWidth>
                  {t('navbar.center.sign-in')}
                </Button>
              </MenuItem>
            </MenuList>
          </Box>
        </Drawer>
    </>
  );
}

export default NavbarDrawer;
