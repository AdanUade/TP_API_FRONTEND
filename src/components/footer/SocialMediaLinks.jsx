import { SOCIAL_MEDIA_LINKS } from "../../constants/dataOrg";

const SocialMediaLinks = () => (


    <div className="flex items-center space-x-5 order-3">
        {SOCIAL_MEDIA_LINKS.map(({ name, href, Icon }) => (
            <a
            key={name}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-yellow-400 transition-colors"
            aria-label={`Visita nuestro perfil de ${name}`}
            >
            <Icon />
            </a>
        ))}
    </div>
);

export default SocialMediaLinks;