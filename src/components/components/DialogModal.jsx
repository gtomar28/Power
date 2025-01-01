
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, InputLabel, MenuItem, OutlinedInput, Select, Divider } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import React, { useState } from 'react'
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { styled } from '@mui/material/styles';

const SaveButton = styled(Button)(() => ({
    borderRadius: '5px',
    backgroundColor: '#4634FF',
    borderColor: '#4634FF',
    color: '#fff',
    padding: '8px',
    fontSize: '0.875rem',
    textTransform: 'none',

    '&:hover': {
        backgroundColor: '#1801FF',
        borderColor: '#1801FF',
        color: '#fff'
    },
}));

const DialogModal = ({ handleClosingDialogState, modalOpen, title, buttonName, InputFields, onSubmit }) => {

    const [fileState, setFileState] = useState(true)
    const Items = InputFields;

    return (
        <Dialog onClose={handleClosingDialogState} aria-labelledby="dialogModal" open={modalOpen} sm={8} maxWidth='xs' fullWidth >
            <DialogTitle sx={{ m: 0, p: 2, typography: 'h6' }} id="dialogModal">
                {title}
                <IconButton aria-label="close" onClick={handleClosingDialogState} sx={(theme) => ({ position: 'absolute', right: 8, top: 8, color: theme.palette.grey[500], })} >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <Divider/>
            <DialogContent>
                <form>
                    <Grid container spacing={2}>
                        {Items.map((itemData) => (
                            <Grid xs={12} sx={{ p: 1 }} key={itemData.id}>
                                <InputLabel htmlFor="adminPhone" sx={{ mb: 1 }}>{itemData.fieldName}</InputLabel>
                                {itemData?.field === 'textInput' ?
                                    <>
                                        <OutlinedInput id={itemData.id} type={itemData?.fieldType} placeholder={itemData?.placeholder} fullWidth value={itemData?.value} onChange={(e)=> itemData.updateValFunc(e.target.value)}/>
                                    </>
                                    
                                    :
                                    <>
                                        {itemData?.field === 'select' ?
                                            <>
                                                <Select id={itemData.id} fullWidth displayEmpty defaultValue="" value={itemData?.value} onChange={(e)=> itemData.updateValFunc(e.target.value)}>
                                                    <MenuItem id='selectStatus' value='' disabled >-- Select --</MenuItem>
                                                    {itemData?.feildOptions.map((statusItem) => (
                                                        <MenuItem key={statusItem?.optionId} value={statusItem?.optionValue}>{statusItem?.optionName}</MenuItem>
                                                    ))}
                                                </Select>
                                            </>
                                            :
                                            <>
                                                {itemData?.field === 'fileType' 
                                                    ?
                                                        <>
                                                            {
                                                                buttonName === 'Create' 
                                                                ?
                                                                    <OutlinedInput id={itemData.id} type={itemData?.fieldType} placeholder="Upload File" fullWidth onChange={(e)=> itemData.updateValFunc(e.target.files[0])}  sx={{borderRadius: '4px 0px 0px 4px'}} />
                                                                :
                                                                    <Grid container>
                                                                        {fileState
                                                                            ? 
                                                                                (
                                                                                    <>
                                                                                        <Grid xs={10}>
                                                                                            <OutlinedInput id={itemData.id} type='text' placeholder="Upload File" fullWidth value={itemData?.value ? itemData?.value.split('/').pop() : ''} onChange={(e)=> itemData.updateValFunc(e.target.value)}  sx={{borderRadius: '4px 0px 0px 4px'}} />
                                                                                        </Grid>
                                                                                        <Grid xs={2}>
                                                                                            <SaveButton variant="contained" onClick={()=> setFileState(false)} sx={{borderRadius: '0px 4px 4px 0px'}}>
                                                                                                Edit
                                                                                            </SaveButton>
                                                                                        </Grid>
                                                                                    </>
                                                                                )
                                                                            : 
                                                                                (
                                                                                    <>
                                                                                        <Grid xs={10}>
                                                                                            <OutlinedInput id={itemData.id} type={itemData?.fieldType} placeholder="Upload File" fullWidth onChange={(e)=> itemData.updateValFunc(e.target.files[0])}  sx={{borderRadius: '4px 0px 0px 4px'}} />
                                                                                        </Grid>
                                                                                        <Grid xs={2}>
                                                                                            <SaveButton variant="contained" onClick={()=> setFileState(true)} sx={{borderRadius: '0px 4px 4px 0px'}}>
                                                                                                View
                                                                                            </SaveButton>
                                                                                        </Grid>
                                                                                    </>
                                                                                    
                                                                                )
                                                                        }
                                                                    </Grid>
                                                            }
                                                        </>
                                                    :
                                                        <></>
                                                }
                                            </>

                                        }

                                    </>
                                }
                            </Grid>
                        ))}
                    </Grid>
                    <SaveButton variant="outlined" type="button" fullWidth sx={{ mt:3 }} onClick={onSubmit}> {buttonName} </SaveButton>
                </form>
            </DialogContent>
            <DialogActions sx={{ m: 0, p: 1 }}>
            </DialogActions>
        </Dialog >
    )
}


export default DialogModal























{/* {itemData?.value === '' 
    ? 
    ( <OutlinedInput id={itemData.id} type='text' placeholder="Upload File" fullWidth value={itemData?.value || ''} onChange={(e)=> itemData.updateValFunc(e.target.value)}/> )
    : 
    ( <OutlinedInput id={itemData.id} type={itemData?.fieldType} placeholder="Upload File" fullWidth onChange={(e)=> itemData.updateValFunc(e.target.files[0])}/> )
} */}







// <form>
//   <Grid container spacing={2}>
//     {Items.map((itemData) => (
//       <Grid xs={12} sx={{ p: 1 }} key={itemData.id}>
//         <InputLabel htmlFor="adminPhone" sx={{ mb: 1 }}>{itemData.fieldName}</InputLabel>
        
//         {itemData?.field === 'textInput' &&
//           <OutlinedInput
//             id={itemData.id}
//             type={itemData?.fieldType}
//             placeholder={itemData?.placeholder}
//             fullWidth
//             onChange={(e) => itemData.updateValFunc(e.target.value)}
//           />
//         }

//         {itemData?.field === 'select' &&
//           <Select
//             id={itemData.id}
//             fullWidth
//             displayEmpty
//             defaultValue=""
//             onChange={(e) => itemData.updateValFunc(e.target.value)}
//           >
//             <MenuItem id='selectStatus' value='' disabled>-- Select --</MenuItem>
//             {itemData?.feildOptions.map((statusItem) => (
//               <MenuItem key={statusItem.optionId} value={statusItem.optionValue}>
//                 {statusItem.optionName}
//               </MenuItem>
//             ))}
//           </Select>
//         }

//         {itemData?.field === 'fileType' &&
//           <OutlinedInput
//             id={itemData.id}
//             type={itemData?.fieldType}
//             placeholder="Upload File"
//             fullWidth
//             onChange={(e) => itemData.updateValFunc(e.target.files[0])}
//           />
//         }
//       </Grid>
//     ))}
//   </Grid>

//   <SaveButton
//     variant="outlined"
//     type="button"
//     fullWidth
//     sx={{ mt: 3 }}
//     onClick={onSubmit}
//   >
//     {buttonName}
//   </SaveButton>
// </form>















// working


// import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, InputLabel, MenuItem, OutlinedInput, Select, FormHelperText, Divider } from '@mui/material'
// import CloseIcon from '@mui/icons-material/Close';
// import React from 'react'
// import Grid from '@mui/material/Unstable_Grid2/Grid2';
// import { styled } from '@mui/material/styles';

// const SaveButton = styled(Button)(() => ({
//     borderRadius: '5px',
//     backgroundColor: '#4634FF',
//     borderColor: '#4634FF',
//     color: '#fff',
//     padding: '8px',
//     fontSize: '0.875rem',
//     textTransform: 'none',

//     '&:hover': {
//         backgroundColor: '#1801FF',
//         borderColor: '#1801FF',
//         color: '#fff'
//     },
// }));

// const DialogModal = ({ handleClosingDialogState, modalOpen, title, buttonName, InputFields, onSubmit, register, handleSubmit, errors, setValue, trigger }) => {

//     const Items = InputFields;

//     return (
//         <Dialog onClose={handleClosingDialogState} aria-labelledby="dialogModal" open={modalOpen} sm={8} maxWidth='xs' fullWidth >
//             <DialogTitle sx={{ m: 0, p: 2, typography: 'h6' }} id="dialogModal">
//                 {title}
//                 <IconButton aria-label="close" onClick={handleClosingDialogState} sx={(theme) => ({ position: 'absolute', right: 8, top: 8, color: theme.palette.grey[500], })} >
//                     <CloseIcon />
//                 </IconButton>
//             </DialogTitle>
//             <Divider/>
//             <DialogContent>
//                 <form onSubmit={handleSubmit(onSubmit)}>
//                     <Grid container spacing={2}>
//                         {Items.map((itemData) => (
//                             <Grid xs={12} sx={{ p: 1 }} key={itemData.id}>
//                                 <InputLabel htmlFor="adminPhone" sx={{ mb: 1 }}>{itemData.fieldName}</InputLabel>
//                                 {itemData?.field === 'textInput' ?
//                                     <>
//                                         <OutlinedInput id={itemData.id} type={itemData?.fieldType} {...register(itemData.id, { required: itemData.requiredMsg, validate: { startsWithCapital: (value) => /^[A-Z]/.test(value) || 'It must start with an uppercase letter', minLength: (value) => value.length >= 4 || 'Minimum Length is 4', pattern: (value) => new RegExp(itemData?.regex).test(value) || itemData.regexMsg } })} placeholder={itemData?.placeholder} fullWidth error={Boolean(errors?.[itemData.id])} />
//                                         {errors[itemData.id] && <FormHelperText error>{errors[itemData.id]?.message}</FormHelperText>} 
//                                     </>
                                    
//                                     :
//                                     <>
//                                         {itemData?.field === 'select' ?
//                                             <>
//                                                 <Select id={itemData.id} fullWidth displayEmpty defaultValue="" {...register(itemData.id, { required: itemData.requiredMsg })} 
//                                                 onChange={(e) => { setValue(itemData.id, e.target.value); trigger(itemData.id) }} error={Boolean(errors?.[itemData.id])} >
//                                                     <MenuItem id='selectStatus' value='' disabled >-- Select --</MenuItem>
//                                                     {itemData?.feildOptions.map((statusItem) => (
//                                                         <MenuItem key={statusItem?.optionId} value={statusItem?.optionValue}>{statusItem?.optionName}</MenuItem>
//                                                     ))}
//                                                 </Select>
//                                                 {errors[itemData.id] && <FormHelperText error>{errors[itemData.id]?.message}</FormHelperText>}
//                                             </>
//                                             :
//                                             <>
//                                                 {itemData?.field === 'fileType' ?
//                                                     <>
//                                                         <OutlinedInput id={itemData.id} type={itemData?.fieldType} placeholder="Upload File" fullWidth {...register(itemData.id)}
//                                                         onChange={(e) => { console.log((itemData.id, e.target.files[0]), 'image text');setValue(itemData.id, e.target.files[0]); trigger(itemData.id)}} 
//                                                         error={Boolean(errors?.[itemData.id])} inputProps={{ accept: itemData?.allowedTypes.join(', ') }} />
//                                                         {errors[itemData.id] && <FormHelperText error>{errors[itemData.id]?.message}</FormHelperText>}
//                                                     </>
//                                                     :
//                                                     <></>
//                                                 }
//                                             </>

//                                         }

//                                     </>
//                                 }
//                             </Grid>
//                         ))}
//                     </Grid>
//                     <SaveButton variant="outlined" type="submit" fullWidth sx={{ mt:3 }}> {buttonName} </SaveButton>
//                 </form>
//             </DialogContent>
//             <DialogActions sx={{ m: 0, p: 1 }}>
//             </DialogActions>
//         </Dialog >
//     )
// }


// export default DialogModal



{/* <OutlinedInput id={itemData.id} type={itemData?.fieldType || 'text'} placeholder={itemData?.placeholder} fullWidth {...register(itemData.id, { required: itemData.requiredMsg, validate: { startsWithCapital: (value) => { console.log('Checking startsWithCapital:', value); return /^[A-Z]/.test(value) || 'It must start with an uppercase letter'; }, minLength: (value) => { console.log('Checking minLength:', value); return value.length >= 4 || 'Minimum Length is 4'; }, pattern: (value) => { console.log('Checking pattern:', value, itemData.regex); return itemData.regex ? new RegExp(itemData.regex).test(value) || itemData.regexMsg : false; }, }, })} error={Boolean(errors?.[itemData.id])} />
{errors[itemData.id] && <FormHelperText error>{errors[itemData.id]?.message}</FormHelperText>} */}




{/* {itemData?.field === 'fileType' ?
    <>
        <OutlinedInput id={itemData.id} type={itemData?.fieldType} placeholder="Upload File" fullWidth {...register(itemData.id , { required: itemData.requiredMsg, validate: { fileType: (file) => { if (!file[0]) return 'No file selected'; if (file.size < 10240 || file.size > 204800) console.log(file.size); return '* File size must be between 10 KB to 200 KB'; const allowedTypes = itemData?.allowedTypes; return allowedTypes.includes(file[0].type) || itemData?.allowedMsg || true ; }, },})} error={Boolean(errors?.[itemData.id])} />
        {errors[itemData.id] && <FormHelperText error>{errors[itemData.id]?.message}</FormHelperText>}
    </>
    :
    <></>
} */}












// import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, InputLabel, MenuItem, OutlinedInput, Select, FormHelperText, Divider } from '@mui/material'
// import CloseIcon from '@mui/icons-material/Close';
// import React from 'react'
// import Grid from '@mui/material/Unstable_Grid2/Grid2';
// import { styled } from '@mui/material/styles';

// const SaveButton = styled(Button)(() => ({
//     borderRadius: '5px',
//     backgroundColor: '#4634FF',
//     borderColor: '#4634FF',
//     color: '#fff',
//     padding: '8px',
//     fontSize: '0.875rem',
//     textTransform: 'none',

//     '&:hover': {
//         backgroundColor: '#1801FF',
//         borderColor: '#1801FF',
//         color: '#fff'
//     },
// }));

// const DialogModal = ({ handleClosingDialogState, modalOpen, title, buttonName, InputFields, onSubmit, register, handleSubmit, errors, setValue, trigger }) => {

//     const Items = InputFields;

//     const handleFileUpload = (variable, itemData, event) => {
//         const file = event.target.files[0]; // Extract the first file
//         if (!file) return 'No file selected';
//         setValue(variable, file); // Store the file
//         trigger(variable); // Trigger validation
    
//         if (file.size < 10240 || file.size > 204800) {
//             return '* File size must be between 10 KB to 200 KB';
//         }
    
//         const allowedTypes = itemData?.allowedTypes;
//         if (!allowedTypes.includes(file.type)) {
//             return itemData?.allowedMsg || 'Invalid file type';
//         }
    
//         return true;
//     };
    

//     return (
//         <Dialog onClose={handleClosingDialogState} aria-labelledby="dialogModal" open={modalOpen} sm={8} maxWidth='xs' fullWidth >
//             <DialogTitle sx={{ m: 0, p: 2, typography: 'h6' }} id="dialogModal">
//                 {title}
//                 <IconButton aria-label="close" onClick={handleClosingDialogState} sx={(theme) => ({ position: 'absolute', right: 8, top: 8, color: theme.palette.grey[500], })} >
//                     <CloseIcon />
//                 </IconButton>
//             </DialogTitle>
//             <Divider/>
//             <DialogContent>
//                 <form onSubmit={handleSubmit(onSubmit)}>
//                     <Grid container spacing={2}>
//                         {Items.map((itemData) => (
//                             <Grid xs={12} sx={{ p: 1 }} key={itemData.id}>
//                                 <InputLabel htmlFor="adminPhone" sx={{ mb: 1 }}>{itemData.fieldName}</InputLabel>
//                                 {itemData?.field === 'textInput' ?
//                                     <>
//                                         {/* { console.log(new RegExp(itemData?.regex), typeof(new RegExp(itemData?.regex)),'itemData?.regexitemData?.regexitemData?.regex') } */}
//                                         <OutlinedInput id={itemData.id} type={itemData?.fieldType} {...register(itemData.id, { required: itemData.requiredMsg, validate: { startsWithCapital: (value) => /^[A-Z]/.test(value) || 'It must start with an uppercase letter', minLength: (value) => value.length >= 4 || 'Minimum Length is 4', pattern: (value) => new RegExp(itemData?.regex).test(value) || itemData.regexMsg || true } })} placeholder={itemData?.placeholder} fullWidth error={Boolean(errors?.[itemData.id])} />
//                                         {errors[itemData.id] && <FormHelperText error>{errors[itemData.id]?.message}</FormHelperText>} 
//                                     </>
//                                     :
//                                     <>
//                                         {itemData?.field === 'select' ?
//                                             <>
//                                                 <Select id={itemData.id} fullWidth displayEmpty defaultValue="" {...register(itemData.id, { required: itemData.requiredMsg })} onChange={(e) => { setValue(itemData.id, e.target.value); trigger(itemData.id) }} error={Boolean(errors?.[itemData.id])} >
//                                                     <MenuItem id='selectStatus' value='' disabled >-- Select --</MenuItem>
//                                                     {itemData?.feildOptions.map((statusItem) => (
//                                                         <MenuItem key={statusItem?.optionId} value={statusItem?.optionValue}>{statusItem?.optionName}</MenuItem>
//                                                     ))}
//                                                 </Select>
//                                                 {errors[itemData.id] && <FormHelperText error>{errors[itemData.id]?.message}</FormHelperText>}
//                                             </>
//                                             :
//                                             <>
//                                                 {itemData?.field === 'fileType' ?
//                                                     <>
//                                                         <OutlinedInput id={itemData.id} type={itemData?.fieldType} placeholder="Upload File" fullWidth {...register(itemData.id , { required: itemData.requiredMsg})} onChange={(e) => handleFileUpload(itemData.id, itemData, e)} error={Boolean(errors?.[itemData.id])} />
//                                                         {errors[itemData.id] && <FormHelperText error>{errors[itemData.id]?.message}</FormHelperText>}
//                                                     </>
//                                                     :
//                                                     <></>
//                                                 }
//                                             </>

//                                         }

//                                     </>
//                                 }
//                             </Grid>
//                         ))}
//                     </Grid>
//                     <SaveButton variant="outlined" type="submit" fullWidth sx={{ mt:3 }}> {buttonName} </SaveButton>
//                 </form>
//             </DialogContent>
//             <DialogActions sx={{ m: 0, p: 1 }}>
//             </DialogActions>
//         </Dialog >
//     )
// }

// export default DialogModal



































// import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, TextField, Typography } from '@mui/material'
// import CloseIcon from '@mui/icons-material/Close';
// import React from 'react'
// import Grid from '@mui/material/Unstable_Grid2/Grid2';
// import { styled } from '@mui/material/styles';

// const SaveButton = styled(Button)(() => ({
//     borderRadius: '5px',
//     backgroundColor: '#4634FF',
//     borderColor: '#4634FF',
//     color: '#fff',
//     padding: '8px',
//     fontSize: '0.875rem',
//     textTransform: 'none',

//     '&:hover': {
//         backgroundColor: '#1801FF',
//         borderColor: '#1801FF',
//         color: '#fff'
//     },
// }));

// const DialogModal = ({ handleClosingDialogState, modalOpen, title, buttonName, InputFields }) => {

//     const Items = InputFields;
    
//     return (
//         <Dialog onClose={handleClosingDialogState} aria-labelledby="dialogModal" open={modalOpen} sm={8} maxWidth='xs' fullWidth >
//             <DialogTitle sx={{ m: 0, p: 2, typography: 'h6', mb: 1 }} id="dialogModal">
//                 {title}
//             </DialogTitle>
//             <IconButton aria-label="close" onClick={handleClosingDialogState} sx={(theme) => ({ position: 'absolute', right: 8, top: 8, color: theme.palette.grey[500], })} >
//                 <CloseIcon />
//             </IconButton>
//             <DialogContent dividers>
//                 <Grid container spacing={2}>
//                     {Items.map((fieldData) => (
//                         <Grid xs={12} sx={{ p: 1 }} key={fieldData.id}>
//                             <Typography variant="subtitle1" sx={{ mb: 1 }}>{fieldData.fieldName}</Typography>
//                             <TextField type='text' required id="outlined-required" fullWidth />
//                         </Grid>
//                     ))}
//                 </Grid>
//             </DialogContent>
//             <DialogActions sx={{ m: 0, p: 3 }}>
//                 <SaveButton variant="outlined" fullWidth autoFocus onClick={handleClosingDialogState}> {buttonName} </SaveButton>
//             </DialogActions>
//         </Dialog>
//     )
// }

// export default DialogModal







