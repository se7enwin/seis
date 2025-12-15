export default function Card({ name, image, house, wand, ancestry }) {


    return (

       < span > < p > {
        name
    } < /p><img src={image}/ > < div > {
        house
    } < /div><div display='inline'>{ancestry}</div >
    <
    hr / > < table border = '1'
cellSpacing = "0" > < caption > MagicWand < /caption><thead><tr><th>Wood</th > < th > Core < /th><th>Length</th > < /tr></thead > < tbody > < tr >
    <
    td > {
        wand.wood
    } < /td><td>{wand.core}</td > < td > {
        wand.length
    } <
    /td></tr > < /tbody></table > < /span>




    )

}
