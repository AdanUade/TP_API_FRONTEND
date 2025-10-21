import {Copyright, FooterLinks, SocialMediaLinks} from './'

const Footer = () => (
    <footer className="bg-gray-900 text-white border-t-8 border-black mt-auto">
        <div className="container mx-auto px-4 py-6 flex flex-col gap-4 sm:flex-row justify-between items-center">
            <Copyright />
            <FooterLinks />
            <SocialMediaLinks />
        </div>
    </footer>
);

export default Footer;