import React from 'react'
import '../css/deleteComponent.css'
import { setDeleteData, setShowDeleteComponent} from '../redux/userSlice'
import { useDispatch } from 'react-redux';

export default function DeleteComponent() {

    const dispatch = useDispatch()
    
    function handleYes () {
        dispatch(setDeleteData(true))
    }

    function handleNo () {
        dispatch(setShowDeleteComponent(false))
    }
    return (
        <div className='DeleteComponent'> 
            <p> Are you sure you want to delete this item? </p>
            <button onClick={() => handleYes()} id = 'yesButton' type="submit"> YES </button>
            <button onClick={() => handleNo()} id = 'noButton' type="submit"> NO </button>
        </div>
    )
}
