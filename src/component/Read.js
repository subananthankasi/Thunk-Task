import React, { useEffect, useState } from 'react'
import './Read.css';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { IconButton, Input, InputLabel, InputAdornment, FormControl } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormLabel from '@mui/material/FormLabel';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ReadThunk } from '../Redux/Thunk/ReadThunk';
import { DeleteThunk } from '../Redux/Thunk/DeleteThunk';
import { UpdateThunk } from '../Redux/Thunk/UpdateThunk';
import { CreateThunk } from '../Redux/Thunk/CreateThunk';
import CircularProgress from '@mui/material/CircularProgress';


const Read = () => {

  const [open, setOpen] = useState(false);
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState('');
  const [languages, setLanguages] = useState([]);
  const [developer, setDeveloper] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [currentUserId,setCurrentUserId] = useState(null)
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const navigate = useNavigate()
  const dispatch = useDispatch()



  useEffect(() => {
    dispatch(ReadThunk())
  }, [dispatch])

  const getResponse = useSelector(state => state.getData.data)
  const loading = useSelector(state => state.getData.loading);
  console.log('loading',loading);
  console.log('getResponse',getResponse);



  const handleLanguageChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setLanguages([...languages, value]);
    } else {
      setLanguages(languages.filter((language) => language !== value));
    }
  };
  const handleClickOpen = (item) => {
    setOpen(true);
    setUserName(item.userName)
    setPassword(item.password)
    setGender(item.gender)
    setDeveloper(item.developer)
    setLanguages(item.languages)
    setCurrentUserId(item.id)
  };
  const handleClose = () => {
    setOpen(false);
  };
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));
  const goToHome = () => {
    navigate('/')
  }
  const handleDelete = (id) => {
    dispatch(DeleteThunk(id))
  }


  return (
    <div className='readContainer'>
      <div className='div'>
        <h1 style={{ textAlign: 'center' }}>UserDetails  </h1>
        <span> <button className='home' onClick={goToHome}><HomeIcon /></button> </span>
      </div>
      {loading ? (
        <div style={{ textAlign: 'center',marginTop:'15%' }}>
          <CircularProgress />
        </div>
      ) : (
      <TableContainer component={Paper} className='TableContainer'>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell >S.no</StyledTableCell>
              <StyledTableCell >UserName</StyledTableCell>
              <StyledTableCell >Password</StyledTableCell>
              <StyledTableCell >Gender</StyledTableCell>
              <StyledTableCell >Language</StyledTableCell>
              <StyledTableCell >Developer</StyledTableCell>
              <StyledTableCell >Action </StyledTableCell>

            </TableRow>
          </TableHead>
          <TableBody>
            {getResponse.map((item, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell component="th" scope="row">
                  {index + 1}
                </StyledTableCell>
                <StyledTableCell >{item.userName}</StyledTableCell>
                <StyledTableCell >{item.password} </StyledTableCell>
                <StyledTableCell >{item.gender} </StyledTableCell>
                <StyledTableCell >{item.developer} </StyledTableCell>
                <StyledTableCell >{item.languages}</StyledTableCell>
                <StyledTableCell >
                  <button style={{ marginRight: '10px' }} onClick={() => handleDelete(item.id)} > <DeleteForeverIcon /></button>
                  <button onClick={() => handleClickOpen(item)}> <BorderColorIcon /></button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )}
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            if(userName&&password&&gender&&languages&&developer){
              if(currentUserId){
                dispatch(UpdateThunk({id:currentUserId,userName,password,gender,developer,languages}))
                console.log('id')
              }
              else{
                dispatch(CreateThunk({ userName, password, languages, gender, developer }))
              }
            }
            
            handleClose();
          },
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <DialogTitle>Update Details</DialogTitle>
          <DialogContent>
            <TextField id="input-with-sx" label="UserName" variant="standard" value={userName} sx={{ width: '40ch' }}
              onChange={(e) => setUserName(e.target.value)} />
            <FormControl sx={{ m: 1, width: '40ch' }} variant="standard">
              <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
              <Input
                id="standard-adornment-password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <FormControl sx={{ width: '40ch' }}>
              <FormLabel id="demo-row-radio-buttons-group-label" style={{ textAlign: 'left' }}>Language :</FormLabel>
              <FormGroup style={{ display: 'flex', flexDirection: 'row' }}>
                <FormControlLabel control={<Checkbox checked={languages.includes('Tamil')} />} label="Tamil" value={"Tamil"} onChange={handleLanguageChange} />
                <FormControlLabel control={<Checkbox checked={languages.includes('English')} />} label="English" value={"English"} onChange={handleLanguageChange} />
                <FormControlLabel control={<Checkbox checked={languages.includes('Hindi')} />} label="Hindi" value={"Hindi"} onChange={handleLanguageChange} />
              </FormGroup>
            </FormControl>
            <FormControl sx={{ width: '40ch' }}>
              <FormLabel id="demo-row-radio-buttons-group-label" style={{ textAlign: 'left' }}>Gender :</FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                value={gender}
              >
                <FormControlLabel value="male" control={<Radio />} label="Male" onChange={(e) => setGender(e.target.value)} />
                <FormControlLabel value="female" control={<Radio />} label="Female" onChange={(e) => setGender(e.target.value)} />
                <FormControlLabel value="other" control={<Radio />} label="Other" onChange={(e) => setGender(e.target.value)} />
              </RadioGroup>
            </FormControl>
            <div>
              <div style={{ textAlign: 'left', marginLeft: '115px' }}  >
                <FormLabel id="demo-row-radio-buttons-group-label" >Developer :</FormLabel>

              </div>

              <div>
                <FormControl style={{ marginLeft: '35px', marginTop: '20px' }} >
                  <InputLabel id="demo-simple-select-label">Developer</InputLabel>
                  <Select
                    sx={{ width: '40ch' }}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={developer}
                    label="Developer"
                    onChange={(e) => setDeveloper(e.target.value)}
                  >
                    <MenuItem value="frontEnd">FrontEnd</MenuItem>
                    <MenuItem value="backend">Backend</MenuItem>
                    <MenuItem value="fullStack">FullStack</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </div>
          </DialogContent>
        </div>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type='submit'>Update</Button>
        </DialogActions>
      </Dialog>

    </div>
  )
}

export default Read