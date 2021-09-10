const firebaseConfig = {
    apiKey: "AIzaSyDZNXzULyqQ-uJVzReo1ntvqLsYR_GGOlM",
    authDomain: "videojuegos-d911b.firebaseapp.com",
    projectId: "videojuegos-d911b",
    storageBucket: "videojuegos-d911b.appspot.com",
    messagingSenderId: "336264540844",
    appId: "1:336264540844:web:4229bdd968a912b9936509",
    measurementId: "G-VMYENC64S3"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


function resetFields(){
    document.getElementById("Input1").value='';
    document.getElementById("Input2").value='';
    document.getElementById("Input3").value='';
    document.getElementById("Input4").value='selecciona';
}
function createR() {
    document.getElementById("Input1").disabled = false;
    //Guardo los datos capturados usando el id de cada control
    var id = document.getElementById("Input1").value;
    var nombrejuego = document.getElementById("Input2").value;
    var costo = document.getElementById("Input3").value;
    var genero = document.getElementById("Input4").value;

    //validaciones
    if (id.length > 0) {
        //creo un objeto que guarda los datos
        var videojuego = {
            id, //matricula:id
            nombrejuego,
            costo,
            genero,
        }

        //console.log(alumno);

        firebase.database().ref('Videojuego/' + id).update(videojuego).then(() => {
           resetFields();
        }).then(()=>{
           read();
        });

        swal("Listo!", "Agregado correctamente", "success");

        
    } 
    else {
        swal("Error", "Llena todos los campos","warning");
    }

    document.getElementById("Input1").disabled = false;
        //firebase.database().ref('users/' + userId).set({
    //    username: name,
    //    email: email,
    //    profile_picture : imageUrl
    //  });
    //https://firebase.google.com/docs/database/web/read-and-write?hl=es

  
    //Esto se usa cuando no tienen un id/matricula y Firebase les genera una
    //automaticamente
    //const key = firebase.database().ref().child('Alumnos').push().key;
    //data[`Alumnos/${key}`]= alumno;
    //firebase.database().ref().update(data).then(()=>{
    //  alert('Agregado exitosamente');
    //})
}

function read(){
    document.getElementById("Table1").innerHTML='';

    var ref = firebase.database().ref('Videojuegos');
/**   
   ref.on('value', function(snapshot) {
        snapshot.forEach(row=>{
            printRow(row.val());
        })
    });
 */
   
    ref.on("game_added", function(snapshot) {
        printRow(snapshot.val());
    });

}

function printRow(videojuego){
    
    if(videojuego!=null){
        var table = document.getElementById("Table1"); 

        //creamos un nuevo elemento en la tabla en la ultima posicion
        var row = table.insertRow(-1);

        //Insertamos cada una de las celdas/columnas del registro
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);
        var cell6 = row.insertCell(5);
        
        //Agregamos la informacion a cada una de las columnas del registro
        cell1.innerHTML = videojuego.id;
        cell2.innerHTML = videojuego.nombrejuego; 
        cell3.innerHTML = videojuego.costo;
        cell4.innerHTML = videojuego.genero; 
        cell5.innerHTML = `<button type="button" class="btn btn-danger" onClick="deleteR(${videojuego.id})">Eliminar</button>`;
        cell6.innerHTML = '<button type="button" class="btn btn-success" onClick="seekR('+videojuego.id+')">Modificar</button>';
    }
}

function deleteR(id){
    firebase.database().ref('Videojuegos/' + id).set(null).then(() => {
      read();
    }).then(()=>{
       swal("Listo!", "Eliminado correctamente", "success");
    });
}

function seekR(id){
    var ref = firebase.database().ref('Videojuegos/' + id);
    ref.on('value', function(snapshot) {
      updateR(snapshot.val());
    });
}

function updateR(videojuego){
    if(videojuego!=null)
    {
        document.getElementById("Input1").value=videojuego.id;
        document.getElementById("Input1").disabled = true;
        document.getElementById("Input2").value=videojuego.nombrejuego;
        document.getElementById("Input3").value=videojuego.costo;
        document.getElementById("Input4").value=videojuego.genero;
    }
}


//Para consulta de carrera
function readQ(){
    document.getElementById("Table2").innerHTML='';
    var c = document.getElementById("Input5").value;

    var ref = firebase.database().ref("Videojuegos");
    ref.orderByChild("genero").equalTo(c).on("game_added", function(snapshot) {
        printRowQ(snapshot.val());
    });

}


function printRowQ(videojuego){

    var table = document.getElementById("Table2"); 
    
    //creamos un nuevo elemento en la tabla en la ultima posicion
    var row = table.insertRow(-1);

    //Insertamos cada una de las celdas/columnas del registro
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    
    //Agregamos la informacion a cada una de las columnas del registro
    cell1.innerHTML = videojuego.id;
    cell2.innerHTML = videojuego.nombrejuego; 
    cell3.innerHTML = videojuego.costo;
    cell4.innerHTML = videojuego.genero; 
   
}