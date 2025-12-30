import React, {useState, useEffect} from "react";
import axios from "axios";
import { config } from "../App";
import Alert from '@mui/material/Alert';
import Snackbar from "@mui/material/Snackbar";
import DataTable from "./Table"
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Searchbar from "./Searchbar";

export default function Userdata() {
    const [loading, setLoading] = useState(false);
    const [userData, setUserData] = useState([]);
    const [apiError, setApiError] = useState(false);
    const [editSelected, setEditSelected] = useState(new Set());
    const [selected, setSelected] = useState(new Set());
    const [modified, setModified] = useState(new Map());
    const [originalUserData, setOriginalUserData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectAllPage, setSelectAllPage] = useState(new Set());
    const [rows, setRows] = useState(10);
    const [safeUserData, setSafeUserData] = useState([])

    /**
   Make API call to get the users list and store it to display the users
    @returns { Array.<Users> }
    Array of objects with complete data on all available products
    API endpoint - "GET https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
    Example for successful response from backend:
    HTTP 200
    [
        {
            "id": "1",
            "name": "Aaron Miles",
            "email": "aaron@mailinator.com",
            "role": "member"
        },
        {
            "id": "2",
            "name": "Aishwarya Naik",
            "email": "aishwarya@mailinator.com",
            "role": "member"
        }
    ]
   **/
    const performAPICall = async() => {
        setLoading(true);
        try {
            const response = await axios.get(`${config.endpoint}/members.json`);
            setLoading(false);
            setOriginalUserData(response.data);
            setSafeUserData(response.data)
            let paginated = response.data;
            setUserData(paginated.slice(0, 10));
        } catch (e) {
            setLoading(false);
            setApiError(true);
            if (e.response && e.response.status === 400) {
                console.log(e.response.data.message)
            }
            return null;
        }
    }

    // This function handles the edit option in the action tab
    const handleEdit = (userId) => {
        let newEditSelected = new Set(editSelected);
        newEditSelected.add(userId);
        setEditSelected(newEditSelected)
    }

    // This function handles the text inputs of the edited user
    const handleText = (value, user, key) => {
        let modifiedUsers = new Map(modified)
        let modifiedUser = user
        modifiedUser[key] = value;
        modifiedUsers.set(user.id, modifiedUser)
        setModified(modifiedUsers)
    }

    // This function apply the edit changes locally
    const handleModify = (user) => {
        let userDataCopy = userData
        let modifiedUser = modified.get(user.id)
        if (modifiedUser) {
            const foundIndex = userData.findIndex((x) => x.id === modifiedUser.id);
            if (foundIndex !== -1) {
            userDataCopy[foundIndex] = modifiedUser;
            }
        setUserData(userDataCopy)
        };
        let newEditSelected = new Set(editSelected);
        newEditSelected.delete(user.id);
        setEditSelected(newEditSelected)
    }

    // This function handles the select all feature and selects all the users of the page
    const handleSelectAll = (e) => {
        if(e.target.checked) {
            let newSelectAllPage = new Set(selectAllPage);
            newSelectAllPage.add(currentPage);
            setSelectAllPage(newSelectAllPage)
            let newSelected = new Set(selected)
            for(let i=0; i<userData.length; i++) {
                newSelected.add(userData[i])
            }
            setSelected(newSelected)
        } else {
            let newSelectAllPage = new Set(selectAllPage);
            newSelectAllPage.delete(currentPage);
            setSelectAllPage(newSelectAllPage);
            let newSelected = new Set(selected)
            for(let i=0; i<userData.length; i++) {
                newSelected.delete(userData[i])
            }
            setSelected(newSelected)
        }
    }

    // This function handles when a user or users are selected
    const handleCheck = (user) => {
        if(selected.has(user)){
            let newSelected = new Set(selected);
            newSelected.delete(user);
            setSelected(newSelected);
        } else {
            let newSelected = new Set(selected);
            newSelected.add(user);
            setSelected(newSelected);
        }
    }

    // This function handles the delete button in the action tab
    const handleDelete = (userId, user, rows) => {
        let userDataCopy = userData
        let copyOriginalUserData = originalUserData;
        const foundIndex = userData.findIndex((x) => x.id === userId);
        if (foundIndex !== -1) {
            userDataCopy.splice(foundIndex, 1);
            copyOriginalUserData.splice(foundIndex, 1);
            if(copyOriginalUserData[Math.ceil(currentPage*rows-1)]){
                userDataCopy.push(copyOriginalUserData[Math.ceil(currentPage*rows-1)]);
            }
        }
        setUserData(userDataCopy);
        setOriginalUserData(copyOriginalUserData)
        let newSelected = new Set(selected);
        newSelected.delete(user)
        setSelected(newSelected);
    }

    // This function deletes all the selected users
    const handleDeleteButton = (rows) => {
        let copyOriginalUserData = originalUserData;
        if(selected.size>0) {
            let temp = [...selected]
            for(let i=0; i<temp.length; i++) {
                const foundIndex = copyOriginalUserData.findIndex((x) => x.id === temp[i].id);
                if (foundIndex !== -1) {
                    copyOriginalUserData.splice(foundIndex, 1);
                }
            }
            let start = (currentPage-1)*rows;
            if(copyOriginalUserData.slice(start, start+rows).length>0) {
                setUserData(copyOriginalUserData.slice(start, start+rows));
                setCurrentPage(currentPage)
            } else {
                setUserData(copyOriginalUserData.slice(0, rows));
                setCurrentPage(1);
            }
            setSelected(new Set());
            setSelectAllPage(new Set())
        }
        setSelected(new Set());
        setSelectAllPage(new Set());
    }

    // This function handles the pagination and number of rows displayed in the table
    const handlePagination = (page, rows) => {
        let copy = originalUserData
        let pagination = [];
        let temp= (page-1)*rows;
        pagination = copy.slice(temp, (temp+rows))
        if(pagination.length>1) {
            setCurrentPage(page)
            setUserData(pagination)
        } else {
            setCurrentPage(1);
            setUserData(copy.slice(0, rows));
        }
        setRows(rows)
    }

    // Performs the API call to get the users list and store it to display the users on page refresh
    useEffect(() => {
        performAPICall()
    }, []);

    return (
        <div>
            <Searchbar
                setUserData={setUserData}
                safeUserData={safeUserData}
                rows={rows}
                currentPage={currentPage}
                setOriginalUserData={setOriginalUserData}
                setCurrentPage={setCurrentPage}
            />
            {loading?
                <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: ' center', height: '400px'}}>
                    <CircularProgress />
                </Box>:
                <DataTable
                    userData={userData}
                    editSelected={editSelected}
                    handleEdit={handleEdit}
                    handleModify={handleModify}
                    selected={selected}
                    handleSelectAll={handleSelectAll}
                    handleCheck={handleCheck}
                    handleText={handleText}
                    handleDelete={handleDelete}
                    handleDeleteButton={handleDeleteButton}
                    handlePagination={handlePagination}
                    originalUserData={originalUserData}
                    selectAllPage={selectAllPage}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />   
            }
            <Snackbar anchorOrigin={{ vertical: "top", horizontal: "center"}} open={apiError}>
                <Alert severity="error">Could not fetch user details. Check that the backend is running, reachable and returns valid JSON.</Alert>
            </Snackbar>
        </div>
    )
}