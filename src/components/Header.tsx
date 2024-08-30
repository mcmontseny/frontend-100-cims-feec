const Header = () => {
    return (
        <header className="bg-black text-white border-b shadow-sm sticky top-0 z-20 px-4 py-3 md:px-6 md:py-4">
            <div className="flex items-center justify-between">
                <a className="flex items-center gap-2 font-bold text-lg hover:text-neutral-500" href="/">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-6 h-6"
                    >
                        <path d="m8 3 4 8 5-5 5 15H2L8 3z"></path>
                    </svg>
                    <span className="text-xl">Repte 100 Cims</span>
                </a>
                {/*<div className="flex items-center gap-4">*/}
                {/*    <a className="hidden md:inline-flex items-center gap-2 text-neutral-500 hover:text-white" href="#">*/}
                {/*        <svg*/}
                {/*            xmlns="http://www.w3.org/2000/svg"*/}
                {/*            width="24"*/}
                {/*            height="24"*/}
                {/*            viewBox="0 0 24 24"*/}
                {/*            fill="none"*/}
                {/*            stroke="currentColor"*/}
                {/*            strokeWidth="2"*/}
                {/*            strokeLinecap="round"*/}
                {/*            strokeLinejoin="round"*/}
                {/*            className="w-5 h-5"*/}
                {/*        >*/}
                {/*            <path d="M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z"></path>*/}
                {/*            <path d="M15 5.764v15"></path>*/}
                {/*            <path d="M9 3.236v15"></path>*/}
                {/*        </svg>*/}
                {/*        <span>Mapa</span>*/}
                {/*    </a>*/}
                {/*    <a className="hidden md:inline-flex items-center gap-2 text-neutral-500 hover:text-white" href="#">*/}
                {/*        <svg*/}
                {/*            xmlns="http://www.w3.org/2000/svg"*/}
                {/*            width="24"*/}
                {/*            height="24"*/}
                {/*            viewBox="0 0 24 24"*/}
                {/*            fill="none"*/}
                {/*            stroke="currentColor"*/}
                {/*            strokeWidth="2"*/}
                {/*            strokeLinecap="round"*/}
                {/*            strokeLinejoin="round"*/}
                {/*            className="w-5 h-5"*/}
                {/*        >*/}
                {/*            <path d="m8 3 4 8 5-5 5 15H2L8 3z"></path>*/}
                {/*        </svg>*/}
                {/*        <span>Muntanyes</span>*/}
                {/*    </a>*/}
                {/*    <a className="hidden md:inline-flex items-center gap-2 text-neutral-500 hover:text-white" href="#">*/}
                {/*        <svg*/}
                {/*            xmlns="http://www.w3.org/2000/svg"*/}
                {/*            width="24"*/}
                {/*            height="24"*/}
                {/*            viewBox="0 0 24 24"*/}
                {/*            fill="none"*/}
                {/*            stroke="currentColor"*/}
                {/*            strokeWidth="2"*/}
                {/*            strokeLinecap="round"*/}
                {/*            strokeLinejoin="round"*/}
                {/*            className="w-5 h-5"*/}
                {/*        >*/}
                {/*            <line x1="8" x2="21" y1="6" y2="6"></line>*/}
                {/*            <line x1="8" x2="21" y1="12" y2="12"></line>*/}
                {/*            <line x1="8" x2="21" y1="18" y2="18"></line>*/}
                {/*            <line x1="3" x2="3.01" y1="6" y2="6"></line>*/}
                {/*            <line x1="3" x2="3.01" y1="12" y2="12"></line>*/}
                {/*            <line x1="3" x2="3.01" y1="18" y2="18"></line>*/}
                {/*        </svg>*/}
                {/*        <span>Ascensions</span>*/}
                {/*    </a>*/}
                {/*    <a className="hidden md:inline-flex items-center gap-2 text-neutral-500 hover:text-white" href="#">*/}
                {/*        <svg*/}
                {/*            xmlns="http://www.w3.org/2000/svg"*/}
                {/*            width="24"*/}
                {/*            height="24"*/}
                {/*            viewBox="0 0 24 24"*/}
                {/*            fill="none"*/}
                {/*            stroke="currentColor"*/}
                {/*            strokeWidth="2"*/}
                {/*            strokeLinecap="round"*/}
                {/*            strokeLinejoin="round"*/}
                {/*            className="w-5 h-5"*/}
                {/*        >*/}
                {/*            <rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect>*/}
                {/*            <circle cx="9" cy="9" r="2"></circle>*/}
                {/*            <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"></path>*/}
                {/*        </svg>*/}
                {/*        <span>Blog</span>*/}
                {/*    </a>*/}
                {/*    <button className="inline-flex text-neutral-400 items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input hover:text-white h-10 w-10 md:hidden">*/}
                {/*        <svg*/}
                {/*            xmlns="http://www.w3.org/2000/svg"*/}
                {/*            width="24"*/}
                {/*            height="24"*/}
                {/*            viewBox="0 0 24 24"*/}
                {/*            fill="none"*/}
                {/*            stroke="currentColor"*/}
                {/*            strokeWidth="2"*/}
                {/*            strokeLinecap="round"*/}
                {/*            strokeLinejoin="round"*/}
                {/*            className="w-5 h-5"*/}
                {/*        >*/}
                {/*            <line x1="4" x2="20" y1="12" y2="12"></line>*/}
                {/*            <line x1="4" x2="20" y1="6" y2="6"></line>*/}
                {/*            <line x1="4" x2="20" y1="18" y2="18"></line>*/}
                {/*        </svg>*/}
                {/*        <span className="sr-only">Toggle Menu</span>*/}
                {/*    </button>*/}
                {/*</div>*/}
                <img alt="Marc Casamitjana i Montseny" className="rounded-full h-[32px] w-[32px]" src="https://media.licdn.com/dms/image/v2/D4D03AQEdebVS6zNhKg/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1719603148409?e=2147483647&v=beta&t=UlR43HGn7x8AbEoeRIn_jP-rEW7YDaZiXgKZNr5Sl6M" />
            </div>
        </header>
    );
}

export default Header;