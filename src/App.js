import React, { useState } from 'react'
import { Container, Navbar } from 'react-bootstrap'
import { NavLink, Route, Routes, useNavigate } from 'react-router-dom'
import { FAKE_SLIDES, FAKE_SLIDE_DECK_NAME } from './fake-data'
import HomePage from './HomePage'
import SharingPage from './SharingPage'
import SlidePage from './SlidePage'
import SlidePreviewSidebar from './SlidePreviewSidebar'

export default function App() {
  const [slideDeckName, setSlideDeckName] = useState(FAKE_SLIDE_DECK_NAME);
  const [slideList, setSlideList] = useState(FAKE_SLIDES);

  const navigate = useNavigate();
  
  const addEmptySlide = () => {
    const emptySlide = {
      id: slideList[slideList.length - 1].id + 1, // hack to get the next unique id
      title: "",
      content: ""
    }
    // Sets the state to a copy of slideList with the empty slide on the end
    setSlideList(currList => [...currList, emptySlide])
  }

  const updateSlideTitle = (slideId, newTitle) => {
    // setSlideList(currList => {
    //   // Find the slide to update
    //   const slideToUpdate = currList.find(slide => slide.id === slideId);
    //   const indexOfSlide = currList.findIndex(slide => slide.id === slideId);

    //   // Make a copy and make the change
    //   const copyOfSlideToUpdate = {...slideToUpdate};
    //   copyOfSlideToUpdate.title = newTitle;

    //   // Make a copy of the list and replace the unchanged slide with the copied and changed slide
    //   const copyOfList = [...currList];
    //   copyOfList[indexOfSlide] = copyOfSlideToUpdate;

    //   // Return the changed copy of the list
    //   return copyOfList;
    // })

    setSlideList(currList => currList.map(
      slide => (slide.id === slideId) ? { ...slide, title: newTitle } : slide 
    ))
  }

  const updateSlideContent = (slideId, newContent) => {
    setSlideList(currList => {
      // Find the slide to update
      const slideToUpdate = currList.find(slide => slide.id === slideId);
      const indexOfSlide = currList.findIndex(slide => slide.id === slideId);

      // Make a copy and make the change
      const copyOfSlideToUpdate = {...slideToUpdate};
      copyOfSlideToUpdate.content = newContent;

      // Make a copy of the list and replace the unchanged slide with the copied and changed slide
      const copyOfList = [...currList];
      copyOfList[indexOfSlide] = copyOfSlideToUpdate;

      // Return the changed copy of the list
      return copyOfList;
    })
  }

  return (
    <div>
      <Navbar bg="light" variant="light">
        <Container fluid>
          <Navbar.Brand as={NavLink} to="/">{ slideDeckName }</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              <button className="btn btn-warning" onClick={() => navigate("/sharing")}>Share</button>
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-2 col-md-3 col-sm-4">
            <SlidePreviewSidebar slideList={slideList} onAdd={addEmptySlide}/>
          </div>
          <div className="col pt-3">
            <Routes>
              <Route path="/sharing" element={<SharingPage/>}/>
              <Route path="/slide/:slideId" element={
                <SlidePage slideList={slideList} onTitleChange={updateSlideTitle} onContentChange={updateSlideContent}/>
              }/>
              <Route path="/" element={<HomePage/>}/>
            </Routes>
          </div>
        </div>
      </div>
    </div>
  )
}