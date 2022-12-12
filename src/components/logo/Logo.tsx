import {forwardRef} from 'react';
// next
// @mui
import {BoxProps, Link} from '@mui/material';
import Image from 'next/image';
import logoImage from '../../../public/logo/logo.png';

// ----------------------------------------------------------------------

export interface LogoProps extends BoxProps {
    disabledLink?: boolean;
}

// eslint-disable-next-line react/display-name
const Logo = forwardRef<HTMLDivElement, LogoProps>(
    ({disabledLink = false, sx, ...other}, ref) => {

        const logo = (
            <Image
                alt="logo"
                src={logoImage}
                height={45}
                width={55}
                placeholder="blur"
            />
        );

        if (disabledLink) {
            return <>{logo}</>;
        }

        return (<Link sx={{display: 'contents', ...sx}} href="/">{logo}</Link>);
    }
);

export default Logo;
