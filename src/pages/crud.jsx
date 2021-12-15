import '../css/crudBackgroundLayout.css'
import CrudOperations from '../components/crudOperations'
import Header from '../components/header'




export default function Crud (props) {

    return (
        <div className="crudBackgroundLayout">
            <Header title = 'CodeLeap Network'> </Header>
            <CrudOperations> </CrudOperations>            
        </div>
    )
}