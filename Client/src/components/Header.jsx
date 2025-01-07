import { Navbar, TextInput, Button} from 'flowbite-react'
import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AiOutlineSearch } from 'react-icons/ai'
import { FaMoon } from 'react-icons/fa'

export default function Header() {
    const path = useLocation().pathname;
    return (
        <Navbar className='border-b-2 dark:border-gray-700'>
            {/* sm:text-lg means if the screen is sm than the text will vary as it indicates and dark:text-white means if the screen is dark then the text will be white */}
            <Link to='/' className='self-center text-sm sm:text-lg whitespace-nowrap font-semibold dark:text-white'>
                <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>Saroj's</span>
                Blog
            </Link>
            <form>
                {/* here icon is used to add a search icon in left side inside the search bar and righticon is used to add a search icon in the right side of the search bar */} 
                {/* here hidden will hide the search bar initially if blog is opened in the small screen and whenever it is scaled to large search icon will shown up inside the search bar */}
                <TextInput type='text' placeholder='Search ....' icon={AiOutlineSearch} className='hidden lg:inline'/>         
            </form>
            <Button className='w-12 h-10 lg:hidden' color='gray' pill>
                {/* here when the screen will be large the search icon will be hide because we have already indicate that the search icon will be shown in the search bar in the large screen in upward*/}
                <AiOutlineSearch />
            </Button>
            <div className='flex gap-2 md:order-2'>
                <Button className='w-12 h-10 hidden sm:inline' color='gray' pill>
                    <FaMoon/>
                </Button>
                <Link to='/sign-in'>
                    <Button gradientDuoTone='purpleToBlue' className='shadow-2xl' outline>Sign In</Button>
                </Link>
                <Navbar.Toggle className='w-12 h-10'></Navbar.Toggle>
            </div>
            <Navbar.Collapse>
                {/* here we have added active using the useLocation beacuse we want to show the active link in the navbar */}
                {/* here we have added as = {'div'} because in link there can't be another child link */}
                    <Navbar.Link active = {path === '/'} as={'div'}> 
                        <Link to='/'>Home</Link>
                    </Navbar.Link>
                    <Navbar.Link active = {path === '/about'} as={'div'}>
                        <Link to='/about'>About</Link>
                    </Navbar.Link>
                    <Navbar.Link active = {path === '/projects'} as={'div'}>
                        <Link to='/projects'>Projects</Link>
                    </Navbar.Link>
                </Navbar.Collapse>
        </Navbar>
    )
}
