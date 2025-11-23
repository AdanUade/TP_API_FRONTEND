import Input from '../common/Input';

const ShippingForm = ({ formData, onChange, isLoading }) => {
    return (
        <div className="space-y-4">
            <h4 className="text-2xl font-bold mb-4">📦 Información de Envío</h4>
            
            <Input
                label="Nombre Completo:"
                type="text"
                name="name"
                value={formData.name}
                onChange={onChange}
                required
                disabled={isLoading}
            />

            <Input
                label="Email:"
                type="email"
                name="email"
                value={formData.email}
                onChange={onChange}
                required
                disabled={isLoading}
            />

            <Input
                label="Dirección de Envío:"
                type="text"
                name="address"
                value={formData.address}
                onChange={onChange}
                placeholder="Calle, número, apartamento, ciudad"
                required
                disabled={isLoading}
            />
        </div>
    );
};

export default ShippingForm;
