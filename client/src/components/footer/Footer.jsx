import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { useTranslation } from 'react-i18next';

import PersonalBlogIcon from '../icons/SistemarkIcon';
import { useEffect } from 'react';

function Copyright() {
  return (
    <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
      {'Copyright © '}
      <Link
        href="https://victormarimon.netlify.app/"
        sx={{ color: 'text.secondary' }}
      >
        Victor Marimon
      </Link>
      &nbsp;
      {new Date().getFullYear()}
    </Typography>
  );
}

function Footer() {
  const { t, i18n } = useTranslation();

  useEffect(() => {
  }, [i18n]);

  return (
    <React.Fragment>
      <Divider />
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: { xs: 4, sm: 8 },
          py: { xs: 8, sm: 10 },
          textAlign: { sm: 'center', md: 'left' },
        }}
      >
        {/* ============ TOP SECTION ============ */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            width: '100%',
            justifyContent: 'space-between',
          }}
        >
          {/* ============ NEWSLETTER ============ */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 4,
              minWidth: { xs: '100%', sm: '60%' },
            }}
          >
            <Box sx={{ width: { xs: '100%', sm: '60%' } }}>
              <PersonalBlogIcon />
              <Typography
                variant="body2"
                gutterBottom
                sx={{ fontWeight: 600, mt: 2 }}
              >
                {t('footer.newsletter.join')}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
                {t('footer.newsletter.subscribe.label')}
              </Typography>
              <InputLabel htmlFor="email-newsletter">{t('footer.newsletter.email.label')}</InputLabel>
              <Stack direction="row" spacing={1} useFlexGap>
                <TextField
                  id="email-newsletter"
                  hiddenLabel
                  size="small"
                  variant="outlined"
                  fullWidth
                  aria-label={t('footer.newsletter.email.aria-label')}
                  placeholder={t('footer.newsletter.email.placeholder')}
                  slotProps={{
                    htmlInput: {
                      autoComplete: 'off',
                      'aria-label': t('footer.newsletter.email.aria-label'),
                    },
                  }}
                  sx={{ width: '250px' }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  sx={{ flexShrink: 0 }}
                >
                  {t('footer.newsletter.subscribe.button')}
                </Button>
              </Stack>
            </Box>
          </Box>
          {/* ============ PRODUCT LINKS ============ */}
          <Box
            sx={{
              display: { xs: 'none', sm: 'flex' },
              flexDirection: 'column',
              gap: 1,
            }}
          >
            <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
              Product
            </Typography>
            <Link
              variant="body2"
              href="#"
              sx={{
                color: 'text.secondary',
              }}
            >
              Features
            </Link>
            <Link
              variant="body2"
              href="#"
              sx={{
                color: 'text.secondary',
              }}
            >
              Testimonials
            </Link>
            <Link
              variant="body2"
              href="#"
              sx={{
                color: 'text.secondary',
              }}
            >
              Highlights
            </Link>
            <Link
              variant="body2"
              href="#"
              sx={{
                color: 'text.secondary',
              }}
            >
              Pricing
            </Link>
            <Link
              variant="body2"
              href="#"
              sx={{
                color: 'text.secondary',
              }}
            >
              FAQs
            </Link>
          </Box>
          {/* ============ COMPANY LINKS ============ */}
          <Box
            sx={{
              display: { xs: 'none', sm: 'flex' },
              flexDirection: 'column',
              gap: 1,
            }}
          >
            <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
              Company
            </Typography>
            <Link
              variant="body2"
              href="#"
              sx={{
                color: 'text.secondary',
              }}
            >
              About us
            </Link>
            <Link
              variant="body2"
              href="#"
              sx={{
                color: 'text.secondary',
              }}
            >
              Careers
            </Link>
            <Link
              variant="body2"
              href="#"
              sx={{
                color: 'text.secondary',
              }}
            >
              Press
            </Link>
          </Box>
          {/* ============ LEGAL LINKS ============ */}
          <Box
            sx={{
              display: { xs: 'none', sm: 'flex' },
              flexDirection: 'column',
              gap: 1,
            }}
          >
            <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
              Legal
            </Typography>
            <Link
              variant="body2"
              href="#"
              sx={{
                color: 'text.secondary',
              }}
            >
              Terms
            </Link>
            <Link
              variant="body2"
              href="#"
              sx={{
                color: 'text.secondary',
              }}
            >
              Privacy
            </Link>
            <Link
              variant="body2"
              href="#"
              sx={{
                color: 'text.secondary',
              }}
            >
              Contact
            </Link>
          </Box>
        </Box>
        {/* ============ BOTTOM SECTION ============ */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            pt: { xs: 4, sm: 8 },
            width: '100%',
            borderTop: '1px solid',
            borderColor: 'divider',
          }}
        >
          {/* ============ LEGAL LINKS ============ */}
          <div>
            <Link
              variant="body2"
              href="#"
              sx={{
                color: 'text.secondary',
              }}
            >
              {t('footer.legal-links.privacy')}
            </Link>
            <Typography sx={{ display: 'inline', mx: 0.5, opacity: 0.5 }}>
              &nbsp;•&nbsp;
            </Typography>
            <Link
              variant="body2"
              href="#"
              sx={{
                color: 'text.secondary',
              }}
            >
              {t('footer.legal-links.terms')}
            </Link>
            <Copyright />
          </div>
          {/* ============ SOCIAL MEDIA ICONS ============ */}
          <Stack
            direction="row"
            spacing={1}
            useFlexGap
            sx={{ justifyContent: 'left', color: 'text.secondary' }}
          >
            <IconButton
              color="inherit"
              size="small"
              href="https://github.com/victormarimon"
              aria-label="GitHub"
              sx={{ alignSelf: 'center' }}
            >
              <GitHubIcon />
            </IconButton>
            <IconButton
              color="inherit"
              size="small"
              href="https://www.linkedin.com/in/victormarimon/"
              aria-label="LinkedIn"
              sx={{ alignSelf: 'center' }}
            >
              <LinkedInIcon />
            </IconButton>
          </Stack>
        </Box>
      </Container>
    </React.Fragment>
  );
}

export default Footer;
