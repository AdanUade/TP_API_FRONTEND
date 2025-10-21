import { useState, useCallback } from 'react';

/**
 * Hook reutilizable y completo para la gestión de formularios.
 * Maneja el estado de los valores del formulario, la validación, los errores,
 * el estado de envío y proporciona los manejadores de eventos necesarios.
 *
 * @param {object} [initialValues={}] - Un objeto con los valores iniciales del formulario.
 * @param {function} onSubmit - La función que se llamará con los valores del formulario cuando este se envíe y sea válido.
 * @param {object} [validationRules={}] - Un objeto donde las claves son los nombres de los campos y los valores son funciones de validación.
 * @returns {{values: object, errors: object, touched: object, isSubmitting: boolean, handleChange: function, handleBlur: function, handleSubmit: function, reset: function, setFormValues: function, setFieldError: function, isValid: boolean, isFieldTouched: function, hasErrors: boolean}} - El estado completo y los manejadores del formulario.
 */
export const useForm = (initialValues = {}, onSubmit, validationRules = {}) => {
    // Almacena los valores actuales de todos los campos del formulario.
    const [values, setValues] = useState(initialValues);
    // Almacena los mensajes de error de validación para cada campo.
    const [errors, setErrors] = useState({});
    // Registra qué campos han sido "tocados" (han perdido el foco) por el usuario.
    const [touched, setTouched] = useState({});
    // Indica si el formulario está en proceso de envío.
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Función para validar todo el formulario. Usada principalmente antes del envío.
    const validateForm = useCallback((showErrors = false) => {
        const newErrors = {};
        let isValid = true;
        Object.keys(validationRules).forEach(fieldName => {
            const validator = validationRules[fieldName];
            const value = values[fieldName];
            if (!validator(value, values)) {
                newErrors[fieldName] = `${fieldName} no es válido`;
                isValid = false;
            }
        });
        if (showErrors) {
            setErrors(newErrors);
        }
        return isValid;
    }, [validationRules, values]);

    // Manejador genérico para el evento `onChange` de los inputs.
    const handleChange = useCallback((e) => {
        const { name, value, type, checked } = e.target;
        const inputValue = type === 'checkbox' ? checked : value;
        setValues(prev => ({ ...prev, [name]: inputValue }));
    }, []);

    // Manejador para el evento `onBlur`, valida el campo cuando el usuario sale de él.
    const handleBlur = useCallback((e) => {
        const { name, value } = e.target;
        setTouched(prev => ({ ...prev, [name]: true }));
        const validator = validationRules[name];
        if (validator) {
            const isValid = validator(value, values);
            if (isValid) {
                // Si el campo es válido y tenía un error, se limpia el error.
                if (errors[name]) {
                    setErrors(prev => ({ ...prev, [name]: null }));
                }
            } else {
                setErrors(prev => ({ ...prev, [name]: `${name} no es válido` }));
            }
        }
    }, [validationRules, values, errors]);

    // Manejador para el evento `onSubmit` del formulario.
    const handleSubmit = useCallback(async (e) => {
        if (e) e.preventDefault(); // Previene el comportamiento por defecto del formulario HTML.
        
        // Valida todo el formulario y muestra los errores si no es válido.
        if (!validateForm(true)) {
            return;
        }

        setIsSubmitting(true);
        try {
            // Llama a la función `onSubmit` pasada como prop con los valores del formulario.
            await onSubmit(values);
        } catch (error) {
            console.error('Error en submit:', error);
        } finally {
            setIsSubmitting(false);
        }
    }, [validateForm, onSubmit, values]);

    // Funciones de utilidad para manipular el formulario desde fuera.
    const reset = useCallback(() => {
        setValues(initialValues);
        setErrors({});
        setTouched({});
        setIsSubmitting(false);
    }, [initialValues]);

    const setFormValues = useCallback((newValues) => {
        setValues(prev => ({ ...prev, ...newValues }));
    }, []);

    const setFieldError = useCallback((fieldName, errorMessage) => {
        setErrors(prev => ({ ...prev, [fieldName]: errorMessage }));
    }, []);

    // Banderas booleanas derivadas para facilitar el renderizado condicional en la UI.
    const isValid = Object.keys(errors).filter(key => errors[key]).length === 0;
    const hasErrors = !isValid;
    const isFieldTouched = (fieldName) => touched[fieldName] === true;

    return {
        values,
        errors,
        touched,
        isSubmitting,
        handleChange,
        handleBlur,
        handleSubmit,
        reset,
        setFormValues,
        setFieldError,
        isValid,
        isFieldTouched,
        hasErrors,
    };
};