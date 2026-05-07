import Card from '@mui/material/Card'
import CardActionArea from '@mui/material/CardActionArea'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import IconButton from '@mui/material/IconButton'
import ShareIcon from '@mui/icons-material/Share'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'

import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

export default function Article ({ date, title, content, type }) {
  const { t, i18n } = useTranslation()

  useEffect(() => {}, [i18n])

  return (
    <Card>
      <CardActionArea>
        {type
          ? (
            <Typography variant='caption' gutterBottom sx={{ display: 'block' }}>
              {type}
            </Typography>
            )
          : null}
        {/* <CardMedia
          component="img"
          height="140"
          image="/static/images/cards/contemplative-reptile.jpg"
          alt="green iguana"
        /> */}
        <CardContent>
          <Typography gutterBottom variant='h5' component='div'>
            {title}
          </Typography>
          <Typography variant='body2' sx={{ color: 'text.secondary' }}>
            {content}
          </Typography>
        </CardContent>
      </CardActionArea>
      {/* ============ BOTTOM SECTION ============ */}
      <CardActions sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
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
  )
}
