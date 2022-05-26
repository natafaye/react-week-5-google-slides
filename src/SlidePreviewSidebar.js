import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom';

export default function SlidePreviewSidebar({ slideList, onAdd }) {
    const navigate = useNavigate();

    return (
        <div className="slide-preview-sidebar">
            {slideList.map(slide => (
                <NavLink to={"/slide/" + slide.id} className="d-block border m-3 p-3" key={slide.id}>
                    {slide.title}
                </NavLink>
            ))}
            <button className="btn btn-success ms-3" onClick={onAdd}>Add</button>
        </div>
    )
}
