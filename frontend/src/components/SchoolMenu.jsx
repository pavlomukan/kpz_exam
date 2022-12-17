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
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, FormHelperText, Grid, IconButton, InputAdornment, InputLabel, List, ListItem, ListItemAvatar, ListItemText, MenuItem, Modal, OutlinedInput, Select, Slide, Typography } from "@mui/material";
import { Box } from "@mui/system";
import DeleteIcon from '@mui/icons-material/Delete';


export const SchoolMenu = () => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    
    const [schools, setSchools] = useState();
    const [selectedSchool, setSelectedSchool] = useState();

    const [products, setProducts] = useState();

    const [createSchoolMenu, setCreateSchoolMenu] = useState({ date: '2022-12-17', products: [{ key: 0, productId: 1, amountKG: 1 }]})

    console.log(createSchoolMenu)
    const fetchProducts = () => axios.get('/Products')
    .then(res => setProducts(res.data));


    const [dialogText, setDialogText] = React.useState('Add school menu');

    const saveSchoolMenu = () => {
        axios.post(`/School?id=${selectedSchool.id}`, createSchoolMenu)
            .then(() => {
                handleClose();
                fetchSchools();
            })
    }
    const fetchSchools = () => axios.get('/School')
        .then(res => {
          setSelectedSchool(res.data[0])
          setSchools(res.data);
        });


    useEffect(() => {
        fetchSchools();
        fetchProducts();
    }, []);

    return (
        <>
        <Menu />
        {
          schools && (
            <FormControl style={{ width: '20%', marginLeft:'40%', marginTop: '20px'}}>
              <InputLabel id="demo-simple-select-label">School</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectedSchool.id}
                label="School"
                onChange={(e) => console.log(e.tartget.value)}
              >

                {
                  schools.map(i => (<MenuItem value={i.id}>{i.name}</MenuItem>))
                }
              
              </Select>
            </FormControl>
          )
        }
        
        <Typography variant="h4" align="center" style={{ marginTop: '20px', marginBottom: '20px'}}>
            School menu
        </Typography>
        {selectedSchool && (
            <TableContainer component={Paper} style={{width: '60%', marginLeft: '20%'}}>
            <Table aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell>Id</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>Ingredients</TableCell>

                </TableRow>
                </TableHead>
                <TableBody>
                {selectedSchool.menu.map((menu) => (
                    <TableRow
                    key={menu.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                    <TableCell>{menu.id}</TableCell>
                    <TableCell>{menu.date.split('T')[0]}</TableCell>
                    <TableCell>{menu.products.reduce((acc, i) => acc + i.amountKG * i.product.pricePerKg, 0 )}</TableCell>
                    <TableCell>
                      <ul>
                      {menu.products.map(product => (
                        <li>{product.product.name} - {product.amountKG} kg * {product.product.pricePerKg} = {product.amountKG * product.product.pricePerKg}</li>)
                      
                      )}
                      </ul>
                    </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </TableContainer>
        )}
      <Button style={{marginLeft: '20%', marginTop: '20px'}} variant="contained" onClick={handleOpen}>Add school menu</Button>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{dialogText}</DialogTitle>
        <DialogContent>
        <div>
          <FormControl sx={{ m: 1 }} variant="outlined">
            <OutlinedInput
              id="outlined-adornment-weight"
              value={createSchoolMenu.date}
              onChange={(e) => setCreateSchoolMenu({ ...setCreateSchoolMenu, date: e.target.value })}
              aria-describedby="outlined-name"
              inputProps={{
                'aria-label': 'weight',
              }}
            />
            <FormHelperText id="outlined-name">Date</FormHelperText>
          </FormControl>
        </div>
        <div>
        <Grid item xs={12} md={6}>
          <Typography variant="h6" component="div">
            Ingredients
          </Typography>
            <List>
              { products && createSchoolMenu.products.map(product =>
                (<ListItem
                  key={product.key}
                  secondaryAction={
                    <IconButton 
                      edge="end"
                      aria-label="delete"
                      onClick={() => setCreateSchoolMenu({ 
                        date: createSchoolMenu.date,
                        products: createSchoolMenu.products.filter(i => i.key !== product.key)
                      })}
                    >
                      <DeleteIcon />
                    </IconButton>
                  }
                >
                  <ListItemText>
                  <FormControl sx={{ m: 1 }} style={{ width: '200px'}}  variant="outlined">
                    <OutlinedInput
                      id="outlined-adornment-weight"
                      type="number"

                      value={product.amountKG}
                      onChange={(e) => setCreateSchoolMenu({ date: createSchoolMenu.date, products: createSchoolMenu.products.map(i => {
                          if (i.key === product.key)
                            i.amountKG = e.target.value;
                          return i;
                        })
                      })}
                      endAdornment={<InputAdornment position="end">Kg</InputAdornment>}
                      aria-describedby="outlined-weight-helper-text"
                      inputProps={{
                        'aria-label': 'weight',
                      }}
                    />
                    <FormHelperText id="outlined-weight-helper-text">Kg</FormHelperText>
                  </FormControl>


                  <FormControl sx={{ m: 1 }}  style={{ width: '150px'}}  variant="outlined">
                    <InputLabel id="demo-simple-select-label">Product</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={product.productId}
                      label="Product"
                      onChange={(e) => setCreateSchoolMenu({ date: createSchoolMenu.date, products: createSchoolMenu.products.map(i => {
                        if (i.key === product.key)
                          i.productId = e.target.value;
                        return i;
                      })
                    })}
                    >

                      {
                        products.map(i => (<MenuItem value={i.id}>{i.name}</MenuItem>))
                      }
                    
                    </Select>
                  </FormControl>
                  </ListItemText>
                </ListItem>)
              )}
              <Button 
                onClick={() => setCreateSchoolMenu({ 
                  date: createSchoolMenu.date,
                  products: [...createSchoolMenu.products, 
                    { key: Math.max(...createSchoolMenu.products.map(i => i.key)) + 1 || 0, productId: 1, amountKG: 1 }
                  ]
                })}
                variant="outlined"
              >
            +
          </Button>
            </List>
        </Grid>
        </div>
        
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={saveSchoolMenu}
            variant="contained"
            disabled={createSchoolMenu.date === '' || createSchoolMenu.products.length === 0}
          >
            Save
          </Button>
          <Button onClick={handleClose} variant="contained">Dismiss</Button>
        </DialogActions>
      </Dialog>
     </>
      );
}