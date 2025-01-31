const form = document.getElementById('myForm');
const imagenPerfilInput = document.getElementById('imagenPerfil');
const aviso = document.querySelector(".texto-aviso");


form.addEventListener('submit', async (e) => {
  e.preventDefault();

    let correo = email.value.trim();
    let contraseña = password.value.trim();
    let Valornombre = nombre.value.trim();
    let Valorapellido = apellido.value.trim();

  const formData = new FormData();

  formData.append('Nombre', form.Nombre.value);
  formData.append('Apellido',form.Apellido.value);
  formData.append('Email', form.Email.value);
  formData.append('Password', form.Password.value);
  formData.append('Dni', form.Dni.value);
  formData.append('Telefono', form.Telefono.value);
  formData.append('LinkedinURL', form.LinkedinURL.value);
  formData.append('FechaNacimiento', form.FechaNacimiento.value);
  formData.append('Sexo', form.Sexo.value);
  formData.append('ProfesionID', form.ProfesionID.value);
  formData.append('EstadoID', form.EstadoID.value);
  formData.append('Imagen', imagenPerfilInput.files[0]);
  //-----------------------------------------------------------

    const nombreRegex = /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]+$/; 
    const apellidoRegex = /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]+$/; 


//------------------------------------------------------ 
    if (!imagenPerfilInput.files[0]) {
        mostrarAviso('Por favor selecciona una imagen.');  
    return;
  }

  try {
 
    const response = await fetch('/register', {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      throw new Error('Error al registrar usuario.');
    }

    const data = await response.text();
    console.log(data); 
    console.log('registro exitoso'); 
    window.location.href = '/';
    
  } catch (error) {
    console.error('Error al enviar formulario:', error);
  }
});


function mostrarAviso(mensaje){
    aviso.style.color = "#FF2020";
    aviso.style.fontWeight = "800";
    aviso.textContent = mensaje;
    aviso.style.visibility = "inherit";
}
