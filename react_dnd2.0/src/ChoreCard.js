import React, { useState } from 'react'
import { useDrag } from 'react-dnd'

export default function ChoreCard({ id, name, status }) {
    const [drag, setDrag] = useState(false)

    const [{ isDragging }, dragRef] = useDrag({
        type: 'chore',
        item: { id, name, status },
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    })
    return (
        <div style={{ border: '5px solid black', width: '300px', height: '70px' }} ref={drag ? dragRef : null}>
            <div onMouseDown={() => setDrag(true)} onMouseUp={() => setDrag(false)}
                style={{
                    width: '10px',
                    height: '10px',
                    display: 'flex',
                    alignItems: 'flex-start',
                    border: '5px solid black',
                    backgroundColor: drag ? 'green' : 'red'
                }} />
            {name} - 
            {status}
            {isDragging && '😱'}
        </div>
    )

}