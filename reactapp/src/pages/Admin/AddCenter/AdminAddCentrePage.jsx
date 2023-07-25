import React from 'react'
import AdminAddCentreForm from '../../../components/Admin/AdminAddCentreForm/AdminAddCentreForm'

//AdminAddCentrePage component is a React functional component that serves as a page for the admin to add a new service center. 
// It includes the AdminAddCentreForm component to handle the form for adding a new center.
function AdminAddCentrePage() {
  return (
      <div>
        <div style={{width:'80%',margin:'16px auto'}}>
            <AdminAddCentreForm/>
        </div>
      </div>
  )
}

export default AdminAddCentrePage