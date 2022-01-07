import '../css/CrudLayout.css'
import CrudOperations from '../components/crudOperations'
import Header from '../components/header'
import CrudLayout from '../components/CrudLayout'
import CrudContainer from '../components/CrudContainer'




export default function Crud (props) {

    return (
        <CrudLayout>
            <CrudContainer> 
                <Header title = 'CodeLeap Network'> </Header>
                <CrudOperations> </CrudOperations> 
            </CrudContainer>               
       </CrudLayout>
    )
}