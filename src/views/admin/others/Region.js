/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchRegions } from '../../../redux/others/regionSlice'
import BtnModal from '../../../components/button/BtnModal'
import CIcon from '@coreui/icons-react'
import {
  cilAssistiveListeningSystem,
  cilCheck,
  cilMouthSlash,
  cilUser,
  cilWarning,
} from '@coreui/icons'

const Region = () => {
  const dispatch = useDispatch()
  const regions = useSelector((state) => state.regions.items)
  
  // State to store selected location for map
  const [selectedLocation, setSelectedLocation] = useState(null)

  useEffect(() => {
    dispatch(fetchRegions())
  }, [dispatch])

  // Function to handle when a region is clicked
  const handleRegionClick = (lat, lng) => {
    setSelectedLocation({ lat, lng })
  }

  return (
    <div>
      <div className="d-flex justify-content-between">
        <h2>List of Region</h2>
        <BtnModal name="Add New Region" iform="0" style="primary" />
      </div>
      <div className="row">
        <div className="col-lg-6">
          <table className="table table-hover table-border">
            <thead>
              <tr>
                {/* <th>Region Id</th> */}
                <th>Region Code</th>
                <th>Region Name</th>
                <th>Retails</th>
                <th>Vendor</th>
              </tr>
            </thead>
            <tbody>
              {regions.length > 0 ? regions.map((item) => (
                <tr key={item.regionId} onClick={() => handleRegionClick(21.0285, 105.8542)}>
                {/* <tr key={item.regionId} onClick={() => handleRegionClick(item.latitude, item.longitude)}> */}
                  {/* <td>{item.regionId}</td> */}
                  <td>{item.regionCode}</td>
                  <td>{item.regionName}</td>
                  <td>
                    <button className='btn btn-outline-info'>View</button>
                  </td>
                  <td>
                    <button className='btn btn-outline-info'>View</button>
                  </td>
                </tr>
              )) : <></>}
            </tbody>
          </table>
        </div>
        <div className="col-lg-6">
          {selectedLocation ? (
            <iframe
              title="Google Map"
              width="100%"
              height="400"
              src={`https://www.google.com/maps/embed/v1/place?q=${selectedLocation.lat},${selectedLocation.lng}`}
              frameBorder="0"
              allowFullScreen
            ></iframe>
          ) : (
            <p>Click a region to view on the map</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Region
