//"AIzaSyATfLPrgosbpGkCr1baP6wAD9GZYNHnWaY",

import React, { useCallback, useRef, useState } from 'react'
import { GoogleMap, useLoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import ContractorCard from '../Contractors/ContractorCard';
import { ContractorsInterface } from '../../types/contractorsType';

const containerStyle = {
    width: '100%',
    height: '400px'
};

const center = {
    lat: 13.736717,
    lng: 100.523186
};


interface IProps {
    contractors: ContractorsInterface[]
}
function Map({ contractors }: IProps) {

    const [selected, setSelected] = useState<ContractorsInterface | null>(null)
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: "AIzaSyATfLPrgosbpGkCr1baP6wAD9GZYNHnWaY",
    })

    const mapRef = useRef()

    const onMapLoad = useCallback((map: any) => {
        mapRef.current = map
    }, [])

    return isLoaded ? (
        <div className="">

            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={5}
                onLoad={onMapLoad}
            // onUnmount={onUnmount}
            >
                {contractors && contractors.map((contractor, i) => (

                    <Marker
                        key={i}
                        position={{ lat: contractor.contractor_lat, lng: contractor.contractor_lng }}
                        icon={{
                            url: '/construction.svg',
                            scaledSize: new window.google.maps.Size(30, 30),
                            origin: new window.google.maps.Point(0, 0),
                            anchor: new window.google.maps.Point(15, 15)
                        }}
                        onClick={() => setSelected(contractor)}
                    />
                ))
                }
                {selected && <InfoWindow
                    position={{ lat: selected.contractor_lat, lng: selected.contractor_lng }} onCloseClick={() => setSelected(null)}>
                    <div className="bg-white dark:bg-bgDarkPrimary">
                        <ContractorCard contractor={selected} />
                    </div>
                </InfoWindow>}
            </GoogleMap>
        </div>
    ) : <></>
}

export default React.memo(Map)
