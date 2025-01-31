//Acceso a api profesiones desde frontend.
export async function getProfessions() {
    let getData;
    await fetch('http://localhost:3001/professions')
        .then(response => response.json())
        .then(data => {
            getData = data;
        })
        .catch(err => {
            console.log(err);
        });
    return getData;
}