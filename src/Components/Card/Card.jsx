import { Link } from 'react-router-dom';

export default function Card({ name, image, house, wand, ancestry, id }) {


    return (

        <span id='Card'>

            <Link to={`/detail/${id}`}>
                <p id="name">{name}</p>
            </Link>
            <img id='img' src={image} />
            <div id='house'>{house}</div>
            <div id='ancestry' display='inline'>{ancestry.charAt(0).toUpperCase() + ancestry.slice(1)}</div>
            <hr />
            <table id='magic' border='1' cellSpacing="0"><caption>MagicWand</caption><thead><tr><th>Wood</th><th>Core</th><th>Length</th> </tr></thead><tbody><tr><td>{wand.wood.charAt(0).toUpperCase() + wand.wood.slice(1)}</td><td>{wand.core.charAt(0).toUpperCase() + wand.core.slice(1)}</td><td>{wand.length}</td></tr></tbody></table>

        </span>




    )

}

