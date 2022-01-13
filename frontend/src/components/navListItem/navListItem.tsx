import React from 'react';
import { ListItem, ListItemIcon, ListItemText} from '@mui/material';

type NavListItemProps = {
    icon?: React.ReactElement;
    text?: string;
    onClickCommand?: any;
    children?: React.ReactNode;
    style?: React.CSSProperties;
};
export default function NavListItem(props: NavListItemProps) {
    const { icon, text, onClickCommand, children } = props;

    return (
        <ListItem button  onClick={onClickCommand}>
                <ListItemIcon>
                    {icon}
                    {children}
                </ListItemIcon>
                <ListItemText primary={text}/>
        </ListItem>
    );
}