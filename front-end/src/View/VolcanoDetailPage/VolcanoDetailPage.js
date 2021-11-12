import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import { useDispatch } from 'react-redux';
import VolcanoTimeLine from './VolcanoeTimeLine';

function VolcanoDetailPage({match}) {
    const dispatch = useDispatch();
    const{params:{volcanoId}} = match;
    const [Volcano, setVolcano] = useState([])

    useEffect(() => {
        Axios.get(`/volcanoes/volcanoes_by_id?id=${volcanoId}&type=single`)
            .then(response => {
                setVolcano(response.data[0])
            })  
    }, [])


    return (
        <VolcanoTimeLine />
    )
}

export default VolcanoDetailPage