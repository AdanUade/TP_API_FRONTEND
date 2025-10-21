import { useState } from 'react';

export const useCheckoutValidation = () => {
    const [error, setError] = useState('');

    const validateForm = (formData) => {
        setError('');

        if (!formData.name || !formData.email || !formData.address) {
            setError('Por favor completa todos los campos de envío');
            return false;
        }

        if (!formData.cardNumber || !formData.expiryDate || !formData.cvv) {
            setError('Por favor completa todos los campos de pago');
            return false;
        }

        const cardNumberClean = formData.cardNumber.replace(/\s/g, '');
        if (!/^\d{16}$/.test(cardNumberClean)) {
            setError('El número de tarjeta debe tener 16 dígitos');
            return false;
        }

        if (!/^\d{2}\/\d{2}$/.test(formData.expiryDate)) {
            setError('La fecha de vencimiento debe tener el formato MM/YY');
            return false;
        }

        if (!/^\d{3}$/.test(formData.cvv)) {
            setError('El CVV debe tener 3 dígitos');
            return false;
        }

        return true;
    };

    const clearError = () => setError('');

    return {
        error,
        setError,
        validateForm,
        clearError
    };
};
