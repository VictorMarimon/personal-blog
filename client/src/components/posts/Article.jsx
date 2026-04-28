import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";

export default function Article({ date, title, content, type }) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        {type ? (
          <Typography variant="caption" gutterBottom sx={{ display: 'block' }}>
            {type}
          </Typography>
        ) : null}
        {/* <CardMedia
          component="img"
          height="140"
          image="/static/images/cards/contemplative-reptile.jpg"
          alt="green iguana"
        /> */}
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {content}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Button size="small" color="primary">
          Share
        </Button>
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
