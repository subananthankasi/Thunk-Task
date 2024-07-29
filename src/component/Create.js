import React, { useState } from 'react';
import './Create.css';
import { Box, TextField, IconButton, Input, InputLabel, InputAdornment, FormControl, Button } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormLabel from '@mui/material/FormLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useNavigate } from 'react-router-dom';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { useDispatch } from 'react-redux';
import { CreateThunk } from '../Redux/Thunk/CreateThunk';



const Create1 = () => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [gender, setGender] = useState('');
    const [languages, setLanguages] = useState([]);
    const [developer, setDeveloper] = useState('');
    const [errors, setErrors] = useState({})
    const [showPassword, setShowPassword] = useState(false);
  
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleLanguageChange = (e) => {
        const { value, checked } = e.target;
        if (checked) {
            setLanguages([...languages, value]);
        } else {
            setLanguages(languages.filter((language) => language !== value));
        }
        setErrors((prevErrors) => ({ ...prevErrors, languages: '' }));
    };
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleChangeUserName = (e) => {
        setUserName(e.target.value);
        if (e.target.value) {
            setErrors((prevErrors) => ({ ...prevErrors, userName: '' }));
        }
    };
    const handleChangePassword = (e) => {
        setPassword(e.target.value);
        if (e.target.value) {
            setErrors((prevErrors) => ({ ...prevErrors, password: '' }));
        }
    };
    const handleChangeGender = (e) => {
        setGender(e.target.value);
        if (e.target.value) {
            setErrors((prevErrors) => ({ ...prevErrors, gender: '' }));
        }
    };

    const handleChangeDeveloper = (e) => {
        setDeveloper(e.target.value);
        if (e.target.value) {
            setErrors((prevErrors) => ({ ...prevErrors, developer: '' }));
        }
    };

    const submitData = () => {
        const newErrors = {};
        if (!userName) newErrors.userName = "Required";
        if (!password) newErrors.password = "Required";
        if (!gender) newErrors.gender = "Required";
        if (!developer) newErrors.developer = "Required";
        if (languages.length === 0) newErrors.languages = "Required";


        setErrors(newErrors);

        dispatch(CreateThunk({ userName, password, languages, gender, developer }))

        if (Object.keys(newErrors).length === 0) {

            setUserName('');
            setPassword('');
            setGender('');
            setLanguages([]);
            setDeveloper('');

            navigate('/read');
        }
    }
    
    const goToDetailsPage = () => {
        navigate('/read')
    }



    return (
        <div className='container1'>
            <div className='container'>
                <div>
                    <div>
                        <h1 style={{ textAlign: 'center', color: 'blue' }}>Login</h1>
                        <button className='details' onClick={goToDetailsPage}> <ManageAccountsIcon /> </button>
                    </div>
                    <div>
                        <Box sx={{ display: 'flex', alignItems: 'flex-end', }}>
                            <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                            <TextField id="input-with-sx" label="UserName" variant="standard" value={userName} sx={{ width: '32ch' }}
                                onChange={handleChangeUserName} />
                        </Box>
                        {errors.userName ? <p style={{ color: 'red', marginLeft: '20px', }}>{errors.userName} </p> : ''}

                    </div>
                    <div>
                        <FormControl sx={{ m: 1, width: '35ch' }} variant="standard">
                            <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                            <Input
                                id="standard-adornment-password"
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={handleChangePassword}
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
                            {errors.password ? <p style={{ color: 'red', marginLeft: '20px', }}>{errors.password}</p> : ''}

                        </FormControl>
                    </div>
                    <div >
                        <FormLabel id="demo-row-radio-buttons-group-label">Language :</FormLabel>
                        <FormGroup>
                            <FormControlLabel control={<Checkbox checked={languages.includes('Tamil')} />} label="Tamil" value={"Tamil"} onChange={handleLanguageChange} />
                            <FormControlLabel control={<Checkbox checked={languages.includes('English')} />} label="English" value={"English"} onChange={handleLanguageChange} />
                            <FormControlLabel control={<Checkbox checked={languages.includes('Hindi')} />} label="Hindi" value={"Hindi"} onChange={handleLanguageChange} />
                        </FormGroup>
                        {errors.languages ? <p style={{ color: 'red', marginTop: '10px', marginLeft: '20px' }}>{errors.languages}</p> : ''}
                    </div>
                    <div>
                        <FormControl>
                            <FormLabel id="demo-row-radio-buttons-group-label">Gender :</FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                                value={gender}
                            >
                                <FormControlLabel value="male" control={<Radio />} label="Male" onChange={handleChangeGender} />
                                <FormControlLabel value="female" control={<Radio />} label="Female" onChange={handleChangeGender} />
                                <FormControlLabel value="other" control={<Radio />} label="Other" onChange={handleChangeGender} />
                            </RadioGroup>
                            {errors.gender ? <p style={{ color: 'red', marginLeft: '20px' }}>{errors.gender}</p> : ''}

                        </FormControl>
                    </div>
                    <div>
                        <FormLabel id="demo-row-radio-buttons-group-label">Developer :</FormLabel>
                        <FormControl fullWidth style={{ marginTop: '10px' }}>
                            <InputLabel id="demo-simple-select-label">Developer</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={developer}
                                label="Developer"
                                onChange={handleChangeDeveloper}
                            >
                                <MenuItem value="frontEnd">FrontEnd</MenuItem>
                                <MenuItem value="backend">Backend</MenuItem>
                                <MenuItem value="fullStack">FullStack</MenuItem>
                            </Select>
                            {errors.developer ? <p style={{ color: 'red', marginLeft: '20px' }}>{errors.developer}</p> : ''}
                        </FormControl>
                    </div>
                    <div >
                        <Button variant="contained" color="success" onClick={submitData} style={{ marginLeft: '85px', marginTop: '20px' }}>
                            Submit
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Create1;
