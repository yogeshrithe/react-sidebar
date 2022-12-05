import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './sidebar.scss';

const sidebarNavItems = [
    {
        display: 'Dashboard',
        icon: <i className='bx bxs-dashboard'></i>,
        to: '/',
        section: ''
    },
    {
        display: 'Leads',
        icon: <i className='bx bxs-star'></i>,
        to: '/leads',
        section: 'leads'
    },
    {
        display: 'Employees',
        icon: <i className='bx bxs-user-account'></i>,
        to: '/employees',
        section: 'employees'
    },
    {
        display: 'Roles',
        icon: <i className='bx bxs-group'></i>,
        to: '/roles',
        section: 'roles'
    },
]


const Sidebar = () => {
    
    const [activeIndex, setActiveIndex] = useState(0);
    const [stepHeight, setStepHeight] = useState(0);
    const sidebarRef = useRef();
    const indicatorRef = useRef();
    const location = useLocation();

    useEffect(() => {
        setTimeout(() => {
            const sidebarItem = sidebarRef.current.querySelector('.sidebar__menu__item');
            indicatorRef.current.style.height = `${sidebarItem.clientHeight}px`;
            setStepHeight(sidebarItem.clientHeight);
        }, 50);
    }, []);
    const setActiveItem=(path)=>{
        let activeItem = sidebarNavItems.findIndex(item => item.section === path);
        if(path==='addLeads'){
            activeItem=1
        }
        if(path==='addEmployee'){
            activeItem=2
        }
        if(path==='addRoles'){
            activeItem=3
        }
        return activeItem
    }
    // change active index
    useEffect(() => {
        const curPath = window.location.pathname.split('/')[1];
        let activeItem=setActiveItem(curPath)
        setActiveIndex(curPath.length === 0 ? 0 : activeItem);
    }, [location]);

    return <div className='sidebar'>
        <div className="sidebar__logo">
            Animate
        </div>
        <div ref={sidebarRef} className="sidebar__menu">
            <div
                ref={indicatorRef}
                className="sidebar__menu__indicator"
                style={{
                    transform: `translateX(-50%) translateY(${activeIndex * stepHeight}px)`
                }}
            ></div>
            {
                sidebarNavItems.map((item, index) => (
                    <Link to={item.to} key={index}>
                        <div className={`sidebar__menu__item ${activeIndex === index ? 'active' : ''}`}>
                            <div className="sidebar__menu__item__icon">
                                {item.icon}
                            </div>
                            <div className="sidebar__menu__item__text">
                                {item.display}
                            </div>
                        </div>
                    </Link>
                ))
            }
        </div>
    </div>;
};

export default Sidebar;
