import '../css/header.css'

export default function Header (props) {
  return (
    <div className='header'>
      <div className='divH1'>
        <h1> {props.title} </h1>
      </div>
      {props.children}
    </div>
  )
}



