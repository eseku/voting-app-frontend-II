import React, { Fragment } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import 'antd/dist/antd.css';
import { Layout } from 'antd'
import Vote from '../components/Vote'
import Results from '../components/Results'
import Candidate from "../components/Candidate";
import NotFound from "../components/NotFound";
import Header from '../components/Header'

const { Footer } = Layout


const AppRouter = () => (
    <BrowserRouter>
        <Fragment>
            <Header />
            <Switch>
                <Route path="/" component={Vote} exact={true} />
                <Route path="/results" component={Results} exact={true} />
                <Route path="/candidate/:id" component={Candidate} exact={true} />
                <Route path="*" component={NotFound} exact={true} />
            </Switch>
            <Footer style={{ textAlign: 'center', position: 'fixed', width: '100%', bottom: '5px' }}>Voting App ©2018 Created by Sear Consults</Footer>
        </Fragment>
    </BrowserRouter>
)


export default AppRouter
