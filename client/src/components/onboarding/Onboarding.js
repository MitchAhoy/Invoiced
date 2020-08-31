import React, { useEffect, useContext } from 'react';
import { CssBaseline, makeStyles, Container } from '@material-ui/core'
import Step1 from './Step1'

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(0)
    }
}))


const Onboarding = () => {

    const classes = useStyles()

  return (
    <div className={classes.root}>
        <CssBaseline />
        <Container>
            onboarding
            {/* <Step1 /> */}
        </Container>
        

    </div>
  );
}

export default Onboarding;
