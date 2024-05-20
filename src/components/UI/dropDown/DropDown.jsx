import React, { useEffect, useRef, useState } from 'react';
import './DropDown.scss';

const DropDown = ({children, header}) => {
    const catMenu = useRef(null);
    const [isOpen, setOpen] = useState(false);

    const closeOpenMenus = (e) => {
        if (isOpen && !catMenu.current?.contains(e.target)) {
            setOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', closeOpenMenus);
        return () => {
            document.removeEventListener('mousedown', closeOpenMenus);
        };
    }, [isOpen]);

    return (
        <div className="dropdown" ref={catMenu}>
            <div
                className="dropdown-header"
                onClick={() => setOpen(!isOpen)}
            >
                {header}
            </div>
            <div className={`dropdown-content ${isOpen ? 'dropdown-active' : ''}`}>
                {children}
            </div>
        </div>
    );
}

export default DropDown