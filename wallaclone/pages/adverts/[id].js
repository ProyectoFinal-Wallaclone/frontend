import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import { deleteAdvert, getAdvertDetail } from '../../api/adverts';
import statusEnum from '../../utils/advertsEnum';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import EditAdvertForm from '../../components/Advert/EditAdvert';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import styles from '../../styles/Home.module.css'
import { useSelector } from 'react-redux';
import { getIsLogged, getUserId } from '../../store/selectors';



const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
          margin: theme.spacing(1),
          width: '25ch',
        },
    },
    margin: {
        margin: theme.spacing(1),
    },

}));

const advert = () => {

    const isLogged = useSelector(getIsLogged)

    
    const classes = useStyles();


    const router = useRouter();
    const { id } = router.query;
    const [advert, setAdvert] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [advertUserId, setAdvertUserId] = useState(null);
    const userId = useSelector(getUserId)
    

    useEffect(() => {
        (async () => {
            if (id) {
                const advert = await getAdvertDetail(id);
                setAdvert(advert);
                setAdvertUserId(advert.userId);
                
            }
        })()

    }, [id])

// CÓDIGO DE EDICIÓN DEL ANUNCIO

const handleEditMode= () => {
    setEditMode(!editMode);
}

const handleDeleteAdvert = async ()=> {
    
    await deleteAdvert(id);
    router.push('/adverts');

}

const handleChat = () =>{
    if(!isLogged){
        router.push('/login');
    }
    console.log('Iniciando chat')
}

const adBelongstoUser = () => {
    if (userId === advertUserId){
        return true
    }
}


    return (
        <div className="register-container">
            {advert ?
                <div >
                    <img src={advert.photo ?  `${process.env.REACT_APP_API_BASE_URL_DEPLOYED}/images/${advert.photo}` : '/img/image-not-available.png'} />
                    {editMode && <div className= "pointer" onClick={() => console.log("Borrar Imagen")}> <DeleteForeverIcon onClick={()=> console.log("Borrar imagen")} color="secondary" fontsize="large"/> Borrar Imagen</div> }
                    {editMode && <div><Button  onClick={handleEditMode} disabled={false} size="large" className={classes.margin} variant="contained" color="secondary" type="submit">
                    Deshacer cambios
                </Button></div>}
                    {editMode ? 
                    <div>
                       <EditAdvertForm productId={id} advert={advert}/>
                       

                    </div>

                    :

                    <div>
                        <div>{advert.name}</div> 
                        <div>{advert.description}</div> 
                   <div> {advert.price} €</div> 
                    <div>{statusEnum[advert.status]}</div>
                    <div>{advert.province}</div>
                    <ul>
                        {advert.tags.map(tag => {
                            return <li key={tag}>{tag}</li>
                        })}
                    </ul> 

                    </div>
                    
                     }
                    
                    <div>
                {(adBelongstoUser() && !editMode) 
                
                &&
                
                    <div> 
                        <Button 
                        onClick={handleEditMode}  
                        size="large" className={classes.margin} 
                        variant="contained" 
                        color="primary" 
                        type="submit">
                            Editar anuncio
                        </Button> 

                        <Button 
                        onClick={handleDeleteAdvert}  
                        size="large" 
                        className={classes.margin} 
                        variant="contained" 
                        color="secondary" 
                        type="submit">
                            Borrar anuncio
                        </Button>  </div>  

                }

                { (!adBelongstoUser())
                    &&

                  <div>
                        <Button 
                        onClick={handleChat}  
                        size="large" 
                        className={classes.margin} 
                        variant="contained" 
                        color="secondary" 
                        type="submit">
                            Contactar vendedor
                        </Button>  
                        </div> }
           
                        </div>
                   
                  
                </div>

                

                : 
                <div></div>
            }
            
         

        </div>
    );
}

export default advert