let cargarDatos = () => {
    fetch("https://dataserverdaw.herokuapp.com/escritores/xml")
    .then(response => response.text())
    .then(data => {
        const parser = new DOMParser();
        const xml = parser.parseFromString(data, "application/xml");
        
        let escritores = xml.getElementsByTagName('escritor')

        for(let escritor of escritores) {
            let id = escritor.querySelector('id').textContent
            let nombre = escritor.querySelector('nombre').textContent
            
            let plantilla = `<option value="${id}">${nombre}</option>`
            document.querySelector('select').innerHTML += plantilla
        }
    })
  .catch(console.error);
}

document.addEventListener('DOMContentLoaded',(event) => {
    cargarDatos()
});


let cambio = document.querySelector('select')
cambio.addEventListener('change', (event) => {
    fetch("https://dataserverdaw.herokuapp.com/escritores/frases")
    .then(response => response.json())
    .then(data => {
    

        }

    })
    .catch(console.error);
});