//array donde se guarda las recetas.
let recetas = [
  {
    name: "Arroz Blanco",
    ingredients: "Arroz Blanco",
    steps:
      "1-Añadimos dos cucharadas de aceite de oliva por cada taza de arroz que vayáis a utilizar. El aceite es el ingrediente que ayudará a que no se pegue el arroz." +
      "\n\n2-Calentamos la cazuela y echamos el aceite, en cuanto veamos que está caliente añadimos el arroz y removemos durante un minuto aproximadamente a temperatura media para tostar el arroz." +
      "\n\n3-Vertemos 2 tazas de agua y media por cada taza de arroz, dejamos a fuego fuerte durante 4 minutos hasta que pille mucha temperatura y empiece a hacer borbotones. Añadimos sal y luego bajamos a fuego medio unos 12 minutos con la tapa de la cazuela puesta." +
      "\n\n4-Cuando veamos que ya casi no hay agua y empiezan a quedar pequeños agujeros entre los granos de arroz, bajamos la temperatura al mínimo tres minutos o simplemente apagamos el fuego." +
      "\n\n5-Dejamos que repose con la tapa puesta o con un trapo de algodón durante unos 5 minutos. Mientras reposa, el arroz absorberá el resto de agua y te debería quedar en su punto y los granos separados. Podemos ir probando el arroz en el reposo para ver como está quedando, a mi me gusta que quede un poquito duro.",
  },
  {
    name: "Gofio",
    ingredients:
      "Gofio de trigo y maíz (200 gr)" +
      "\nAzúcar (1 cucharada)" +
      "\nSal (1 cucharadita)" +
      "\nAgua (un vaso)" +
      "\nAceite de oliva" +
      "\nOPCIONAL: nueces, almendras, plátano, miel, etc.",
    steps:
      "1- Echamos la sal y el azúcar en el vaso de agua. Mezclamos bien hasta que todo se disuelva." +
      "\n 2- Ponemos el gofio en un recipiente amplio y añadimos el aceite." +
      "\n 3- Poco a poco, mientras removemos, vamos echando el agua." +
      "\n 4- Cuando tengamos una mezcla homogénea nos ponemos a amasar ya con las manos." +
      "\n 5- En el momento en que esté ligado le damos forma de cilindro, redondeando los bordes." +
      "\n 6- Esta pelota de gofio la cubrimos con papel film y la metemos en la nevera." +
      "\n 7- Sacamos el cilindro 30 minutos antes de servirlo cortado en rodajas gruesas." +
      "\n 8- Podemos servirlo con nueces, almendras, plátano o miel" +
      "\n OPCIONAL: también podemos añadir cualquiera de estos alimentos en el proceso de hacer la pelota (antes de echar el gofio).",
  },
];

addName("Arroz Blanco");
addName("Gofio");
eventNameReciptes();
eventIngredientsAndSteps();

let buttonAddRecite = document.getElementsByClassName("addRecipe");
let buttonClose = document.getElementsByClassName("close");
//eventos para botones, para añadir nueva receta y cerrar el formulario de nueva receta
buttonAddRecite[0].addEventListener("click", function () {
  let form = document.getElementsByClassName("formulario");
  form[0].style.display = "flex";
});

buttonClose[0].addEventListener("click", function (event) {
  event.preventDefault();
  let form = document.getElementsByClassName("formulario");
  form[0].style.display = "none";
  restartPlaceholder();
});

/* funcion que recibe el nombre de la receta.
 Crea un nuevo parrafo ,un boton y una imagen
 y se añaden como hijos del div "nameRecipe"*/
function addName(nameRecipe) {
  let name = document.createElement("p");
  let ButtonDelete = document.createElement("button");
  let img = document.createElement("img");
  name.classList.add("nameRecipe");
  name.innerText = `${nameRecipe}`;
  name.style.cursor = "pointer";
  let list = document.getElementsByClassName("list");
  name.appendChild(ButtonDelete);
  list[0].appendChild(name);
  ButtonDelete.appendChild(img);
  ButtonDelete.classList.add("buttonDelete");
  img.setAttribute("src", "img\\58326.png");
  deleteRecipe(); // se vuelve a llamar para los nuevos botones asignados tengan evento.
}

/*funcion que controla los eventos al clickar en el nombre de la receta
 info devuelve el primer objeto con el nombre de la receta.
 y muestra su valores en pantalla a traves de varios divs.
 se acompaña de un boton para editar. */
function eventNameReciptes() {
  let nameRecipe = document.getElementsByClassName("nameRecipe");
  let nameRecipeTitle = document.getElementsByClassName("TitleNameRecipe");
  let ingredientsHtmlTag = document.getElementsByClassName("listIngredients");
  let ButtonEdit = document.createElement("button");
  let steps = document.getElementsByClassName("steps");
  for (let i = 0; i < nameRecipe.length; i++) {
    nameRecipe[i].addEventListener("click", function (event) {
      event.preventDefault();
      event.stopPropagation();
      let info = recetas.find((value) => value.name == nameRecipe[i].innerText);
      nameRecipeTitle[0].innerText = info.name;
      ingredientsHtmlTag[0].innerText = info.ingredients;
      steps[0].innerText = info.steps;
      nameRecipeTitle[0].appendChild(ButtonEdit);
      ButtonEdit.innerText = "Editar Receta";
      ButtonEdit.classList.add("buttonEdit");
      editRecipe(); // se vuelve a llamar para los nuevos botones asignados tengan evento.
    });
  }
}

/*funcion que controla los eventos al hacer submit en el formulario de nueva receta
 muestra sus valores en pantalla a traves de varios divs, se acompaña de un boton para editar.
 se divide en dos condiciones: 1-si al hacer submit este nombre ya existe (valor no sera undefined), se reescribe sus valores en el arrray recetas
 si no existe, creara lo establecido por las funciones.
 */
function eventIngredientsAndSteps() {
  let form = document.getElementsByClassName("formulario");
  form[0].addEventListener("submit", function (event) {
    eventNameReciptes();
    event.preventDefault();
    let nameRecipe = document.getElementsByClassName("labelName");
    let ingredients = document.getElementsByClassName("labelingredients");
    let steps = document.getElementsByClassName("labelSteps");
    let nameRecipeTitle = document.getElementsByClassName("TitleNameRecipe");
    let ingredientsHtmlTag = document.getElementsByClassName("listIngredients");
    let steps2 = document.getElementsByClassName("steps");
    let ButtonEdit = document.createElement("button");

    let valor = recetas.find((value) => value.name == nameRecipe[0].value);

    if (valor !== undefined) {
      let index = recetas.findIndex(function (obj) {
        return obj.name == valor.name;
      });
      recetas[index].ingredients = ingredients[0].value;
      recetas[index].steps = steps[0].value;
      form[0].style.display = "none";
      nameRecipeTitle[0].innerText = valor.name;
      ingredientsHtmlTag[0].innerText = ingredients[0].value;
      steps2[0].innerText = steps[0].value;
      nameRecipeTitle[0].appendChild(ButtonEdit);
      ButtonEdit.innerText = "Editar Receta";
      ButtonEdit.classList.add("buttonEdit");
      editRecipe(); // se vuelve a llamar para los nuevos botones asignados tengan evento.
    } else {
      addName(nameRecipe[0].value);
      addIngredients(ingredients[0].value);
      addsteps(steps[0].value);
      recetas.push({
        name: nameRecipe[0].value,
        ingredients: ingredients[0].value,
        steps: steps[0].value,
      });
      showIngredients(nameRecipe[0].value);
      form[0].style.display = "none";
    }
    restartPlaceholder();
    console.log(recetas);
  });
}

/*funcion para añadir ingredientes, se crea un nuevo parrafo y se añade al HTML */
function addIngredients(ingredients) {
  let ingredientsHtmlTag = document.getElementsByClassName("listIngredients");
  let newTaglist = document.createElement("p");
  newTaglist.innerText = ingredients;
  ingredientsHtmlTag[0].innerText = " ";
  ingredientsHtmlTag[0].appendChild(newTaglist);
}
/*funcion para añadir instruciones de la receta, se crea un nuevo parrafo y se añade al HTML */
function addsteps(steps) {
  let stepsHtmlTag = document.getElementsByClassName("steps");
  let newTaglist = document.createElement("p");
  newTaglist.innerText = steps;
  stepsHtmlTag[0].innerText = " ";
  stepsHtmlTag[0].appendChild(newTaglist);
}
/*funcion para reestablecer los labels del formulario de receta */
function restartPlaceholder() {
  let nameRecipe = document.getElementsByClassName("labelName");
  let ingredients = document.getElementsByClassName("labelingredients");
  let steps = document.getElementsByClassName("labelSteps");
  nameRecipe[0].value = "";
  ingredients[0].value = "";
  steps[0].value = "";
}

/*funcion para  eliminar una receta.
al clickar en el boton, obtenemos el padreHtml de boton, tiene como texto el nombre de la receta,
filtramos con filter y sacamos ese objeto del array y eliminamos el html, y actualizamos el apartado de informacion de ingredientes
para no mostrar informacion de lo eliminado*/
function deleteRecipe() {
  let buttonDelete = document.getElementsByClassName("buttonDelete");
  let stepsHtmlTag = document.getElementsByClassName("steps");
  let ingredientsHtmlTag = document.getElementsByClassName("listIngredients");
  let nameRecipeTitle = document.getElementsByClassName("TitleNameRecipe");
  buttonDelete = Array.from(buttonDelete);
  for (let i = 0; i < buttonDelete.length; i++) {
    buttonDelete[i].addEventListener("click", function (event) {
      event.preventDefault();
      event.stopPropagation();
      let padre = buttonDelete[i].parentNode;
      recetas = recetas.filter((value) => value.name !== padre.innerText);
      padre.remove();
      stepsHtmlTag[0].innerText =
        "1-En un ambiente tranquilo, mezcla la taza de paciencia con las 2 cucharadas de curiosidad. Esto ayudará a mantener la calma mientras exploras el mundo de la programación.\n" +
        "\n" +
        "2-Añade las 3 pizcas de lógica y revuelve bien. La lógica te permitirá resolver problemas y encontrar soluciones eficientes.\n" +
        "\n" +
        "3-Ahora es el momento de añadir la pizca de humor programático. ¡No te olvides de reírte mientras escribes tu código! El humor es un ingrediente clave para mantener el buen ánimo durante los desafíos de la programación.\n" +
        "\n" +
        "4-Opcionalmente, puedes agregar una cucharadita de café para mantenerse despierto durante esas largas noches de programación. ¡Pero recuerda, no abuses de la cafeína!\n" +
        "\n" +
        "5-Mezcla todos los ingredientes con pasión y determinación. La programación requiere práctica constante y dedicación.\n" +
        "\n" +
        "6-Una vez que la mezcla esté lista, viértela en tu editor de código favorito y comienza a escribir líneas de código con entusiasmo.\n" +
        "\n" +
        "7-Deja reposar el código por un tiempo y luego revisa el resultado. Asegúrate de que todo funcione correctamente y de que tus ideas estén correctamente plasmadas.\n" +
        "\n" +
        "8-¡Voilà! te has hecho Programador. Compártelo con otros programadores y diviértete mientras aprendes y creas cosas sorprendentes.";
      ingredientsHtmlTag[0].innerText =
        "1 taza de paciencia\n2 cucharadas de curiosidad\n 3 pizcas de lógica\n 1 pizca de humor \n 1 cucharadita de café (opcional, para mantenerse despierto)";

      nameRecipeTitle[0].innerText = "Receta de 'Cómo ser Programador'";
      eventNameReciptes(); // se vuelve a llamar para actualizar eventos
    });
  }
}
/*funcion para mostrar ingredientes, una vez echo submit, entra esta funcion
se encarga de enseñar la informacion de la nueva receta agregada.
obtiene los datos del ultimo objeto añadido ya que acaba de ser pusheado.*/
function showIngredients(value) {
  let nameRecipe = document.getElementsByClassName("nameRecipe");
  let nameRecipeTitle = document.getElementsByClassName("TitleNameRecipe");
  let ingredientsHtmlTag = document.getElementsByClassName("listIngredients");
  let steps = document.getElementsByClassName("steps");
  let ButtonEdit = document.createElement("button");
  nameRecipeTitle[0].innerText = value;
  nameRecipeTitle[0].appendChild(ButtonEdit);
  ButtonEdit.innerText = "Editar Receta";
  ButtonEdit.classList.add("buttonEdit");
  editRecipe(); //se vuelve a llamar ya que al ser creado un nueva receta , no tiene asignada eventos.
  for (let i = 0; i < nameRecipe.length; i++) {
    if (nameRecipe[i].innerText == value.trim()) {
      nameRecipe[i].addEventListener("click", function (event) {
        event.preventDefault();
        event.stopPropagation();
        nameRecipeTitle[0].innerText = recetas[recetas.length - 1].name;
        ingredientsHtmlTag[0].innerText =
          recetas[recetas.length - 1].ingredients;
        steps[0].innerText = recetas[recetas.length - 1].steps;
        nameRecipeTitle[0].appendChild(ButtonEdit);
        ButtonEdit.innerText = "Editar Receta";
        ButtonEdit.classList.add("buttonEdit");
      });
    }
  }
}
/*funcion para editar la receta, el boton coge el nombre de su padreHTML y lo asigna a una varible, con este
buscamos la informacion de la receta a editar y la enseña a traves del formulario */
function editRecipe() {
  let button = document.getElementsByClassName("buttonEdit");
  let form = document.getElementsByClassName("formulario");
  for (let i = 0; i < button.length; i++) {
    button[i].addEventListener("click", function () {
      let nameRecipe = document.getElementsByClassName("labelName");
      let ingredients = document.getElementsByClassName("labelingredients");
      let steps = document.getElementsByClassName("labelSteps");
      form[0].style.display = "flex";
      let padre = button[i].parentNode;
      padre = padre.cloneNode(true).firstChild.textContent;
      let modificar = recetas.filter((value) => value.name === padre);
      nameRecipe[0].value = modificar[0].name;
      ingredients[0].value = modificar[0].ingredients;
      steps[0].value = modificar[0].steps;
    });
  }
}
