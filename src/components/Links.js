import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

const useStyles = makeStyles(theme => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '1px solid #000',
        borderRadius: 5,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        
    },
}));

export default function LinkList(props) {
    
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
   
    const Links = [
        { type: "My Portfolio",
          url: "https://eriancoet.github.io/RianCoetzee_Portfolio/" 
        },
        { type: "My Github",
          url: "https://github.com/eriancoet"
        },
        { type: "My linkedin Profile",
          url: "https://www.linkedin.com/in/rian-coetzee-865337218/"
        }]
        
const LinkList = Links.map((Links) =>
<ul>
  <li key={Links}>{Links.type}</li>
  <li>{Links.url}</li>
  </ul>
);
    return (
 
        <div className="modal">
       
            <Button variant="contained" color="success" onClick={handleOpen}>
                Links
            </Button>
          
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <div className={classes.paper}>
                        <h2>External Links</h2>
                            <p>
                            {LinkList}
                           
                            </p>
                        
                    </div>
                    
                </Fade>
            </Modal>
        </div>
    );
}