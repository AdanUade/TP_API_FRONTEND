import Input from './Input';

const FormField = ({ 
    label,
    type,
    name,
    value,
    onChange,
    onBlur,
    placeholder,
    disabled,
    validationError,
    validationSuccess,
    warningMessage,
    autoComplete = 'off',
    required = false
}) => {
    return (
        <div>
            <Input
                label={label}
                type={type}
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                placeholder={placeholder}
                autoComplete={autoComplete}
                required={required}
                disabled={disabled}
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
};

export default FormField;
