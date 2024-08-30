import React from "react";

const Footer = () => {
    return (
        <footer className="bg-black p-2 py-3 flex justify-center">
                <span className="text-xs text-white">© {new Date().getFullYear()} | Dissenyat per <a href="https://github.com/mcmontseny" target="_blank" rel="noreferrer" className="text-orange-400 hover:text-orange-600 active:text-orange-400">mcmontseny</a></span>
        </footer>
    );
}

export default Footer;