import React, * as react from 'react';
import {Drawer, AppBar} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import "./navdrawer.css";
import MenuIcon from '@mui/icons-material/Menu';
import Background from '../../components/backgrounds/background';
import IProps from '../IProps';

/*
* This is the NavBar component.
*/
export default function NavDrawer(props: IProps) {
    const { name, children, imageLink } = props;
    //const [open, setOpen] = useState("left");
    const [matches, setMatches] = react.useState(window.matchMedia("(min-width: 1000px)").matches);
    react.useEffect(() => {
        const handler = (e: any) => setMatches( e.matches );
        window.matchMedia("(min-width: 1000px)").addListener(handler);
    }, []);
    const [isOpen,setIsOpen] = react.useState(true);
    const toggle = ()=>setIsOpen((current: any) =>!current);
    // Create a condition that targets viewports at least 768px wide
    let navbarElements = (
        <div className="sp-Lockup">
            <Background className='DMI IIcon'/>
            <div className="Cursor1 ICursor"></div>
            <PersonIcon className="PersonIcon IIcon" sx={
                style => ({
                    width: "30px",
                    height: "30px",
                })
            }/>
            <img className="profile" width="75" alt="" src={imageLink}/>
            <label className="product">{name}</label>
            {!matches && (                
                <div className="Cursor2 ICursor"></div>
            )}
            {!matches && (                
                <MenuIcon className="Hamburger IIcon" onClick={toggle}/>
            )}

        </div>
    );
    return (        
        <div id="navdraw">
            { matches && (
            <Drawer
                anchor="left"
                variant="permanent"
                PaperProps={{ style: {
                    marginTop: 42,
                    marginLeft: 40,
                    marginBottom: 2,
                    height: "95vh",                      
                    background: "linear-gradient(0deg, rgba(103, 80, 164, 0.05), rgba(103, 80, 164, 0.05)), #FFFBFE",
                }}}
                ModalProps={{
                    keepMounted: true,
                }}>
                <div className="chattop chatprofile rightlined">
                    {navbarElements}                                          
                </div>
                {children}          
            </Drawer>
            )}
            {/* Hier komt het voor klein scherm  */}
            {!matches && (
            <>
                <AppBar color="primary">
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
                        style: { background: "linear-gradient(0deg, rgba(103, 80, 164, 0.05), rgba(103, 80, 164, 0.05)), #FFFBFE",
                    }}}
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
/*
<!-- Usage -->
<div className="NavBar">   
    <Navdrawer name="asgfhjsadgfjasfhasfasfsaasfas" imageLink="https://images-ext-2.discordapp.net/external/NFu54hJJeAEsrCYWF0gaSEAj_Q7qAecwh2J4ZxlZWhE/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/238401356690489344/5eefd320644cfcaf5546ad55ea1ff6a3.png">
        <Divider/>
        <label className="label leftside navbar">Nieuws Kanalen</label>
        <NavListItem text="Belangrijk Nieuws" icon={<AccessibleIcon />} onClickCommand={() => console.log("Nieuw Icons!")}/>
        <Divider />
        <label className="label leftside navbar">Chat Kanalen</label>
        <NavListItem text="Publiek" icon={<ChildCareIcon />} onClickCommand={() => console.log("Nieuw Icons!")}/>
        <NavListItem text="Team Genoten" icon={<ChildFriendlyIcon />} onClickCommand={() => console.log("Nieuw Icons!")}/>
        <NavListItem text="one more channel cuz why not" icon={<EuroIcon />}/>
    </Navdrawer>
</div>
*/