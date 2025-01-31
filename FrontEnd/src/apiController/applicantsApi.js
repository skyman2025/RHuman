//Acceso a api aspirantes desde frontend.
export async function getApplicants() {
    let getData;
    await fetch('http://localhost:3001/applicants')
        .then(response => response.json())
        .then(data => {
            getData = data;
        })
        .catch(err => {
            console.log(err);
        });
    return getData;
}

export async function getApplicantById(id) {
    let getData;
    await fetch(`http://localhost:3001/applicants/${id}`)
        .then(response => response.json())
        .then(data => {
            getData = data;
        })
        .catch(err => {
            console.log(err);
        });
    return getData;
}
export async function cargaRegistro(formData) {
  try {
    const response = await fetch('http://localhost:3001/applicants/register', {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      throw new Error(`Error HTTP  al registrar aspirante ,ruta sin respuesta': ${response.status} - ${response.statusText}`);
    }
   
    const data = await response.json();
    console.log('Respuesta exitosa:', data);
    
    if (data.error) {
        throw new Error(`Error del servidor: ${data.error}`);
    }

  } catch (error) {
    console.error('Error en funcion cargaRegistro:', error.message);
    throw new Error(`Error HTTP al registrar aspirante: ${error.message}`);
  }
}

export async function loginAspirante(formData) {
  try {
    const response = await fetch('http://localhost:3001/applicants/login', {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      throw new Error('Credenciales inválidas');
    }

    const data = await response.json();
 
    console.log('Respuesta exitosa:', data);

    return data; 
  } catch (error) {
    console.error('Error al intentar iniciar sesión:', error);
    throw error; 
  }
}
