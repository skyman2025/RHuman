export default function AplicantInformation({applicants}) {
  return (
    <div className="mx-auto max-w-2xl px-4 lg:max-w-4xl">
      <h1 className="text-xl pb-4 font-semibold leading-8 text-gray-900 sm:text-2xl sm:leading-9">Información del Aspirante</h1>
      <div className="px-4 sm:px-0">
        <p className="text-center text-base font-semibold leading-7 text-gray-900">Datos personales</p>
      </div>
      <div className="mt-6 border-t border-gray-400">
          <dl className="divide-y divide-gray-100">
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">DNI</dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{applicants.dni}</dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">Nombre y Apellido</dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{applicants.firstName+" "+applicants.lastName}</dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">Fecha de nacimiento</dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{applicants.birthdate}</dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">Sexo</dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{(applicants.gender == "F") ? ("Femenino")
                  : (applicants.gender == "M") ? ("Masculino") : ("")}</dd>
              </div>
          </dl>
      </div>
      <div className="px-4 sm:px-0">
          <p className="text-center text-base font-semibold leading-7 text-gray-900">Detalles de la postulación</p>
      </div>
      <div className="mt-6 border-t border-gray-400">
          <dl className="divide-y divide-gray-100">
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">Profesión</dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{applicants.profesion}</dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">Estado de la postulación</dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{applicants.estado}</dd>
              </div>
          </dl>
      </div>
      <div className="px-4 sm:px-0">
          <p className="text-center text-base font-semibold leading-7 text-gray-900">Datos de contacto</p>
      </div>
      <div className="mt-6 border-t border-gray-400">
          <dl className="divide-y divide-gray-100">
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">Teléfono</dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{applicants.phone}</dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">Dirección de correo electrónico</dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{applicants.email}</dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">LinkedIn URL</dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"><a href={applicants.linkedin}>{applicants.linkedin}</a></dd>
              </div>
          </dl>
      </div>
    </div>
  )
}