// primeiro vamos criar funções que nos ajude nos processos repetitivos

function creatLabel(text,htmlFor) { 
  const label = document.createElement('label') 
  label.htmlFor = htmlFor  
  label.innerText = text
  return label
}

function creatInput(id, value, name, type = 'text', placeholder='' ) {
 const input = document.createElement('input') 
 input.id = id
 input.value = value
 input.name = name
 input.type = type
 input.placeholder = placeholder
 return input
}

const addTechBtn = document.getElementById('addTecBtn') 
const form = document.getElementById('formDev')
const developers = [] 
let inputRows = 0 // essa variavel servira como um contador auxiliar de linhas no input, esse contador, nos ajudara a criar IDs unicos


addTechBtn.addEventListener('click',function (ev) { 
  const stackInputs = document.getElementById('stackInputs')
  const newRow = document.createElement('li')
  // usando a variavel auxiliar que é um contador como Index ( const rowIndex = inputRows )
  const rowIndex = inputRows 
  inputRows++ 

// Com a junção de um texto selecionado e concatenação da variavel que usa a variavel auxiliar iremos criar um id unico
  newRow.id = 'inputRow-' + rowIndex 
  newRow.className = 'inputRow' // Essa classe nos ajudara a selecionar os elemenos com document.querySelectorAll('.inputRow')

  const tecNameLabel = creatLabel('Nome: ', 'tecName-'+rowIndex)
  const tecNameInput = creatInput('tecName-'+ rowIndex, null, 'tecName')
  
  const exLabel = creatLabel('Experiencia: ')

  const id1 = 'expRadio-' + rowIndex + '.1'
  const expRadio1 = creatInput(id1,'0-2 anos', 'tecExp-'+rowIndex,'radio')
  const expLabel1 = creatLabel('0-2 Anos', id1)

  const id2 = 'expRadio-' + rowIndex + '.2'
  const expRadio2 = creatInput(id2,'3-4 anos', 'tecExp-'+rowIndex,'radio')
  const expLabel2 = creatLabel('3-4 Anos', id2)


  const id3 = 'expRadio-' + rowIndex + '.3'
  const expRadio3 = creatInput(id3,'5+ anos', 'tecExp-'+rowIndex,'radio')
  const expLabel3 = creatLabel('5+ Anos', id3)

  const removeRowBtn = document.createElement('button')
  removeRowBtn.type = 'button'
  removeRowBtn.innerText = 'Remover'
  removeRowBtn.addEventListener('click', function(){
  stackInputs.removeChild(newRow)  
  })

  // adicionaremos os elementos a variavel newRow que é um novo elemento 'li'
  newRow.append(
    tecNameLabel,
    tecNameInput,
    exLabel,
    expRadio1,
    expLabel1,
    expRadio2,
    expLabel2,
    expRadio3,
    expLabel3,
    removeRowBtn
  )
  // depois adicionaremos ao elemento 'ul' que esta na variavel stackInputs a nova 'li' criada com a variavel newRow
  stackInputs.appendChild(newRow)
})

form.addEventListener('submit', function (ev) {
  ev.preventDefault()

  const fullnameInput = document.getElementById('fullName')
  const inputRows = document.querySelectorAll('.inputRow')

  let tecnologies = []

  inputRows.forEach(function(row){
    // Aqui pegamos os elementos referente a uma linha especifica com  #row.id input[name="tecName"] e assim por diante
    const tecName = document.querySelector('#' +row.id + ' input[name="tecName"]').value
    const tecExp = document.querySelector('#' +row.id + ' input[type="radio"]:checked').value
    tecnologies.push({name:tecName, exp:tecExp})
  })

  const newDev = { fullname: fullnameInput.value, tecnologies: tecnologies }
  developers.push(newDev)
  alert('Dev cadastrado com sucesso')

  fullnameInput.value = ''
  inputRows.forEach(function(row){
    row.remove()
  })
  console.log(developers);
})