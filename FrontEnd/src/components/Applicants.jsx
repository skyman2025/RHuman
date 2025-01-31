import { useState } from 'react';

function Applicants({ aspirantes }) {
    const [currentPage, setCurrentPage] = useState(1);
    const aspirantesPerPage = 8;

    // Calcular el índice de los aspirantes que se mostrarán
    const indexOfLastAspirante = currentPage * aspirantesPerPage;
    const indexOfFirstAspirante = indexOfLastAspirante - aspirantesPerPage;
    const currentAspirantes = aspirantes.slice(indexOfFirstAspirante, indexOfLastAspirante);

    // Función para cambiar de página
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const totalPages = Math.ceil(aspirantes.length / aspirantesPerPage);

    return (
        <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 py-7 sm:px-6 sm:py-10 lg:max-w-7xl lg:px-8">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Aspirantes</h2>
                <p className="mt-4 text-xl text-gray-500">Aquí podrás encontrar a los candidatos que buscan formar parte de una organización. Nos enorgullece presentar a individuos talentosos y motivados que desean contribuir con su experiencia y habilidades.
                </p>
                <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                    {currentAspirantes.map((aspi) => (
                        <div key={"k" + aspi.lastName + aspi.dni} className="group relative">
                            <div className="w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-50 h-40 sm:h-48 md:h-64 lg:h-80">
                                <img
                                    alt={aspi.detail}
                                    src={aspi.avatar}
                                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                />
                            </div>
                            <div className="mt-4 flex justify-between">
                                <div>
                                    <h3 className="text-sm text-gray-700">
                                        <a href={"/applicants/" + aspi.dni}>
                                            <span aria-hidden="true" className="absolute inset-0" />
                                            {aspi.name + " " + aspi.lastName}
                                        </a>
                                    </h3>
                                    <p className="mt-1 text-sm text-gray-500">{aspi.profession}</p>
                                </div>
                                <p className="text-sm font-medium text-gray-900">{aspi.status}</p>
                            </div>
                        </div>
                    ))}
                </div>
                {/* Paginación: Solo se muestra si hay más de 8 aspirantes */}
                {aspirantes.length > aspirantesPerPage && (
                    <div className="mt-8 flex justify-center">
                        {Array.from({ length: totalPages }, (_, index) => (
                            <button
                                key={index + 1}
                                onClick={() => paginate(index + 1)}
                                className={`mx-1 px-3 py-1 rounded-md ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Applicants;
