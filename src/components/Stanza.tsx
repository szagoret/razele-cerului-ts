import {StanzaType} from "../../pages/cuprins";
import Typography from "@mui/material/Typography";
import * as React from "react";
import {Box} from "@mui/system";

type StanzaPropsType = {
    stanza: StanzaType
}
const Stanza = ({stanza}: StanzaPropsType) => {

    return (
        <Box sx={{pt: 2}}>
            <Typography sx={{fontSize: 14, pl: 1}} color="text.secondary" gutterBottom>
                {stanza.type === "stanza" ? `Strofa ${stanza.sequence}` : 'Refren'}
            </Typography>
            {stanza.lines.map((line, i) => (
                <Typography key={i} variant="body2" sx={{whiteSpace: 'pre-wrap'}}>
                    {line}
                </Typography>
            ))}
        </Box>
    );
};
export default Stanza;