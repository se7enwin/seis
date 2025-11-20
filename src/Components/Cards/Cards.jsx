import Card from '../Card/Card'
export default function Cards(props) {


    const { magus } = props;
    console.log('Desde Cards: ', magus[0])

    console.log('Mapa: ', magus?.map(a => console.log('Nombre: ', a.name)));
    return (

        <div>
            {

                magus?.map(a =>

                    <Card

                        name={a.name}
                        image={a.image}
                        house={a.house}
                        wand={a.wand}
                        ancestry={a.ancestry}


                    />

                )

            }    </div>



    )

}