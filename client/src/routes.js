import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { CreatePage } from './pages/CreatePage'
import { AuthPage } from './pages/AuthPage'
import { History } from './pages/History'
import { AdminHistory } from './pages/AdminHistory'

export const useRoutes = isAuthenticated => {
    if (isAuthenticated) {
        return (
            < Switch >
                <Route path="/create" exact component={CreatePage} />
                <Route path="/history" exact component={History} />
                <Route path="/admin-history" exact component={AdminHistory} />
                <Redirect to="/create" />
            </Switch>
        )
    }

    return (
        <Switch>
            <Route path="/" exact>
                <AuthPage />
            </Route>
            <Redirect to="/" />
        </Switch>
    )
}