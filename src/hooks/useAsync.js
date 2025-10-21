import { useState, useCallback } from 'react';

/**
 * Hook genérico para manejar el estado de cualquier operación asíncrona (ej. llamadas a API).
 * Abstrae la lógica común de los estados de carga (isLoading), error (error) y datos (data).
 * 
 * @returns {{isLoading: boolean, error: string|null, data: any|null, execute: function, reset: function, isSuccess: boolean}} - Un objeto que contiene el estado de la operación y las funciones para controlarla.
 */
export const useAsync = () => {
    // Estado para indicar si la operación está en curso.
    const [isLoading, setIsLoading] = useState(false);
    // Estado para almacenar un mensaje de error si la operación falla.
    const [error, setError] = useState(null);
    // Estado para almacenar los datos obtenidos si la operación tiene éxito.
    const [data, setData] = useState(null);

    /**
     * Función que envuelve y ejecuta la operación asíncrona.
     * @param {function} asyncFunction - La función asíncrona a ejecutar (ej. una llamada a una API).
     */
    const execute = useCallback(async (asyncFunction) => {
        setIsLoading(true);
        setError(null);

        try {
            // Se ejecuta la función asíncrona pasada como argumento.
            const result = await asyncFunction();
            setData(result);
            return result;
        } catch (err) {
            // Si ocurre un error, se captura y se guarda el mensaje.
            setError(err.message || 'Error desconocido');
            throw err; // Se relanza el error por si el componente necesita reaccionar a él.
        } finally {
            // Este bloque se ejecuta siempre, tanto si hubo éxito como si hubo error.
            setIsLoading(false);
        }
    }, []);

    // Función para limpiar y resetear todos los estados del hook.
    const reset = () => {
        setIsLoading(false);
        setError(null);
        setData(null);
    };
    
    // Variable booleana derivada para saber fácilmente si la operación fue exitosa.
    const isSuccess = !error && data !== null;

    return {
        isLoading,
        error,
        data,
        execute,
        reset,
        isSuccess,
    };
};
