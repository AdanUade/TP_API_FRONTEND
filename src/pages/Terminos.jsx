import PageTitle from '../components/page/PageTitle';
import terminos from '../assets/terminos.jpg';

const Terminos = () => (
    <div>
        <PageTitle title="Términos y Condiciones" subtitle="Las reglas del Multiverso" />
        
        <div className="bg-white border-4 border-black p-8">
            <div className="flex flex-col md:flex-row md:gap-8">

                <div className="w-full md:w-1/3 mb-6 md:mb-0 flex-shrink-0">
                    <img 
                        src={terminos} 
                        alt="Héroe de la Justicia" 
                        className="w-full border-4 border-black shadow-[8px_8px_0_0_#000]" 
                    />
                </div>

                <div className="w-full md:w-2/3 font-sans text-lg leading-relaxed space-y-6">
                    <section>
                        <h3 className="text-2xl font-bold font-['Bangers',_cursive]">1. Aceptación de los Términos</h3>
                        <p>Al acceder y utilizar Zarp-Verse (el "Sitio"), aceptas cumplir con estos Términos y Condiciones. Si no estás de acuerdo, por favor, no utilices nuestros servicios. ¡Ni siquiera los villanos ignoran las reglas!</p>
                    </section>

                    <section>
                        <h3 className="text-2xl font-bold font-['Bangers',_cursive]">2. Cuentas de Usuario</h3>
                        <p>Para acceder a ciertas funciones, como guardar tu dirección de guarida secreta, necesitarás crear una cuenta. Eres responsable de mantener la confidencialidad de tu contraseña. No nos hacemos responsables si un clon malvado se hace pasar por ti.</p>
                    </section>
                    
                    <section>
                        <h3 className="text-2xl font-bold font-['Bangers',_cursive]">3. Propiedad Intelectual</h3>
                        <p>Todo el contenido de este Sitio, incluyendo logos y diseños, es propiedad de Zarp-Verse. No puedes usar, reproducir o distribuir nuestro contenido sin nuestro permiso explícito por escrito.</p>
                    </section>

                    <section>
                        <h3 className="text-2xl font-bold font-['Bangers',_cursive]">4. Productos y Precios</h3>
                        <p>Hacemos nuestro mejor esfuerzo para mostrar los productos y precios con la mayor precisión posible. Nos reservamos el derecho de cambiar los precios o corregir errores en cualquier momento.</p>
                    </section>

                    <section>
                        <h3 className="text-2xl font-bold font-['Bangers',_cursive]">5. Limitación de Responsabilidad</h3>
                        <p>Zarp-Verse no se hace responsable por el mal uso de nuestros productos. Si intentas detener un tren con una de nuestras camisetas, los resultados son tu responsabilidad. Nuestros productos no otorgan superpoderes reales (hasta donde sabemos).</p>
                    </section>
                    
                    <section>
                        <h3 className="text-2xl font-bold font-['Bangers',_cursive]">6. Ley Aplicable</h3>
                        <p>Estos términos se regirán por las leyes de la República Argentina. Cualquier disputa será resuelta en los tribunales de la Ciudad Autónoma de Buenos Aires.</p>
                    </section>

                </div>
            </div>
        </div>
    </div>
);

export default Terminos;