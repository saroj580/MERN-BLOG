import React from 'react'
import { Footer } from 'flowbite-react'
import { BsFacebook, BsGithub, BsInstagram, BsLinkedin, BsTwitter } from 'react-icons/bs'
import { Link } from 'react-router-dom'

export default function FooterComp() {
    return <Footer container className='border border-t-2 border-teal-500 dark:border-gray-700 w-full'>
        <div className='w-full max-w-7xl mx-auto'>
            <div className='grid w-full justify-between sm:flex md:grid-cols-1'>
                <div className='mt-5'>
                    <Link to='/' className='self-center text-sm sm:text-lg whitespace-nowrap font-semibold dark:text-white'>
                        <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>Saroj's</span>
                        Blog
                    </Link>
                </div>
                <div className='grid grid-cols-2 gap-3 mt-4 sm:grid-cols-3 sm:gap-6'>
                    <div>
                        <Footer.Title title='About' />
                            <Footer.LinkGroup >
                                <Footer.Link href="" target='_blank' rel='noopener noreferrer'>
                                    100 Days of Code
                                </Footer.Link>
                                <Footer.Link href="/about" target='_blank' rel='noopener noreferrer'>
                                    Saroj's Blog
                                </Footer.Link>
                            </Footer.LinkGroup>
                    </div>
                    <div>
                        <Footer.Title title='Follow Me' />
                            <Footer.LinkGroup>
                                <Footer.Link href="https://github.com/saroj580" target='_blank' rel='noopener noreferrer'>
                                    Github
                                </Footer.Link>
                                <Footer.Link href="#" >
                                    Discord
                                </Footer.Link>
                            </Footer.LinkGroup>
                    </div>
                     <div>
                        <Footer.Title title='Legal' />
                            <Footer.LinkGroup>
                                <Footer.Link href="" >
                                    Privacy Policy
                                </Footer.Link>
                                <Footer.Link href="#" >
                                    Terms &amp; Conditions
                                </Footer.Link>
                            </Footer.LinkGroup>
                    </div>
                </div>
            </div>
            <Footer.Divider className='' />
            <div className='w-full sm:justify-between sm:items-center sm:flex'>
                <Footer.Copyright href='#' by="Saroj's Blog" year={new Date().getFullYear()} />
                <div className='flex gap-6 mt-5 sm:mt-0 sm:justify-center'>
                    <Footer.Icon href='https://www.facebook.com/' icon={BsFacebook} />
                    <Footer.Icon href='https://github.com/saroj580' icon={BsGithub} />
                    <Footer.Icon href='https://www.instagram.com/direct/t/17844485306949198/' icon={BsInstagram} />
                    <Footer.Icon href='https://www.linkedin.com/feed/' icon={BsLinkedin} />
                    <Footer.Icon href='https://x.com/home' icon={BsTwitter} />
                </div>
            </div>
        </div>
    </Footer>
}