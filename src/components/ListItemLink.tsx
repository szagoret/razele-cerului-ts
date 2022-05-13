import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';


// Add support for the sx prop for consistency with the other branches.
import {styled} from "@mui/system";
import NextLink from "next/link";


const ListItemLink = (props: any) => {
    const Anchor = styled('a')({});

    const {icon, primary, to} = props;

    const NextLinkComposed = React.forwardRef<HTMLAnchorElement, any>(
        function NextLinkComposed(props, ref) {
            const {to, linkAs, replace, scroll, shallow, prefetch, locale, ...other} = props;

            return (
                <NextLink
                    href={to}
                    prefetch={prefetch}
                    as={linkAs}
                    replace={replace}
                    scroll={scroll}
                    shallow={shallow}
                    passHref
                    locale={locale}
                >
                    <Anchor ref={ref} {...other} />
                </NextLink>
            );
        },
    );

    return (
        <ListItem component={NextLinkComposed}>
            {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
            <ListItemText primary={primary}/>
        </ListItem>
    );
};
export default ListItemLink
