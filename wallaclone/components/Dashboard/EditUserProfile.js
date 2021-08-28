import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import Loading from '/components/Loading';
import { getIsLogged, getIsLoading, getError, getUserId } from '../../store/selectors';
import Alert from '/components/Alert';
import styles from '../../styles/Home.module.css';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { FormControl } from '@material-ui/core';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { red } from '@material-ui/core/colors';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import { useDispatch } from 'react-redux';
import { updateAdvertAction, authResetState } from '../../store/actions';
import provinces from '../../utils/spainProvinces';
import WithAuth from '/components/hocs/WithAuth';
import SuccessAlert from '../SuccessAlert';
import { editMyProfile } from '../../api/users';



const useStyles = makeStyles((theme) => ({
  margin: {
      margin: theme.spacing(1),
  },
  selectEmpty: {
      marginTop: theme.spacing(2),
    },
    formControl: {
      margin: theme.spacing(3),
    },
    tagError:{
        color:red,
    },
    upload: {
      display: 'none',
    },
}));

const EditUserProfile = ({isLoading, error, userId}) => {

  const dispatch = useDispatch();
  

  const [newUserProfile, setNewUserProfile] = useState({

    description: "",
    province: "",
    photo: null,
})

const [photoUploaded, setPhotoUploaded] = useState(false);

  const classes = useStyles();

  const handleInputChange = event => {
    setNewUserProfile(oldUserProfile => {

        const newUserProfile = {
            ...oldUserProfile,
            [event.target.name]: event.target.value,
        }
        return newUserProfile
    });

}
const setPhoto = event => {
    setPhotoUploaded(true);
  setNewUserProfile(oldUserProfile => {
      const newProfileDetails = {
          ...oldUserProfile,
          'photo': event.target.files[0]
      }
      return newProfileDetails;
  });
}


  const handleSubmit = (event) => {
    event.preventDefault();
    

    const formData =new FormData();
    formData.append('description', newUserProfile.description);
    formData.append('province', newUserProfile.province);
   
    if (newUserProfile.photo) {
              formData.append('photo', newUserProfile.photo);
          }

    editMyProfile(formData);

}

// const validation = () => {
//   if(!newAdDetails.name){
//       return true
//   };
//   if(!newAdDetails.description){
//       return true
//   };
//   if(!newAdDetails.price || newAdDetails.price <=0 || newAdDetails.price >100000 || isNaN(newAdDetails.price) ){
//       return true
//   };

//   if(!newAdDetails.province){
//       return true
//   };

//   if(newAdDetails.tags.length < 1){
//       return true
//   }


//   return false
// }

  return (
    <div >
      <form onSubmit={handleSubmit} className="register-form">
            
   
            <div>
              
            
            </div>

            <div>

            <div style={{ margin: 8 }} className={classes.margin, "register-input"}>
                    <Grid container spacing={1} alignItems="flex-end">
                        
                        <Grid item>
                            <TextField  required multiline rows={4} onChange={handleInputChange} name="description" id="input-with-icon-grid" label="Descripción sobre tí" value={newUserProfile.description} />
                        </Grid>
                    </Grid>
                </div>
                </div>
    
           
            {/* <div>
            <div style={{ margin: 8 }} className={classes.margin, "register-input"}>
                    <Grid container spacing={1} alignItems="flex-end">
                       
                        <Grid item>
                            <TextField required onChange={event => handleInputChange(event)} name="price" id="input-with-icon-grid" label="Precio" value={newAdDetails.price} />
                        </Grid>
                    </Grid>
                </div>
            </div> */}
            
            

          

            <FormControl style={{ margin: 8 }}  className={classes.margin}>
            <Select style={{ margin: 8 }} required
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={newUserProfile.province}
                onChange={handleInputChange}
                name= "province"
                >
                    {provinces.map(province => <MenuItem value={province.nombre}>{province.nombre}</MenuItem> )}
                    
                    
                </Select>
            </FormControl>
            <InputLabel id="demo-simple-select-label">Provincia</InputLabel>

           
        <img  className="edit-photo"  src={newUserProfile.photo ?  `/profilePhoto.jpg` : '/img/image-not-available.png'} />
                <div  className={classes.root}>
                    
                <input
                className={classes.upload}
                onChange={setPhoto}
                accept="image/*"
                id="contained-button-file"
                multiple
                type="file"
            />

            

            <label  htmlFor="contained-button-file">
                    <Button size ="small" variant="contained" color="primary" component="span">
                    Cambiar foto
                    </Button>
                    <label htmlFor="contained-button-file">
                    <IconButton color="primary" aria-label="upload picture" component="span">
                    <PhotoCamera />
                    </IconButton>
            </label>
            </label>
            </div>
            {photoUploaded && <SuccessAlert message="Foto adjuntada"/>}  
            {error && <Alert />}

            {!isLoading && 
            
            <Button
            // disabled={validation()}
            onClick={handleSubmit}
            type="submit"
            color="secondary"
            size= "medium"
            className={classes.margin} 
            variant="contained"
            >

              Modificar Perfil
              
            </Button>  }

            


            {error && <Alert />}


        </form>

        <style jsx>{`
                    
                   .edit-photo{
                       width: 80px;
                       height: 80px;
                       border-radius: 5px;
                       margin: 20px;
                       
                   }

                    `}</style>
      
    </div>
  )
}

const mapStateToProps = (state) => ({
  isLogged: getIsLogged(state),
  isLoading: getIsLoading(state),
  error: getError(state),
  userId: getUserId(state),
}); 

export default connect(mapStateToProps)(WithAuth(EditUserProfile))

{/* <img  className="edit-photo"  src={newUserProfile.photo ?  `https://pruebas-wallaclone.s3.eu-west-3.amazonaws.com/${advert.userId}/${advert.photo[0]}` : '/img/image-not-available.png'} /> */}