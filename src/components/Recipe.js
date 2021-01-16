import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {Link }from 'react-router-dom';
import {useParams} from "react-router-dom"
import {  useQuery } from 'react-query'
import CircularProgress from '@material-ui/core/CircularProgress';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import YouTube from '@u-wave/react-youtube';
import {useHistory} from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  main: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2),
    maxWidth: "100%"
  },
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: 'auto',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[800],
  },
}));

export default function Recipe() {
  const classes = useStyles();
  const {id} = useParams();
  const history = useHistory()
  const { isLoading, data } = useQuery(["anime", id], () =>
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`).then((res) => res.json())
  );
    if(isLoading){
        return(
        <div style={{display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',}}>
        <CircularProgress style={{margin:"auto"}}/>
        </div>
        )
    }
    console.log(data)
    const ingredients = [
        data.meals[0].strIngredient1,
        data.meals[0].strIngredient2,
        data.meals[0].strIngredient3,
        data.meals[0].strIngredient4,
        data.meals[0].strIngredient5,
        data.meals[0].strIngredient6,
        data.meals[0].strIngredient7,
        data.meals[0].strIngredient8,
        data.meals[0].strIngredient9,
        data.meals[0].strIngredient10,
        data.meals[0].strIngredient11,
        data.meals[0].strIngredient12,
        data.meals[0].strIngredient13,
        data.meals[0].strIngredient14,
        data.meals[0].strIngredient15,
        data.meals[0].strIngredient16,
        data.meals[0].strIngredient17,
        data.meals[0].strIngredient18,
        data.meals[0].strIngredient19,
        data.meals[0].strIngredient20,

]
const ingredients2 = ingredients.filter(item=>item?.length>2)

  return (
    <div style={{backgroundImage:"url(https://images.unsplash.com/photo-1495195134817-aeb325a55b65?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1920&q=80)", backgroundRepeat:"no-repeat", backgroundPosition:"center",  color:"#FFFF",   }} className={classes.root}>
      <CssBaseline />
      
      <Container  component="main" className={classes.main} maxWidth="sm">
        <Typography style={{color:"black"}} variant="h2" component="h1" gutterBottom>
          {data.meals[0].strMeal}
        </Typography>
        {ingredients2.map(item=><Chip label={item }/>)}
        <Button onClick={()=>history.push("/")}><Chip style={{backgroundColor:" #c4302b"}} label="Go Back"/></Button>
       
      </Container>
      <Container component="main">
            <YouTube
                 style={{width: "100%", height:"300px"}}
                  video={data.meals[0].strYoutube.slice(-11)}
                  autoplay
              />
      <Typography style={{color:"black"}} variant="p" component="p" gutterBottom>
          {data.meals[0].strInstructions}
        </Typography>
      </Container>
      
    </div>
  );
}