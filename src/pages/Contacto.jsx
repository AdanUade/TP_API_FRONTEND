import { useState} from 'react';
import PageTitle from '../components/page/PageTitle.jsx';
import ErrorForm from '../components/common/ErrorGenerico.jsx';
import Button from '../components/common/Button.jsx';
import Input from '../components/common/Input.jsx';

const Contacto = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault(); 

        if (!formData.name || !formData.email || !formData.message) {
            setError('¡Héroe! No te olvides de rellenar todos los campos.');
            return;
        }
        
        console.log('Mensaje enviado:', formData);

        setError('');
        setIsSubmitted(true);
        setFormData({
            name: '',
            email: '',
            message: ''
        });
    };
    
    if (isSubmitted) {
        return (
            <div>
                <PageTitle title="¡Misión Cumplida!" />
                <div className="bg-white border-4 border-black p-8 text-center shadow-[12px_12px_0_0_#4ade80]">
                    <h3 className="text-4xl font-bold mb-4">¡Gracias por tu mensaje, Héroe!</h3>
                    <p className="text-xl mb-6">Hemos recibido tu señal. ¡Nos pondremos en contacto contigo más rápido que Flash!</p>
                    <Button onClick={() => setIsSubmitted(false)}  className="w-full md:w-auto">
                        Enviar Otro Mensaje
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div>
            <PageTitle title="¡Contáctanos!" subtitle="Envía una señal si nos necesitas" />

            <div className="bg-white border-4 border-black p-8 shadow-[12px_12px_0_0_#1E90FF]">
                {error && <ErrorForm message={error} />}
                <form onSubmit={handleSubmit} className="space-y-8" noValidate>
                    <Input
                        label="Tu Nombre de Héroe:"
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Ej: Capitán Zarpado"
                        required
                        labelClassName="text-2xl font-bold block mb-2 uppercase"
                    />
                    
                    <Input
                        label="Tu Email Secreto:"
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="tu-identidad@secreta.com"
                        required
                        labelClassName="text-2xl font-bold block mb-2 uppercase"
                    />
                    
                    <Input
                        label="Tu Mensaje:"
                        type="textarea"
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows="6"
                        placeholder="Describe tu misión aquí..."
                        required
                        labelClassName="text-2xl font-bold block mb-2 uppercase"
                    />

                    <Button type="submit" variant="secondary" className="w-full">
                        ¡Enviar Misión!
                    </Button>
                </form>
            </div>
        </div>
    );
};
export default Contacto;