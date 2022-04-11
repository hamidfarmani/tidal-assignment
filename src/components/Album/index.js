import React, {useState, useEffect} from 'react'
import './index.css'
import axios from 'axios'
import { secondToMinute } from '../../utils/secondToMinute'

const Album = ( props ) => {
    const tracklist = props.selectedAlbum;
    const [album, setAlbum] = useState([])

    const getData = async () => {
        const response = await axios.get(tracklist).catch((error) => {
            console.log('Error: ', error);
        });
        setAlbum(response.data.data)
    }

    useEffect(() => {
        getData()
    }, [tracklist]);

    const getYear = (e) => {
      return new Date(e).toISOString().split('T')[0]
    }

    if (!album) {
        return;
    }
    return (
        <div>
          <table className='tracks-table'>
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Artist</th>
                <th>Time</th>
                <th>Released</th>
              </tr>
            </thead>
            {album.map((track, index) =>  <tbody key={track.id}>
              <tr>
                  <td>{index + 1}</td>
                  <td>{track.title}</td>
                  <td>{track.artist.name}</td>
                  <td>{secondToMinute(track.duration)}</td>
                  <td>2011</td>
              </tr>
            </tbody>
            )}
        </table>
        </div>
    )
}
export default Album;