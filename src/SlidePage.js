import React from 'react'
import { useParams } from 'react-router-dom'

export default function SlidePage({ slideList, onTitleChange, onContentChange }) {
  // grab the number up in the URL
  const params = useParams()
  const slideId = parseInt(params.slideId)
  // find the slide with that number as the id
  const slide = slideList.find(slide => slide.id === slideId);
  if(!slide) {
    return "ERROR"
  }
  // show that slide
  return (
    <div className="me-5">
      <input 
        type="text"
        className="form-control form-control-lg mb-3"
        placeholder="Title"
        value={slide.title}
        onChange={(event) => onTitleChange(slide.id, event.target.value)}/>
      <textarea 
        className="form-control form-control-lg edit-slide-content-textarea" 
        placeholder="Content"
        value={slide.content}
        onChange={(event) => onContentChange(slide.id, event.target.value)}/>
    </div>
  )
}
