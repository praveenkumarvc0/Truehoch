import React,{useState} from 'react'
import Modal from 'react-modal'



function WomenModal() {
    const [modalOpen, setmodalOpen] = useState(false)
    return (
        <div>
         <a onMouseEnter={()=>setmodalOpen(true)} onMouseLeave={()=>setmodalOpen(false)}>WOMEN</a>
         <Modal isOpen={modalOpen}style={{overlay:{backgroundColor:"#00000066"},content:{width:'70%',height:'40%',marginLeft:'90px',marginTop:'34px'}}} >
             <h1>Women</h1>
             
         </Modal>
        </div>
    )
}

export default WomenModal
