import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function MainArticle({ date, title, content }) {
  return (
    <Card sx={{ justifyContent: 'center', width: '80%', mb: 4 }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image="/static/images/cards/contemplative-reptile.jpg"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {content}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Typography
          variant="caption"
          display="block"
          sx={{ textAlign: "right", p: 1, color: "text.secondary" }}
        >
          {date}
        </Typography>
      </CardActions>
    </Card>
  );
}
