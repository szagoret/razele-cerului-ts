import Typography from "@mui/material/Typography";
import * as React from "react";
import {Box} from "@mui/system";
import {StanzaType} from "../../song";

type StanzaPropsType = {
    stanza: StanzaType
}
const Stanza = ({stanza}: StanzaPropsType) => {

    return (
        <Box sx={{pt: 2}}>
            <Typography variant={"caption"} sx={{pl: 1}} color="text.secondary" gutterBottom>
                {stanza.type === "stanza" ? `Strofa ${stanza.sequence}` : 'Refren'}
            </Typography>
            {stanza.lines.map((line, i) => (
                <Typography key={i} variant="body1" sx={{whiteSpace: 'pre-wrap'}}>
                    {line}
                </Typography>
            ))}
        </Box>
    );
};
export default Stanza;