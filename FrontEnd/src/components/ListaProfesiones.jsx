import { useState, useEffect } from "react";
import { getProfessions } from "../apiController/professionApi";

export default function ListProfesion() {
  const [professions, setProfessions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const professionsPerPage = 5;

  useEffect(() => {
    console.log("Se monto el componente");
    getProfessions().then(res => {
      setProfessions(res);
    });
  }, []);

  // Calcular el índice de las profesiones que se mostrarán
  const indexOfLastProfession = currentPage * professionsPerPage;
  const indexOfFirstProfession = indexOfLastProfession - professionsPerPage;
  const currentProfessions = professions.slice(indexOfFirstProfession, indexOfLastProfession);

  // Función para cambiar de página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(professions.length / professionsPerPage);

  return (
    <div className="mx-auto max-w-2xl px-4 py-7 sm:px-6 sm:py-10 lg:max-w-7xl lg:px-8">
      <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Profesiones</h2>
      <p className="mt-4 text-xl text-gray-500">En esta sección, encontrarás una amplia variedad de profesiones disponibles en nuestra plataforma. Desde roles técnicos hasta creativos, ofrecemos un amplio abanico de oportunidades para que encuentres el puesto ideal que se alinee con tus habilidades e intereses.</p>
      <div className="mx-auto max-w-2xl lg:max-w-4xl">
        <ul role="list" className="divide-y divide-gray-400 mt-4">
          {currentProfessions.map((prof) => (
            <li key={"k" + prof.id} className="flex justify-between gap-x-6 py-5">
              <div className="flex min-w-0 gap-x-4">
                <img alt="" src={prof.img} className="h-12 w-12 flex-none rounded-full bg-gray-50" />
                <div className="min-w-0 flex-auto">
                  <p className="text-sm font-semibold leading-6 text-gray-900">{prof.name}</p>
                  <p className="mt-1 truncate text-xs leading-5 text-gray-500">{prof.descripcion}</p>
                </div>
              </div>
              <div className="hidden shrink-0 sm:flex sm:items-center">
                <p className="text-sm leading-6 text-gray-900">{"Cantidad de aspirantes: " + prof.applicantsCount}</p>
              </div>
            </li>
          ))}
        </ul>
        {/* Paginación: Solo mostrar si hay más de 5 profesiones */}
        {professions.length > professionsPerPage && (
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
