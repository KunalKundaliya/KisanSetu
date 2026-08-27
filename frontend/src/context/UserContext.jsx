import { createContext, useContext, useState } from 'react';

const defaultUser = {
    name: 'Kisan',
    location: 'Apna gaon',
    landSize: '',
    irrigation: '',
    mainCrop: 'Gehun (Wheat)',
    mobile: '',
};

const readUser = () => {
    try {
        const savedUser = localStorage.getItem('kisan-setu-user');
        return savedUser ? { ...defaultUser, ...JSON.parse(savedUser) } : defaultUser;
    } catch {
        return defaultUser;
    }
};

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
    const [user, setUserState] = useState(readUser);

    const setUser = (nextUser) => {
        setUserState((currentUser) => {
            const updatedUser = typeof nextUser === 'function' ? nextUser(currentUser) : nextUser;
            localStorage.setItem('kisan-setu-user', JSON.stringify(updatedUser));
            return updatedUser;
        });
    };

    return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};

export const useUser = () => useContext(UserContext);
