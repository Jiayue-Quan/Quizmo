import { Route, Navigate } from 'react-router-dom'
const PrivateRoute = ({ path: Path, element: Element, isAuthenticated, replace: Replace }) => {
    <Route
    path={Path}
    render={() => 
    isAuthenticated ? <Element/> : <Navigate to="/login"/>
}
    />
}

export default PrivateRoute