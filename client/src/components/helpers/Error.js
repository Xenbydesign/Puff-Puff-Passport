import { useRouteError } from 'react-router-dom'
import Nav from '../navigation/Nav';
const Error = () => {
    const error = useRouteError();
    return (
        <>
            <div>{error.error.message}</div>
            <Nav />
        </>
    )
}

export default Error