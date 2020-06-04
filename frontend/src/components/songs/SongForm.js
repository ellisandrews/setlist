import React, { Component } from 'react'
import { Button, Form, Row, Col, Container } from 'react-bootstrap'
import { Formik, FieldArray } from 'formik'
import { object, array, string, boolean } from 'yup'


class SongForm extends Component {

  getInitialFormValues = () => {
    // Initialze the form data with either the provided song or a new one.
    const initialSong = this.props.song || this.songFactory()
    const { guitar_type, capo, strumming, sections, youtube_id, notes } = initialSong
    
    return {
      guitar_type,
      capo,
      strumming,
      sections,
      youtube_id,
      notes,
    }
  }

  sectionFactory = (name='', chords='') => {
    // Create an object representing a new section
    return { name, chords }
  }

  songFactory = (guitar_type='', capo='', strumming='', sections=[ this.sectionFactory() ], youtube_id='', notes='') => {
    // Create an object representing a new song
    return { guitar_type, capo, strumming, sections, youtube_id, notes }
  }

  sectionFieldInvalid = (fieldName, sectionIndex, sectionsTouched, sectionsErrors) => {
    // Check whether a given field of a section is invalid, meaning it has been touched and has validation errors.
    return !!(
      this.sectionFieldTouched(fieldName, sectionIndex, sectionsTouched) &&
      this.sectionFieldErrors(fieldName, sectionIndex, sectionsErrors)
    )
  }

  sectionFieldTouched = (fieldName, sectionIndex, sectionsTouched) => {
    // Check whether a given field of a section has been touched (using Formik's tracking)
    return sectionsTouched && sectionsTouched[sectionIndex] && sectionsTouched[sectionIndex][fieldName]
  }

  sectionFieldErrors = (fieldName, sectionIndex, sectionsErrors) => {
    // Check whether a given field of a section has errors (checking against Formik/Yup validation)
    return sectionsErrors && sectionsErrors[sectionIndex] && sectionsErrors[sectionIndex][fieldName]
  }

  renderSections = ({ push, replace, form }) => {
    // Render the variable number of sections in the form. There is some fancy logic in here due to the fact that
    // Rails requires nested objects to be POSTed with a `_destroy: true` key in order to delete them from a parent object.
    // Thus we need to hold onto all sections, but we need to only display the ones without this special property.

    // Extract relevant methods and data from the Formik `form` object
    const { 
      handleChange, 
      handleBlur, 
      values: { sections },
      errors: { sections: sectionsErrors }, 
      touched: { sections: sectionsTouched}
    } = form

    // Count all sections that do not have a `_destroy: true` key-value pair.
    // This is required due to how rails protects nested objects from being destroyed.
    const numSectionsToRender = sections.reduce((count, section) => !section._destroy ? ++count : count, 0)

    // If there are no sections to render, display the button to add one. Then we're done.
    if ( numSectionsToRender === 0 ) {
      return (
        <Form.Group as={Row}>
          <Col sm={{ span: 10, offset: 2 }}>
            <Button size="sm" onClick={() => push( this.sectionFactory() )}>Add Section</Button>
          </Col>
        </Form.Group>
      )
    }

    // Counter for the number of sections that have been rendered thus far. Used for determining where to put the "Add Section" button.
    let renderedSections = 0

    // Render the sections
    return sections.map((section, index) => {

      // Do not render sections that are slated for desctruction. This tracking is necessary for rails purposes.
      if ( section._destroy ) {
        return null
      }

      // Increment the rendered sections counter and render the section that is slated for display.
      renderedSections++
      return (
        <div key={index}>
          <h5 className="text-muted">Section {renderedSections}</h5>
          <Form.Group as={Row}>
            <Form.Label column sm={2} className="right-label text-muted">Name</Form.Label>
            <Col sm={4}>
              <Form.Control name={`sections.${index}.name`} type="text" placeholder="e.g. Chorus" value={section.name} onChange={handleChange} onBlur={handleBlur} isInvalid={ this.sectionFieldInvalid('name', index, sectionsTouched, sectionsErrors) }/>
              <Form.Control.Feedback type="invalid">{this.sectionFieldErrors('name', index, sectionsErrors)}</Form.Control.Feedback>
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column sm={2} className="right-label text-muted">Chords</Form.Label>
            <Col sm={6}>
              <Form.Control name={`sections.${index}.chords`} type="text" placeholder="e.g. Em C G D" value={section.chords} onChange={handleChange} onBlur={handleBlur} isInvalid={ this.sectionFieldInvalid('chords', index, sectionsTouched, sectionsErrors) }/>
              <Form.Control.Feedback type="invalid">{this.sectionFieldErrors('chords', index, sectionsErrors)}</Form.Control.Feedback>
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Col sm={{ span: 10, offset: 2 }}>
              <Button variant="danger" size="sm" onClick={() => this.removeSection(section, index, replace)}>Remove</Button>{' '}
              {/* The last rendered section gets the "Add Section" button */}
              { renderedSections === numSectionsToRender ? <Button variant="dark" size="sm" onClick={() => push( this.sectionFactory() )}>Add Section</Button> : null }
            </Col>
          </Form.Group>
        </div>
      )
    })
  }

  removeSection = (section, index, replace) => {  
    // Add a `_destroy: true` key-value pair to the section (for rails nested deletion purposes), and then call the
    // Formik `arrayHelper.replace()` method to update the section in the array of values.
    const updatedSection = {
      ...section,
      _destroy: true
    }
    
    replace(index, updatedSection)
  }

  render() {
    const { handleCancel, handleSubmit } = this.props

    // Render the form with Formik control and Yup validation
    return (
      <Container className="bg-white custom-shadow rounded" style={{marginBottom: '5vh', paddingLeft: '3vw'}}>
        
        <Formik
          initialValues={this.getInitialFormValues()}
          validationSchema={object({
            sections: array().of(object({
              _destroy: boolean(),
              name: string().trim().when('_destroy', {
                is: undefined,
                then: string().required('Required')
              }),
              chords: string().trim().when('_destroy', {
                is: undefined,
                then: string().required('Required')
              })
            }))
          })}
          onSubmit={handleSubmit}
        >
        {
          ({
            handleSubmit,
            handleChange,
            handleBlur,
            values
          }) => (
            <Form onSubmit={handleSubmit}>

              {/* --- SONG INFO --- */}
              <h3 className="form-heading" style={{paddingTop: '3vh'}}>Song Info</h3>

              {/* Guitar Type */}
              <fieldset>
                <Form.Group as={Row} onChange={handleChange}>
                  <Form.Label as="legend" column sm={2} className="right-label text-muted">Guitar</Form.Label>
                  <Col>
                    <Form.Check inline type="radio" name="guitar_type" label="Any" value="" checked={!values.guitar_type} onChange={handleChange}/>
                    <Form.Check inline type="radio" name="guitar_type" label="Acoustic" value="Acoustic" checked={values.guitar_type === 'Acoustic'} onChange={handleChange}/>
                    <Form.Check inline type="radio" name="guitar_type" label="Electric" value="Electric" checked={values.guitar_type === 'Electric'} onChange={handleChange}/>
                  </Col>
                </Form.Group>
              </fieldset>

              {/* Capo */}
              <Form.Group as={Row}>
                <Form.Label column sm={2} className="right-label text-muted">Capo</Form.Label>
                <Col sm={1}>
                  <Form.Control name="capo" type="number" value={values.capo} onChange={handleChange} onBlur={handleBlur}/>
                </Col>
              </Form.Group>

              {/* Strumming */}
              <Form.Group as={Row}>
                <Form.Label column sm={2} className="right-label text-muted">Strumming</Form.Label>
                <Col sm={5}>
                  <Form.Control name="strumming" type="text" placeholder="e.g. D DU UDU" value={values.strumming} onChange={handleChange} onBlur={handleBlur}/>
                </Col>
              </Form.Group>

              {/* --- SECTIONS --- */}
              <h3 className="form-heading">Sections</h3>
              <FieldArray name="sections" render={this.renderSections}/>

              {/* --- RESOURCES --- */}
              <h3 className="form-heading">Resources</h3>
              {/* Youtube */}
              <Form.Group as={Row}>
                <Form.Label column sm={2} className="right-label text-muted">YouTube ID</Form.Label>
                <Col sm={5}>
                  <Form.Control name="youtube_id" type="text" placeholder="e.g. 3_yOc3VDU5I" value={values.youtube_id} onChange={handleChange} onBlur={handleBlur}/>
                  <Form.Text className="text-muted">Ex: https://www.youtube.com/watch?v=<b>3_yOc3VDU5I</b></Form.Text>
                </Col>
              </Form.Group>

              {/* Notes */}
              <Form.Group as={Row}>
                <Form.Label column sm={2} className="right-label text-muted">Notes</Form.Label>
                <Col sm={9}>
                  <Form.Control as="textarea" rows="5" placeholder="Song notes..." name="notes" value={values.notes} onChange={handleChange} onBlur={handleBlur}/>
                </Col>
              </Form.Group>

              {/* --- SUBMISSION --- */}
              <Form.Group as={Row} style={{marginTop: '5vh', marginBottom: '5vh', textAlign: 'center'}}>
                <Col style={{marginBottom: '5vh'}}>
                  <Button variant="secondary" onClick={handleCancel}>Cancel</Button>{' '}
                  <Button variant="dark" type="submit">Save</Button>
                </Col>
              </Form.Group>

            </Form>
          )
        }
        </Formik>

      </Container>
    )
  }
}


export default SongForm
