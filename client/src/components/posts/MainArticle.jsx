import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Container from '@mui/material/Container'
import IconButton from '@mui/material/IconButton'
import ShareIcon from '@mui/icons-material/Share'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'

import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

export default function MainArticle ({ date, title, content }) {
  const { t, i18n } = useTranslation()

  useEffect(() => {}, [i18n])

  return (
    <Container maxWidth='lg' sx={{ mt: 18 }}>
      <Card sx={{ justifyContent: 'center' }}>
        <CardMedia
          component='img'
          alt='green iguana'
          height='340'
          image='/assets/hero.png'
        />
        <CardContent>
          <Typography gutterBottom variant='h5' component='div'>
            {title}
          </Typography>
          <Typography variant='body2' sx={{ color: 'text.secondary' }}>
            {content}
          </Typography>
        </CardContent>
        <CardActions>
          <Tooltip title={t('article.bottom.share')}>
            <IconButton>
              <ShareIcon />
            </IconButton>
          </Tooltip>
          <Typography variant='caption' display='block' sx={{ textAlign: 'right', p: 1, color: 'text.secondary' }}>
            {date}
          </Typography>
        </CardActions>
      </Card>
    </Container>
  )
}
