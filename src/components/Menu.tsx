import React, {ReactElement, useState} from "react";
import {Link} from "react-router-dom";

interface MenuOption {
    id: string;
    name: string;
    icon: ReactElement;
    onClick: () => void;
    url: string;
}



const Menu = () => {
    const menuOptions: MenuOption[] = [
        {
            id: 'mapa',
            name: 'Mapa',
            icon: <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z"></path><path d="M15 5.764v15"></path><path d="M9 3.236v15"></path></svg>,
            onClick: () => setSelectedOption('mapa'),
            url: '/mapa'
        },
        {
            id: 'cims',
            name: 'Cims',
            icon: <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                       stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                       >
                <path d="m8 3 4 8 5-5 5 15H2L8 3z"></path>
            </svg>,
            onClick: () => setSelectedOption('cims'),
            url: '/cims'
        },
        {
            id: 'activitats',
            name: 'Activitats',
            icon: <svg  className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                       stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                       data-id="10">
                <path
                    d="M4 16v-2.38C4 11.5 2.97 10.5 3 8c.03-2.72 1.49-6 4.5-6C9.37 2 10 3.8 10 5.5c0 3.11-2 5.66-2 8.68V16a2 2 0 1 1-4 0Z"></path>
                <path
                    d="M20 20v-2.38c0-2.12 1.03-3.12 1-5.62-.03-2.72-1.49-6-4.5-6C14.63 6 14 7.8 14 9.5c0 3.11 2 5.66 2 8.68V20a2 2 0 1 0 4 0Z"></path>
                <path d="M16 17h4"></path>
                <path d="M4 13h4"></path>
            </svg>,
            onClick: () => setSelectedOption('activitats'),
            url: '/activitats'
        },
        {
            id: 'dades',
            name: 'Dades',
            icon: <svg
                className="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <line x1="12" x2="12" y1="20" y2="10"></line>
                <line x1="18" x2="18" y1="20" y2="4"></line>
                <line x1="6" x2="6" y1="20" y2="16"></line>
            </svg>,
            onClick: () => setSelectedOption('dades'),
            url: '/dades'
        }
    ];

    const [selectedOption, setSelectedOption] = useState<string>('mapa');

    return (
        <div className="bg-black px-8 py-1 flex justify-between flex-shrink-0">
            {menuOptions.map(({ id, icon, name, onClick, url}) => (
                <Link
                    key={id}
                    className={`flex flex-col gap-1 justify-center items-center w-1/4 ${selectedOption === id ? 'text-white' : 'text-gray-500'} hover:text-white self-center`}
                    onClick={onClick}
                    to={url}
                >
                    {icon}
                    <span className="text-xs text-center">{name}</span>
                </Link>
                ))}
        </div>
    );
}

export default Menu;