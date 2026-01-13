import SetNav from "./SetNav"
export default function Nav(props) {

    return (

        <div>
            {/* Render setNav - send prop*/}
            <SetNav getApi={props.getApi} cors={props.cors} logOut={props.logOut} />

        </div>
    )


}