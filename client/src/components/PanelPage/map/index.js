import { Component } from 'react'
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react'
import c from 'styles/PanelPage/map/map.module.css'

class MapContainer extends Component{
    render(){
        return (
            <div className={c.map_container}>
                <Map
                    google={this.props.google}
                    style={{height: '90%'}}
                    zoom={4}
                    initialCenter={{
                        lat: 55.7522,
                        lng: 37.6156
                    }}
                >
                    <Marker
                        position={{lat: 48, lng: 44}}
                        icon={() => <div>dasda</div>}
                    />
                </Map>
            </div>
        )
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyBFISybtKXFvWLkwalxQ6vVNd0jipeGq8U',
    language: 'ru'
})(MapContainer)
