import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined';
import "./Table.css"
import Pagination from '@mui/material/Pagination';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useState } from "react";

export default function DataTable({
    userData,
    editSelected,
    handleEdit,
    handleModify,
    selected,
    handleSelectAll,
    handleCheck,
    handleText,
    handleDelete,
    handleDeleteButton,
    handlePagination,
    originalUserData,
    selectAllPage,
    currentPage,
    setCurrentPage
})
{
    const [rows, setRows] = useState(10);
    let checked = selectAllPage.has(currentPage)
    return (
        <div className="table">
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell><input type="checkbox" checked={checked} onChange={(e) => handleSelectAll(e)} title="checkbox" id="selectAll"></input></TableCell>
                            <TableCell sx={{fontWeight: 600}}>Name</TableCell>
                            <TableCell sx={{fontWeight: 600}}>Email</TableCell>
                            <TableCell sx={{fontWeight: 600}}>Role</TableCell>
                            <TableCell sx={{fontWeight: 600}}>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    {userData.map((user) => (
                        <TableBody key={user.id}>
                            {editSelected.has(user.id)?
                                <TableRow className={`${selected.has(user)? "dark": ""}`}>
                                    <TableCell>
                                        <input type="checkbox" checked={selected.has(user) && (true || checked)} onChange={() => handleCheck(user)} title="checkbox" id={user.id}></input>
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            defaultValue={user.name}
                                            variant="standard"
                                            size="small"
                                            onChange={(e) => handleText(e.target.value, user, "name")}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            defaultValue={user.email}
                                            variant="standard"
                                            size="small"
                                            onChange={(e) => handleText(e.target.value, user, "email")}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            defaultValue={user.role}
                                            variant="standard"
                                            size="small"
                                            onChange={(e) => handleText(e.target.value, user, "role")}
                                        />
                                        </TableCell>
                                    <TableCell>
                                        <button className="actionButton, done" onClick={() => handleModify(user)} aria-label="Done"><DoneOutlinedIcon /></button>
                                        <button className="actionButton, delete" onClick={() => handleDelete(user.id, user)} aria-label="Delete"><DeleteOutlineOutlinedIcon sx={{fill: "red"}}/></button>
                                    </TableCell>
                                </TableRow>:
                                <TableRow className={`${selected.has(user)? "dark": ""}`}>
                                    <TableCell>
                                        <input type="checkbox" checked={selected.has(user) && (true || checked)} onChange={() => handleCheck(user)} title="checkbox" id={user.id}></input>
                                    </TableCell>
                                    <TableCell>{user.name}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{user.role}</TableCell>
                                    <TableCell>
                                        <button className="actionButton, edit" onClick={() => handleEdit(user.id)} aria-label="Edit"><EditNoteOutlinedIcon /></button>
                                        <button className="actionButton, delete" onClick={() => handleDelete(user.id, user, rows)} aria-label="Delete"><DeleteOutlineOutlinedIcon sx={{fill: "red"}}/></button>
                                    </TableCell>
                                </TableRow>
                            }
                        </TableBody>
                    ))}
                </Table>
            </TableContainer>
            {userData.length>0?
                <div className="pagination">
                    <button className={`${selected.size>0? 'deleteButton': 'btnDisabled'}`} onClick={() => handleDeleteButton(rows)} >Delete Selected</button>
                    <Pagination className="page" count={Math.ceil(originalUserData.length/rows)} showFirstButton showLastButton
                        onChange={(event, page) => {
                            setCurrentPage(page)
                            handlePagination(page, rows)
                        }}  
                    />
                    <FormControl variant="standard" sx={{ width: 100}}>
                        <InputLabel>Row per page</InputLabel>
                        <Select
                        value={rows}
                        onChange={(e) => {
                            setRows(e.target.value);
                            handlePagination(currentPage, e.target.value)
                        }}
                        >
                            <MenuItem value={10}>10</MenuItem>
                            <MenuItem value={20}>20</MenuItem>
                            <MenuItem value={30}>30</MenuItem>
                        </Select>
                    </FormControl>
                </div>:
                <div></div>
            }
        </div>
    )
}