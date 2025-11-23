const Button = ({ children, onClick, variant = 'primary', type = 'button', className = '', disabled = false }) => {
const baseStyle = "w-full font-bold py-3 px-4 rounded-lg text-lg uppercase transition-all duration-200";

const variants = {
    primary: "bg-blue-500 hover:bg-blue-700 text-white border-b-4 border-blue-800 hover:border-blue-900 cursor-pointer",
    secondary: "bg-yellow-500 hover:bg-yellow-600 text-black border-b-4 border-yellow-700 hover:border-yellow-800 cursor-pointer",
    danger: "bg-red-500 hover:bg-red-700 text-white border-b-4 border-red-800 hover:border-red-900 cursor-pointer",
    success: "bg-green-500 hover:bg-green-700 text-white border-b-4 border-green-800 hover:border-green-900 cursor-pointer",
    };

const disabledStyle = "bg-gray-400 text-gray-700 border-b-4 border-gray-500 cursor-not-allowed opacity-60 ";

return (
<button
    type={type}
    onClick={disabled ? undefined : onClick}
    disabled={disabled}
    className={`${baseStyle} ${disabled ? disabledStyle : `${variants[variant]} transform hover:scale-105`} ${className}`}
>
    {children}
</button>
);
};

export default Button;