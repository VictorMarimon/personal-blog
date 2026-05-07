import Box from '@mui/material/Box'
import Masonry from '@mui/lab/Masonry'

import Article from './Article'

function MansoryArticle ({ articles }) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', maxWidth: '1180px', mt: 8.5, mx: 'auto', overflow: 'hidden' }} component='main'>
      <Masonry columns={{ xs: 1, sm: 2, md: 2 }} spacing={4}>
        {articles.map((article) => (
          <Article key={article.id} {...article} />
        ))}
      </Masonry>
    </Box>
  )
}

export default MansoryArticle
