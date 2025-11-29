import React from 'react';
import Input from './Input';

const FormField = React.forwardRef(({
    label,
    type,
    name,
    onChange,
    onBlur,
    placeholder,
    disabled,
    validationError,
    validationSuccess,
    warningMessage,
    autoComplete = 'off',
    required = false,
    ...rest
}, ref) => {
    return (
        <div>
            <Input
                label={label}
                type={type}
                id={name}
                name={name}
                onChange={onChange}
                onBlur={onBlur}
                ref={ref}
                placeholder={placeholder}
                autoComplete={autoComplete}
                required={required}
                disabled={disabled}
                {...rest}
            />
            
            {validationError && (
                <p className="text-sm text-red-600 mt-1">
                    ⚠️ {validationError}
                </p>
            )}
            
            {!validationError && warningMessage && (
                <p className="text-sm text-orange-600 mt-1">
                    ⚠️ {warningMessage}
                </p>
            )}
            
            {!validationError && !warningMessage && validationSuccess && (
                <p className="text-sm text-green-600 mt-1">
                    ✅ {validationSuccess}
                </p>
            )}
        </div>
    );
});

FormField.displayName = 'FormField';

export default FormField;
