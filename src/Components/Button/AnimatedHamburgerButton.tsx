import { useState } from 'react';

interface Props {
    onClick: () => void;
    isOpen: boolean;
}

const AnimatedHamburgerButton: React.FC<Props> = ({ onClick, isOpen }) => {
    // const [_isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        // setIsOpen(!_isOpen);
        onClick();
    };

    return (
        <button
            className="flex flex-col justify-around w-6 h-6 bg-transparent border-none cursor-pointer p-0"
            onClick={toggleMenu}
        >
            <div
                className={`w-full h-0.5 bg-gray-100 transition-all duration-300 ${isOpen ? 'transform rotate-45 translate-y-2' : ''
                    }`}
            ></div>
            <div
                className={`w-full h-0.5 bg-gray-100 transition-all duration-300 ${isOpen ? 'opacity-0' : ''
                    }`}
            ></div>
            <div
                className={`w-full h-0.5 bg-gray-100 transition-all duration-300 ${isOpen ? 'transform -rotate-45 -translate-y-2' : ''
                    }`}
            ></div>
        </button>
    );
};

export default AnimatedHamburgerButton;
