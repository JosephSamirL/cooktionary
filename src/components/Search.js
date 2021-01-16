import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {Link} from 'react-router-dom';
import SearchBar from "material-ui-search-bar";
import {  useQuery } from 'react-query'
import FastfoodTwoToneIcon from '@material-ui/icons/FastfoodTwoTone';
import {useDebounce} from "../useDebounce"
import CircularProgress from '@material-ui/core/CircularProgress';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import {useStore} from "../store/Store"
const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundImage: 'url(https://images.unsplash.com/photo-1454944338482-a69bb95894af?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1052&q=80)',
    backgroundRepeat: "no-repeat",
    backgroundPosition:"center",
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));


function Example({classes, search}) {
  const debounced = useDebounce(search)
    const { isLoading, error, data } = useQuery(['Data', debounced],  () => debounced.length > 2 && fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`).then(res =>
        res.json()
      )
    )
  
    if (isLoading) return <CircularProgress style={{margin:"auto"}}/>
  
    if (error) return 'An error has occurred: ' + error.message
    
    return (
         <>
         
         { data?.meals?.map(item=>
            <Grid item key={item.idMeal} xs={12} sm={6} md={4}>
            <Card className={classes.card}>
              <CardMedia
                className={classes.cardMedia}
                image={item.strMealThumb}
                title="Image title"
              />
              <CardContent className={classes.cardContent}>
                <Typography gutterBottom variant="h5" component="h2">
                  {item.strMeal}
                </Typography>
                <Typography>
                  Area {item.strArea} , Category {item.strCategory}
                </Typography>
              </CardContent>
              <CardActions>
                <Button color="primary">
                <Link style={{textDecoration:"none"}} to={"/Recipe/" + item.idMeal} >
                  View
                </Link>
                </Button>
                
              </CardActions>
            </Card>
          </Grid>
          )}
          
          </>
         
      
    )
    
  }
 
export  function Search() {
  const classes = useStyles();
  const [search , setSearch] = useState("chicken")
  const {logout} = useStore()
  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <FastfoodTwoToneIcon className={classes.icon} />
          <Typography variant="h6" color="inherit" noWrap>
            Cooktionary
          </Typography>
          <Button onClick={()=>logout()} style={{marginLeft:"auto"}}>Logout<LockOpenIcon/></Button>
        </Toolbar>
      </AppBar>
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              Cooktionary
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
              Wanna cook your own food without screwing up? Just type whatever you wanna make and follow the simple steps.
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justify="center">
                <Grid xs={12} item>
                <SearchBar
                        value={search}
                        onChange={(newValue) => setSearch(newValue )}
                    />
                </Grid>
                
              </Grid>
            </div>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            <Example classes={classes} search={search}/>
            
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          Joseph
        </Typography>
        
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
          for buisness inqueries: joegmes@gmail.com
        </Typography>
        
      </footer>
      {/* End footer */}
    </React.Fragment>
  );
}