import { useState, useEffect } from 'react';

const useLocalStorage = (key, defaultValue) => {
    const [state, setState] = useState(() => {
        let value = window.localStorage.getItem(key) || defaultValue
        return value
    })
    useEffect(() => {
        window.localStorage.setItem(key, state)
    }, [key, state])

    return [state, setState]
}

const useFields = (INITIAL_STATE) => {
    const [formData, setFormData] = useState(INITIAL_STATE)
    const handleChange = (e) => {
        setFormData(formData => ({
            ...formData,
            [e.target.name] : e.target.value
        }))
    }
    return [formData, handleChange]
}

export { useLocalStorage, useFields};