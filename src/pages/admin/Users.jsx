import { getAllUsers } from "../../api/UserApi";
import { usePaginatedFetch } from "../../hooks/usePaginatedFetch";
import { usePagination } from "../../hooks/usePagination";
import PageTitle from "../../components/page/PageTitle";
import ErrorGenerico from "../../components/common/ErrorGenerico";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import Pagination from "../../components/page/Pagination";

const Users = () => {
    const { currentPage, handlePageChange } = usePagination();
    
    const { 
        data: users,
        isLoading, 
        error, 
        totalPages 
    } = usePaginatedFetch({
        fetchFunction: getAllUsers,
        page: currentPage,
        size: 10, 
        dependencies: [currentPage]
    });

    if (isLoading) {
        return <LoadingSpinner title="Cargando Usuarios..." />;
    }

    if (error) {
        return (
            <div>
                <PageTitle title="Gestión de Usuarios" />
                <ErrorGenerico message={error} variant="page" />
            </div>
        );
    }

    return (
        <>
            <PageTitle 
                title="Gestión de Usuarios" 
                subtitle="Lista de todos los usuarios registrados en la plataforma"
            />
            
            <div className="bg-white border-4 border-black p-4 sm:p-6 shadow-[10px_10px_0_0_#000]">
                <div className="overflow-x-auto">
                    <table className="w-full text-left font-sans">
                        <thead className="text-lg border-b-4 border-black">
                            <tr>
                                <th className="p-4">ID</th>
                                <th className="p-4">Nombre</th>
                                <th className="p-4">Email</th>
                                <th className="p-4">Rol</th>
                            </tr>
                        </thead>
                        <tbody>
                            {(users || []).map(user => (
                                <tr key={user.id} className="border-b-2 border-gray-200 hover:bg-yellow-100">
                                    <td className="p-4 font-mono">{user.id}</td>
                                    <td className="p-4 font-bold">{user.name}</td>
                                    <td className="p-4">{user.email}</td>
                                    <td className="p-4">
                                        <span className={`font-bold px-2 py-1 rounded-full text-sm text-white ${
                                            user.rol === 'ADMIN' ? 'bg-red-600' :
                                            user.rol === 'SELLER' ? 'bg-blue-600' :
                                            'bg-gray-500'
                                        }`}>
                                            {user.rol}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {!isLoading && totalPages > 1 && (
                <Pagination 
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            )}
        </>
    );
};

export default Users;