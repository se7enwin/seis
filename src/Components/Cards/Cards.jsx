import Card from '../Card/Card'
export default function Cards(props) {


    const { magus } = props;
    console.log('Desde Cards: ', magus[0])

    // if (!magus || magus.length === 0) {
    //              return <h3 style={{ color: 'red', textAlign: 'center' }}>Sin Personajes</h3>;
    //          }

          //   magus?.map(b=>console.log ('NameDesdeMap: '+b[0].name))
    return (

        <div id='Cards'>
            {

                magus?.map(a =>
                    //Card's render- Attach attributes 
                    <Card

                        name={a.name}
                        image={a.image}
                        house={a.house}
                        wand={a.wand}
                        ancestry={a.ancestry}
                        id={a.id}


                    />

                )

            }    </div>



    )

}

// import Card from '../Card/Card';

// export default function Cards(props) {
//     const { magus, isLoading } = props; // Asumo que ahora pasas isLoading desde el padre

//     // console.log('Desde Cards: ', magus[0]); // Esto ya no es necesario si usas length

//     // 1. Mostrar estado de carga (si lo implementas)
//     if (isLoading) {
//         return <h3 style={{ textAlign: 'center' }}>Cargando personajes...</h3>;
//     }

//     // 2. Mostrar si no hay personajes (el array está vacío)
//     if (!magus || magus.length === 0) {
//         return <h3 style={{ color: 'red', textAlign: 'center' }}>Sin Personajes</h3>;
//     }
    
//     // 3. Renderizar las tarjetas si hay datos
//     return (
//         <div id="Cards">
//             {magus.map(a => (
//                 // Es crucial añadir una 'key' única a cada elemento mapeado
//                 <Card
//                     key={a.id} // Usa un ID único para la key (asumo que la API tiene 'id')
//                     name={a.name}
//                     image={a.image}
//                     house={a.house}
//                     wand={a.wand}
//                     ancestry={a.ancestry}
//                 />
//             ))}
//         </div>
//     );
// }