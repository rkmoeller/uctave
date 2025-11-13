import { Link } from 'react-router'
import Button from './components/Button'

const Frontpage = () => {
    return (
        <div className="flex flex-col gap-4 justify-center items-center h-full">
            <h1 className="text-white text-6xl font-semibold">Dukebox</h1>
            <Link to="/app">
                <Button>Enter</Button>
            </Link>
        </div>
    )
}

export default Frontpage
