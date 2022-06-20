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

const cargarFrases = async (id, nombre) => {
    try {
        var contenedor = document.getElementById('frases')
        contenedor.innerHTML = '';
        let response = await fetch('https://dataserverdaw.herokuapp.com/escritores/frases');
        let data = await response.json();

        const frasesById = data.frases.filter(frase => frase.id_autor == id);

        for( frase of frasesById ) {
            let plantilla = `<div class="col-lg-3">
                                <div class="test-inner ">
                                    <div class="test-author-thumb d-flex">
                                        <div class="test-author-info">
                                            <h4>${nombre}</h4>                                            
                                        </div>
                                    </div>
                                    <span>${frase.texto}</span>
                                    <i class="fa fa-quote-right"></i>
                                </div>
                            </div>`

            contenedor.innerHTML += plantilla
        }

    } catch (err) {
        console.error("Fetch err".repeat(10),err,"Fetch err".repeat(10))
    }
}

let select = document.getElementsByTagName('select')[0];

select.addEventListener('change', (event) => {
    const id = event.target.value;
    const nombre = event.target.options[event.target.selectedIndex].text;
    cargarFrases(id, nombre);
})


