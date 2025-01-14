import React from 'react'
import { Sidebar } from 'flowbite-react'
import { HiUser, HiArrowSmRight } from 'react-icons/hi'
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom';

export default function DashSideBar() {
    const location = useLocation();
    const [tab, setTab] = useState('');
    useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    console.log(tabFromUrl);
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search])
  return (
        <Sidebar className='w-full md:w-56'>
          <Sidebar.Items>
              <Sidebar.ItemGroup>
                    <Link to = '/dashboard/tab?=profile'>
                      <Sidebar.Item active={tab === 'profile'} icon={HiUser} label={"User"} labelColor="dark" as='div'>Profile</Sidebar.Item>
                    </Link>
              </Sidebar.ItemGroup>
              <Sidebar.ItemGroup>
                  <Sidebar.Item  icon = {HiArrowSmRight}  className='cursor-pointer'>Sign Out</Sidebar.Item>
              </Sidebar.ItemGroup>
          </Sidebar.Items>
        </Sidebar>
    )
}
