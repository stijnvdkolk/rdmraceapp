import React, * as react from 'react';
import {Drawer, AppBar, Popover, IconButton} from '@mui/material';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import "./navdrawer.css";
import MenuIcon from '@mui/icons-material/Menu';
import Background from '../../components/backgrounds/background';
import IProps from '../IProps';
import { useContext, useState } from 'react';
import { ThemeContext } from '../theme-context';
import UserProfile from '../userProfile/userProfile';


/*
* This is the NavBar component.
*/
export default function NavDrawer(props: IProps) {
    const { name, children, imageLink, mischellaneous } = props;
    //const [open, setOpen] = useState("left");
    const [matches, setMatches] = react.useState(window.matchMedia("(min-width: 1000px)").matches);
    react.useEffect(() => {
        const handler = (e: any) => setMatches( e.matches );
        window.matchMedia("(min-width: 1000px)").addListener(handler);
    }, []);
    const [isOpen,setIsOpen] = react.useState(true);
    const toggle = ()=>setIsOpen((current: any) =>!current);
    const { colorTheme } =  useContext(ThemeContext);
    const [profileOn, setProfileOn] = useState(null);
    const handleProfileClick = (event: any) => {
        setProfileOn(event.currentTarget);
      };
    
      const handleProfileClose = () => {
        setProfileOn(null);
      };
    const profileOpen = Boolean(profileOn);
    const profileId = profileOpen ? 'simple-popover' : undefined;
    // Create a condition that targets viewports at least 768px wide
    let navbarElements = (
        
        <div className="sp-Lockup">
            
            <img className="profile" width="75" alt="" src={imageLink}/>
            <label className={matches ? "product" : "product2"}>{name}</label>
            <div className="sp-Lockup2 Order2">
                <Background className='DMI IIcon' />
                <div className="Cursor1 ICursor"></div>
                <IconButton className="PersonIcon IIcon">
                    <PersonOutlinedIcon  sx={
                        style => ({
                            width: "30px",
                            height: "30px",                        
                        })
                    }
                    color="secondary"
                    onClick={handleProfileClick}
                    />
                </IconButton>
                <Popover 
                    id={profileId}
                    open={profileOpen}
                    anchorEl={profileOn}
                    onClose={handleProfileClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    sx={{
                        borderRadius: "16px",
                    }}
                    >
                    <UserProfile bigprofile={true} self={true} />
                </Popover>
                {!matches && ( <div className="Cursor2 ICursor"></div>)}
                {!matches && ( <MenuIcon className="Hamburger IIcon" onClick={toggle}/>)}
                
            </div>
        </div>
    );
    return (        
        <div id="navdraw">
            { matches && (
                <Drawer
                    anchor="left"
                    variant="permanent"
                    PaperProps={{ 
                        className: colorTheme === "dark" ? "Darkmode" : "",                    
                        style: {
                        marginTop: 42,
                        marginLeft: 40,
                        marginBottom: 2,
                        height: "90vh",
                    }}}
                    ModalProps={{
                        keepMounted: true,
                    }}>
                    {mischellaneous ? (
                        <div className="chattop chatprofile rightlined">
                            
                            {navbarElements}                                          
                        </div>
                    )
                    : (<div/>)
            }
                {children}          
            </Drawer>
            )}
            {/* Hier komt het voor klein scherm  */}
            {!matches && (
            <>
                <AppBar>
                    <div className="chattop chatprofile fullwidth">
                        {navbarElements}                        
                    </div>
                </AppBar>
                <Drawer
                    anchor="left"
                    open={isOpen}
                    onClose={() => setIsOpen(false)}
                    PaperProps={{ 
                        className: "DebugHenk",                        
                    }}
                    ModalProps={{
                        keepMounted: true,
                    }}
                    sx={{
                        height: () => isOpen ? 309 : 72,
                    }}>                    
                    
                    {children}  
                </Drawer>
            </>
            )}   
        </div>
            
    );    
     
}
