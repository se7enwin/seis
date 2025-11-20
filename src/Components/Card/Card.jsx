export default function Card({ name, image, house, wand, ancestry }) {


    return (

        <h3>
            <p>{name}</p>
            <img src={image} />
            <p>{house}</p>
            <p display='inline'>{ancestry}</p>
            <div> Magic Wand </div>  <hr />
            <p>Madera: {wand.wood} <br />Centro: {wand.core} <br />Longitud: {wand.length}</p>

        </h3>




    )

}