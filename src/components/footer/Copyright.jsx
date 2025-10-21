
import { DATA_ORG } from '../../constants/dataOrg';

const Copyright = () => {
    const companyName = DATA_ORG.name;
    const currentYear = DATA_ORG.currentYear;

    return (
        <p className="text-lg font-bold text-center sm:text-left order-2 sm:order-1">
            &copy; {currentYear} {companyName}.
        </p>
    );
};

export default Copyright;