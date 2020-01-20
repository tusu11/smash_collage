import React from 'react'
import ReactDOM from 'react-dom'
//import PropTypes from 'prop-types'
import { BrowserRouter, Route } from 'react-router-dom'
//import MuiThemePrivider from 'material-ui/styles/MuiThemeProvider'
//import FlatButton from 'material-ui/FlatButton'
//import Paper from 'material-ui/Paper'
//import Title from './components/Title'
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import StarIcon from '@material-ui/icons/StarBorder';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import './index.css';
import topimg from './assets/EOaRlW7UwAEUCp4-orig.jpg'
import App from './App'

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
        {'Created by '}
        <a color="inherit" href="https://twitter.com/tusu01">
            @tusu01
        </a>
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
    },
    li: {
      listStyle: 'none',
    },
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: 'wrap',
  },
  toolbarTitle: {
    flexGrow: 1,
    fontSize: '0.8rem',
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
  heroContent: {
    padding: theme.spacing(8, 0, 6),
    fontSize: '4em',
    backgroundImage: {topimg},
  },
  cardHeader: {
    backgroundColor:
      theme.palette.type === 'dark' ? theme.palette.grey[700] : theme.palette.grey[200],
  },
  cardPricing: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'baseline',
    marginBottom: theme.spacing(2),
  },
  footer: {
    borderTop: `1px solid ${theme.palette.divider}`,
    marginTop: theme.spacing(8),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6),
    },
  },
}));

const tiers = [
  {
    title: 'Free',
    price: '0',
    description: ['10 users included', '2 GB of storage', 'Help center access', 'Email support'],
    buttonText: 'Sign up for free',
    buttonVariant: 'outlined',
  },
  {
    title: 'Pro',
    subheader: 'Most popular',
    price: '15',
    description: [
      '20 users included',
      '10 GB of storage',
      'Help center access',
      'Priority email support',
    ],
    buttonText: 'Get started',
    buttonVariant: 'contained',
  },
  {
    title: 'Enterprise',
    price: '30',
    description: [
      '50 users included',
      '30 GB of storage',
      'Help center access',
      'Phone & email support',
    ],
    buttonText: 'Contact us',
    buttonVariant: 'outlined',
  },
];


function MainPage (){

    const classes = useStyles()
    return(
        <React.Fragment>
            <CssBaseline />
            <AppBar position="static" color="default" elevation={0} className={classes.appBar}>
                <Toolbar className={classes.toolbar}>
                <Typography variant="h6" color="inherit" className={classes.toolbarTitle}>
                    スマブラファイターパスジェネレーター
                </Typography>

                <Button href="#" color="primary" variant="outlined" className={classes.link}>
                    Login
                </Button>
                </Toolbar>
            </AppBar>
            {/* Hero unit */}
            <Container maxWidth="sm" component="main" className={classes.heroContent}>
                <Typography component="h1" variant="h4" align="center" color="textPrimary" gutterBottom>
                    スマブラファイターパス{<br/>}ジェネレーター
                </Typography>
                <Typography variant="h6" align="center" color="textSecondary" component="p">
                    クソコラ画像を作りたかった
                </Typography>
            </Container>
            {/* End hero unit */}
            <Container maxWidth="xl" component="main">
                <App />
            </Container>

            <Container maxWidth="md" component="main">
                <Grid container spacing={5} alignItems="flex-end">
                {tiers.map(tier => (
                    // Enterprise card is full width at sm breakpoint
                    <Grid item key={tier.title} xs={12} sm={tier.title === 'Enterprise' ? 12 : 6} md={4}>
                    <Card>
                        <CardHeader
                        title={tier.title}
                        subheader={tier.subheader}
                        titleTypographyProps={{ align: 'center' }}
                        subheaderTypographyProps={{ align: 'center' }}
                        action={tier.title === 'Pro' ? <StarIcon /> : null}
                        className={classes.cardHeader}
                        />
                        <CardContent>
                        <div className={classes.cardPricing}>
                            <Typography component="h2" variant="h3" color="textPrimary">
                            ${tier.price}
                            </Typography>
                            <Typography variant="h6" color="textSecondary">
                            /mo
                            </Typography>
                        </div>
                        <ul>
                            {tier.description.map(line => (
                            <Typography component="li" variant="subtitle1" align="center" key={line}>
                                {line}
                            </Typography>
                            ))}
                        </ul>
                        </CardContent>
                        <CardActions>
                        <Button fullWidth variant={tier.buttonVariant} color="primary">
                            {tier.buttonText}
                        </Button>
                        </CardActions>
                    </Card>
                    </Grid>
                ))}
                </Grid>
            </Container>
            {/* Footer */}
            <Container maxWidth="md" component="footer" className={classes.footer}>
                <Box mt={5}>
                <Copyright />
                </Box>
            </Container>
            {/* End footer */}
        </React.Fragment>
    )
}

ReactDOM.render(
    <BrowserRouter>
        <Route path="/" component={MainPage} />
    </BrowserRouter>,
    document.getElementById('root')
)