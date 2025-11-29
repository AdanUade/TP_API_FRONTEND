import React from 'react';

const Input = React.forwardRef(({
    label, 
    type = 'text', 
    id, 
    name, 
    onChange, 
    onBlur,
    placeholder = '', 
    required = false, 
    disabled = false,
    rows,
    className = '',
    labelClassName = '',
    inputClassName = '',
    maxLength,
    autoComplete,
    ...restProps
}, ref) => {
    const isTextarea = type === 'textarea';
    
    // Estilos predeterminados adaptables
    const defaultInputStyle = inputClassName || "w-full p-3 border-2 border-black rounded-md font-sans text-lg focus:outline-none focus:ring-2 ring-blue-500 transition-shadow";
    const defaultLabelStyle = labelClassName || "text-xl font-bold block mb-2 uppercase";
    
    const InputElement = isTextarea ? 'textarea' : 'input';
    
    return (
        <div className={className}>
            {label && (
                <label 
                    htmlFor={id} 
                    className={defaultLabelStyle}
                >
                    {label}
                </label>
            )}
            <InputElement
                type={isTextarea ? undefined : type}
                id={id}
                name={name}
                ref={ref}
                onChange={onChange}
                onBlur={onBlur}
                className={defaultInputStyle}
                placeholder={placeholder}
                required={required}
                disabled={disabled}
                rows={isTextarea ? rows : undefined}
                maxLength={maxLength}
                autoComplete={autoComplete}
                {...restProps}
            />
        </div>
    );
});

Input.displayName = 'Input';

export default Input;
