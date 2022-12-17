import React, { useEffect, useState } from "react";
import { axios } from "./axios";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Menu } from "./Menu";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, FormHelperText, InputAdornment, Modal, OutlinedInput, Slide, Typography } from "@mui/material";
import { Box } from "@mui/system";


export const Products = () => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    
    const [products, setProducts] = useState();

    const [dialogText, setDialogText] = React.useState('Add product');

    const [name, setName] = useState('');
    const [pricePerKg, setPricePerKg] = useState(0);

    const saveProduct = () => {
        axios.post('/Products', {Name: name, PricePerKg: pricePerKg })
            .then(() => {
                handleClose();
                fetchProducts();
            })
    }
    const fetchProducts = () => axios.get('/Products')
        .then(res => setProducts(res.data));


    useEffect(() => {
        fetchProducts()
    }, []);

    return (
        <>
        <Menu />
       
        <Typography variant="h4" align="center" style={{ marginTop: '20px', marginBottom: '20px'}}>
            School products
        </Typography>
        {products && (
            <TableContainer component={Paper} style={{width: '60%', marginLeft: '20%'}}>
            <Table aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell>Id</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>PricePerKg</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {products.map((product) => (
                    <TableRow
                    key={product.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                    <TableCell>{product.id}</TableCell>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.pricePerKg}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </TableContainer>
        )}
      <Button style={{marginLeft: '20%', marginTop: '20px'}} variant="contained" onClick={handleOpen}>Add product</Button>

      <Dialog
        open={open}
        
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{dialogText}</DialogTitle>
        <DialogContent>
        <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
          <OutlinedInput
            id="outlined-adornment-weight"
            value={name}
            onChange={(e) => setName(e.target.value)}
            aria-describedby="outlined-name"
            inputProps={{
              'aria-label': 'weight',
            }}
          />
          <FormHelperText id="outlined-name">Name</FormHelperText>
        </FormControl>
        <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
          <OutlinedInput
            id="outlined-adornment-weight"
            type="number"

            value={pricePerKg}
            onChange={(e) => setPricePerKg(e.target.value)}

            endAdornment={<InputAdornment position="end">Uah</InputAdornment>}
            aria-describedby="outlined-weight-helper-text"
            inputProps={{
              'aria-label': 'weight',
            }}
          />
          <FormHelperText id="outlined-weight-helper-text">PricePerKg</FormHelperText>
        </FormControl>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={saveProduct}
            variant="contained"
            disabled={name === '' || pricePerKg === 0}
          >
            Save
          </Button>
          <Button onClick={handleClose} variant="contained">Dismiss</Button>
        </DialogActions>
      </Dialog>
     </>
      );
}