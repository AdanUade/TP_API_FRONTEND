import Input from '../generico/Input';

const PaymentForm = ({ formData, onChange, isLoading }) => {
    return (
        <div className="space-y-4">
            <h4 className="text-2xl font-bold mb-4">💳 Detalles de Pago</h4>

            <Input
                label="Número de Tarjeta:"
                type="text"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={onChange}
                placeholder="**** **** **** ****"
                maxLength="19"
                required
                disabled={isLoading}
            />

            <div className="grid sm:grid-cols-2 gap-6">
                <Input
                    label="Fecha de Vencimiento:"
                    type="text"
                    name="expiryDate"
                    value={formData.expiryDate}
                    onChange={onChange}
                    placeholder="MM/YY"
                    maxLength="5"
                    required
                    disabled={isLoading}
                />

                <Input
                    label="CVV:"
                    type="text"
                    name="cvv"
                    value={formData.cvv}
                    onChange={onChange}
                    placeholder="123"
                    maxLength="3"
                    required
                    disabled={isLoading}
                />
            </div>
        </div>
    );
};

export default PaymentForm;
