//Una variable que se convierte en un arrow function 
//que se activa con el boton de pokemons
const fetchPokemon = () => {
    //Se crea una variable que contiene el objeto de la caja de texto
    const pokeNameInput = document.getElementById("pokeName");
    //le pasamos el valor de la caja de texto a una variable
    let pokeName = pokeNameInput.value;
    //Se convierte el valor de la variable a minusculas
    pokeName = pokeName.toLowerCase();
    //Se crea una variable que contiene la url de la api
    const url = `https://pokeapi.co/api/v2/pokemon/${pokeName}`; //el ${} es para que se pueda concatenar con la variable pokeName 
    //Mandamos la info desde la url y recibiremos una respuesta
    fetch(url).then((res) => { //Esto es una promesa
        //Si la respuesta no es 200, entonces mandamos un mensaje de error
        if(res.status != "200"){
            console.log(res);
            document.getElementById("pokeLabel").innerHTML = "Pokemon no encontrado :(";
            pokeImage("https://media.tenor.com/images/2a462087b723091b8c7247726677ee6e/tenor.gif");
        }
        //Si la respuesta es 200, entonces mandamos la info del pokemon
        else{
            return res.json();
        }
    }).then((data) => { //esto tambien es una promesa, no como las de tu crush
        //Si la data no esta vacia, entonces mandamos la info del pokemon
        if (data){
            const pokeLabel = document.getElementById("pokeLabel");
            const pokeId = document.getElementById("pokeID")
            const pokeName2 = document.getElementById("pokeName2")
            const pokeHeight  = document.getElementById("pokeHeight")
            const pokeWeight  = document.getElementById("pokeWeight") 
            const pokeSpecies  = document.getElementById("pokeSpecies")
            const pokeExpBase  = document.getElementById("pokeExpBase") 
            
            console.log(data);
            let pokeImg = data.sprites.front_default;
            pokeLabel.innerHTML = data.name;
            pokeId.innerHTML = data.id;
            pokeName2.innerHTML = data.name;
            pokeHeight.innerHTML = data.height;
            pokeWeight.innerHTML = data.weight;
            pokeSpecies.innerHTML = data.species.name;
            pokeExpBase.innerHTML = data.base_experience;

            console.log(pokeImg);
            pokeImage(pokeImg);
            console.log(data.stats);
            pokeStats(data.stats);

            pokeAbilities(data.abilities);
            pokeTypes(data.types);
            
        }
    });
}
//Se crea una arrow Funcion para mostrar la imagen del pokemon
const pokeImage = (url) => {
    //Se obejta el elemento con el id pokeImg
    
    const pokePhoto = document.getElementById("pokeImg");
    //Se le asigna la url de la imagen

    pokePhoto.src = url;
}

const pokeStats = (stats) =>{
    document.getElementById("pokeHP").innerHTML=stats[0].base_stat;
    document.getElementById("pokeAttack").innerHTML=stats[1].base_stat;
    document.getElementById("pokeDefense").innerHTML=stats[2].base_stat;
    document.getElementById("pokeSpeed").innerHTML=stats[5].base_stat;
    document.getElementById("pokeDefenseSpec").innerHTML=stats[3].base_stat;
    document.getElementById("pokeAttackSpec").innerHTML=stats[4].base_stat;
    
    console.log(stats[0].effort);
    // document.getElementById("pokeHPEsf").innerHTML= "Esfuerzo"+ stats[0].effort;
    // document.getElementById("pokeAttackEsf").innerHTML= "Esfuerzo"+  stats[1].effort;
    // document.getElementById("pokeDefenseEsf").innerHTML="Esfuerzo"+  stats[2].effort;
    // document.getElementById("pokeSpeedEsf").innerHTML="Esfuerzo"+ stats[5].effort;
    // document.getElementById("pokeDefenseSpecEsf").innerHTML="Esfuerzo"+  stats[3].effort;
    // document.getElementById("pokeAttackSpecEsf").innerHTML="Esfuerzo"+ stats[4].effort;
}

const pokeTypes = (types) =>{
    var tps= ""
    for(i =0; i<types.length;i++){
        console.log(types[i].type.name);
        if(i == types.length-1){
            tps += types[i].type.name
        }else{
            tps += types[i].type.name + ", "
        }
        
    }
    document.getElementById("pokeTypes").innerHTML=tps
}

const pokeAbilities = (abilities) =>{
    var a= ""
    for(i =0; i<abilities.length;i++){
        console.log(abilities[i].ability.name);
        if(i == abilities.length-1){
            a += abilities[i].ability.name
        }else{
            a += abilities[i].ability.name + ", "
        }
        
    }
    document.getElementById("pokeAbilities").innerHTML=a
} 

const fetchAbilities = () => {
    const pokeAbilitiInput = document.getElementById("pokeAbilitiInput");
    let pokeAbiliti = pokeAbilitiInput.value;
    pokeAbiliti = pokeAbiliti.toLowerCase();
    const url = `https://pokeapi.co/api/v2/ability/${pokeAbiliti}`;
    fetch(url).then((res) => {
        if(res.status != "200"){
            console.log(res);
            alert("Habilidad no encontrada :'(");
        }
        else{
            return res.json();
        }
    }) .then((data) => {
        document.getElementById("pokeAbilityDesc").innerHTML = data.effect_entries[1].effect;
        poke = ""
        for(i =0; i<data.pokemon.length;i++){
            console.log(data.pokemon[i].pokemon.name);
            if(i == data.pokemon.length-1){
                poke += data.pokemon[i].pokemon.name
            }else{
                poke += data.pokemon[i].pokemon.name + ", "
            }
            
        }
        document.getElementById("pokeAbilityPokemones").innerHTML=poke


    });
}