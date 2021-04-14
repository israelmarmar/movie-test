import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import Detail from './pages/Detail';

import Home from './pages/Home';

const Routes = () => {
    return (
        <BrowserRouter>
            <Route component={Home} path="/" exact />
            <Route path="/detail/:id" component={Detail} />
        </BrowserRouter>
    );
}

export default Routes;