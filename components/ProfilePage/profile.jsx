'use client'
import axios from 'axios'
import React, { useState, useContext, useEffect } from 'react'
import { Container, Button } from 'react-bootstrap'
import Form from 'react-bootstrap/form'
import { LoginContext } from '../../components/loginProvider/loginProvider'
import { FamilyRestroomOutlined, NearMeDisabled } from '@mui/icons-material'
import { useRouter } from 'next/navigation'
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import Image from 'next/image'
import * as yup from 'yup'
import { useFormik } from 'formik'


const validationSchema = yup.object().shape({
  name: yup.string()
    .matches(/^(?!^[]+$)[a-zA-Z ]+$/, 'Name must only contain letters and spaces')
    .min(5, 'Name must be at least 5 characters')
    .max(20, 'Name can\'t contain more than 20 characters')
    .required('Name is required.'),
  username: yup.string().matches(/^(?!^[0-9]+$)[a-z0-9_]+$/, 'Username must only contain alphanumeric characters, numbers and underscores').min(3, 'Username must be atleast 3 characters').max(20, 'Username can\'t contain more than 20 characters').required('Username is required'),
  email: yup.string().email('Invalid email address').required('Email is required'),
});


const ProfilePage = () => {
  const { userId, setLogged } = useContext(LoginContext)
  const [editing, setEditing] = useState(false)
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [originalName, setOriginalName] = useState('');
  const [originalUsername, setOriginalUsername] = useState('');
  const [originalEmail, setOriginalEmail] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errMessage, setErrMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const [fail, setFail] = useState(false);
  const [open, setOpen] = useState(true);
  const [loading, setLoading] = useState(false);
  const router = useRouter()



 


    async function getUserInfo() {
    const response = await axios.post(`https://reciperush-api.onrender.com/api/user-info`, {
      UserId: userId
    }).then((res) => {
      setOriginalName(res.data.name);
      setOriginalUsername(res.data.username);
      setOriginalEmail(res.data.email);
    })
  }
    
  const handleSubmit = async (values) => {
    setLoading(true)
    try {
      const response = await axios.patch(`https://reciperush-api.onrender.com/api/update-data`, {
        UserId: userId,
        values
      }).then((res) => {
        setOriginalName(res.data.name)
        setOriginalUsername(res.data.username)
        setOriginalEmail(res.data.email)
        if (res.data.successMessage) {
          setSuccessMessage(res.data.successMessage)
          setSuccess(true)
          setFail(false)
          setOpen(true)
          setEditing(false)
          router.refresh()
        } else if (res.data.errMessage) {
          setErrMessage(res.data.errMessage)
          setFail(true)
          setSuccess(false)
          setOpen(true)
          return
        }
      }).catch(e => console.log(e))
    } catch (e) {
      setLoading(false);
      if (e instanceof yup.ValidationError) {
        setErrMessage(e.message);
        setFail(true);
        setSuccess(false);
        setOpen(true);
      } else {
        console.error(e);
        setLoading(false)

      }
    }
    setLoading(false)
  }
 

  const formik = useFormik({
    initialValues: {
      name: originalName,
      username: originalUsername,
      email: originalEmail,
    },
    validationSchema,
    onSubmit: async (values) => {
      handleSubmit(values)
    }
  })

  const handleLogOut =  () => {
    localStorage.removeItem('Token')
    setLogged(false)
    router.push('/')
  }

  useEffect(() => {
    getUserInfo()
    formik.setValues({
      name: originalName,
      username: originalUsername,
      email: originalEmail,
    })
  }, [originalEmail, originalName, originalUsername, userId])



  return (
    <>
      <Container>
        {success && (
          <Collapse in={open}>
            <Alert severity="success" action={
              <IconButton aria-label="close" onClick={() => setOpen(false)}>
                <CloseIcon />
              </IconButton>
            }>
              {successMessage}
            </Alert>
          </Collapse>
        )}
        {fail && (
          <Collapse in={open}>
            <Alert severity="error" action={
              <IconButton aria-label="close" onClick={() => setOpen(false)}>
                <CloseIcon />
              </IconButton>
            }>
              {errMessage || formik.errors}
            </Alert>
          </Collapse>
        )}
        <div className="wrapper d-flex flex-column justify-content-center align-items-center w-full my-5">
          <h4 className="title text-light fw-bold  mb-5">
            Your profile
          </h4>
          <div className="info d-flex flex-row justify-content-around w-full">
            <div className="labels d-flex flex-column">
              <span className='my-4 mx-5 text-light fw-bold'>Name:</span>
              <span className='my-4 mx-5 text-light fw-bold'>Username:</span>
              <span className='my-4 mx-5 text-light fw-bold'>Email:</span>
            </div>
            <div className="inputs d-flex flex-column">
              <Form.Control
                value={formik.values.name}
                onChange={formik.handleChange('name')}
                type="text"
                aria-label="Disabled input example"
                disabled={!editing}
                className='my-3'
                isInvalid={formik.touched.name && editing && formik.errors.name}
              />
              {
                formik.errors.name && editing &&  <div className="invalid-feedback" style={{marginTop: '-15px'}}>{formik.touched.name && formik.errors.name}</div>
              }
              <Form.Control
                value={formik.values.username}
                onChange={formik.handleChange('username')}
                type="text"
                aria-label="Disabled input example"
                disabled={!editing}
                readOnly={!editing}
                className='my-3'
                isInvalid={formik.touched.username && editing && formik.errors.username}
              />
              {
                formik.errors.username && editing &&  <div className="invalid-feedback" style={{marginTop: '-15px'}}>{formik.touched.username && formik.errors.username}</div>
              }
              <Form.Control
                value={formik.values.email}
                onChange={formik.handleChange('email')}
                type="email"
                aria-label="Disabled input example"
                disabled={!editing}
                readOnly={!editing}
                className='my-3'
                isInvalid={formik.touched.email && editing &&  formik.errors.email}
              />
              {
                formik.errors.email && editing && <div className="invalid-feedback" style={{marginTop: '-15px'}}>{formik.touched.email && formik.errors.email}</div>
              }
            </div>
          </div>
          <div className="profile-buttons my-5 d-flex ">
            {
              editing ? (
                <>
                  <Button variant="outline-success rounded mx-2" onClick={formik.handleSubmit} disabled={loading}>
                    {loading ? <Image src={'https://media.giphy.com/media/fphXG8dDcRHVavls9o/giphy.gif'} alt={"Loading..."} width={25} height={25} /> : "Save changes"}
                  </Button>
                  {editing && (
                    <Button variant="outline-danger rounded mx-2" onClick={() => {
                      formik.setValues({
                        name: originalName,
                        username: originalUsername,
                        email: originalEmail,
                      });
                      setEditing(false);
                    }}>
                      Cancel changes
                    </Button>
                  )}
                </>
              ) : (
                <div className='d-flex flex-row'>
                <Button variant="outline-light rounded mx-2" onClick={() => setEditing(true)}>Update informations</Button>
                <Button variant="outline-danger rounded mx-2" onClick={handleLogOut}>Log out</Button>
                </div>
              )
            }
          </div>
        </div>
      </Container>
    </>
  )
}

export default ProfilePage