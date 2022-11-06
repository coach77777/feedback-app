import { createContext, useState, useEffect } from 'react'

const FeedbackContext = createContext()

export const FeedbackProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState( true)
  const [feedback, setFeedback] = useState([ ])

  const [feedbackEdit, setFeedbackEdit] = useState({
    item: { },
    edit: false,
  })

  useEffect (( ) => {
   fetchFeedback()
   }, [ ])

   //Fetch Feedback data
   const fetchFeedback = async ( ) => {
    const response = await fetch( `/feedback?_sort=id&_order=desc`)
    const data = await response.json( )

    setFeedback(data)
    setIsLoading( false)
   }

// add Feedback
  const addFeedback = async (newFeedback) =>{
    const response = await fetch( '/feedback', {
    method: 'POST',
    headers:{ 'Content-Type': 'application/json'
  },
  body: JSON.stringify(newFeedback)
})

const data = await response.json( )
  
    setFeedback([data, ...feedback])
  } 

//delete Feedback
  const deleteFeedback = async (id) => {
    if (window.confirm('Are you sure you want to delete?')) {
      await fetch(` /feedback/${id}`, { method: 'DELETE' })

      setFeedback(feedback.filter((item) => item.id !== id))
    }
  }

  //Update Feedback
  const updateFeedback = async( id, updItem) => {
  const response = await fetch( `/feedback/${id}`, {
  method: 'PUT',
  headers: {
    'Content-type': 'application/json',
  },
  body: JSON.stringify(updItem)
 } )

 const data =  await response.json( )

    setFeedback(
      feedback.map((item)  =>  (item.id === id ? {...item, ...data } : item))
    )
  }

  //set item to be updated
  const editFeedback = ( item) => {
    setFeedbackEdit({ 
      item,
      edit: true
     })
  }

  {
    return (
      <FeedbackContext.Provider
        value={{
          // shorthand for feedback: feedback
          feedback,
          feedbackEdit,
          isLoading,
          deleteFeedback,
          addFeedback,
          editFeedback,
          updateFeedback,
        }}
      >
        {children}
      </FeedbackContext.Provider>
    )
  }
}
export default FeedbackContext
