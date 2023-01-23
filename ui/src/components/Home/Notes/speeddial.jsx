import React from "react";
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';
import EditIcon from '@mui/icons-material/Edit';

import CloseIcon from '@mui/icons-material/Close';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';

function CustomSpeedDial(props){

    return(
        <SpeedDial
            ariaLabel="SpeedDial openIcon example"
            sx={{ position: 'absolute', bottom: 90, right: 50, zIndex:99 }}
            icon={<SpeedDialIcon openIcon={<CloseIcon />} />}
            >
            <SpeedDialAction
                key={'add'}
                icon={<LibraryAddIcon/>}
                tooltipTitle={'Add note'}
                onClick={() => props.AddNote(true)}
            />
            <SpeedDialAction
                key={'edit'}
                icon={<EditIcon/>}
                tooltipTitle={'Edit note'}
                onClick={() => props.editPop(prev => !prev)}
            />
            <SpeedDialAction
                key={'share'}
                icon={<ShareIcon/>}
                tooltipTitle={'Share'}
            />
        </SpeedDial>

    )
}

export default CustomSpeedDial;