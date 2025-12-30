import React, {useState} from "react";
import './Searchbar.css'

export default function Searchbar({
    setUserData,
    safeUserData,
    rows,
    currentPage,
    setOriginalUserData,
    setCurrentPage
})
{
    /**
    Definition for search handler
    This is the function that is called on adding new search keys

    @param {string} text
    Text user types in the search bar. To filter the displayed users based on this text.
    @returns { Array.<Users> }
    Array of objects with complete data on filtered set of users
    **/

    const performSearch = async (text) => {
        const userDetailsCopy = safeUserData
        if(text) {
            const filteredUsers = userDetailsCopy.filter((user) => {
                const searchPattern = new RegExp(text, "i");
                if (user.name.search(searchPattern) !== -1) return true;
                if (user.email.search(searchPattern) !== -1) return true;
                if (user.role.search(searchPattern) !== -1) return true;
                return false;
              });
            let start = (currentPage-1)*rows
            console.log(currentPage)
            let paginatedFilteredUsers = filteredUsers.slice(start, start+rows);
            if(paginatedFilteredUsers.length <= rows) {
                setCurrentPage(1)
            }
            if(paginatedFilteredUsers.length>0) {
                setUserData(paginatedFilteredUsers);
                setOriginalUserData(filteredUsers.slice(0, rows*3));
            } else {
                setUserData(filteredUsers.slice(0, rows));
                setOriginalUserData(filteredUsers.slice(0, rows*3));
            }
        } else {
            let start = (currentPage-1)*rows
            let paginatedUsers = userDetailsCopy.slice(start, start+rows)
            if(paginatedUsers.length>1) {
                setUserData(paginatedUsers);
            } else {
                setUserData(userDetailsCopy.slice(0, rows));
            }
            setOriginalUserData(userDetailsCopy)
        }
    };

    /**
   Definition for debounce handler
   With debounce, this is the function to be called whenever the user types text in the searchbar field
   @param {{ target: { value: string } }} event
   JS event object emitted from the search input field
   @param {NodeJS.Timeout} debounceTimeout
   Timer id set for the previous debounce call
   **/

    const [debounceTimer, setDebounceTimer] = useState(500);
    const debounceSearch = (event, debounceTimeout) => {
        clearTimeout(debounceTimer);
        let timer = setTimeout(() => {
        performSearch(event)
        }, debounceTimeout)
        setDebounceTimer(timer)
    };

    /*
    This function returns search return on pressing enter key
    */
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            performSearch(e.target.value)
        }
    }

    return (
        <div className="search">
            <input className="search_input" type="text"
                placeholder="Search by name, email or role"
                name="Search"
                onChange={(e) => {debounceSearch(e.target.value, 500)}}
                onKeyUp={(e) => handleKeyPress(e)}
            >
            </input>
        </div>
    )
}