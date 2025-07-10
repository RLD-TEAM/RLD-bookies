import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const AllBooks = (props) => {

    // allBooks state variable to store backend information
    const [allBooks, setAllBooks] = useState([]);
    let listBooks = [];

    if(allBooks.length > 0 ) {
        listBooks = allBooks.map((bookObj) => (
            <>
            <tr key={bookObj.id}>{bookObj.title}</tr>
            {/* <tr key={bookObj.id}>{bookObj.description}</tr> */}
            </>
        ))}

    console.log(listBooks);

    const [deleteToggle, setDeleteToggle] = useState(false);

    // set useEffect for axios to render
    useEffect( () => {
        axios
            .get(axios.get("/books")
            .then((res) => {
                console.log(`response from AllBooks VIEW: ${res}`);
                console.log(`response from AllBooks VIEW: ${res.data}`);
                console.log(`response from AllBooks VIEW: ${res.data[0]}`);
                console.log(`response from AllBooks VIEW: ${res.data[0].title}`);
                setAllBooks(res.data);
            })
            .catch( (err) => {
                console.log("error:", err);
            });
    }, [deleteToggle, props]);

    // Delete book from the DB
    const deleteBook = (id) => {
        console.log(`deleting BOOK with id of: ${id}`);
        axios
            .delete(`http://localhost:3000/books/${id}`)
            .then( (res) => {
                console.log(`response after deleting book ${res}`);
                setDeleteToggle(!deleteToggle);
            })
            .catch( (err) => {
                console.log(err);
            })
    }

    // Connect to AllBooks, view on table
    return (
        <>
        <div className="bg-success p-3">
            <div className="navbar">
                <Link to="/">
                    <p className="h4 text-left">All the Books</p>
                </Link>
                <Link to="/new" className="btn btn-primary">Add New Book</Link>
            </div>

            <table className="table table-striped border bg-light">
                <thead>
                    <tr>
                        <th scope="col">Title</th>
                        <th scope="col">Description</th>
                        <th scope="col">Something</th>
                        <th scope="col">Else</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>Title Hopefully</tr>
                    <tr>Author Hopefully</tr>
                    {listBooks}
                </tbody>
            </table>
        </div>
    </>
    )

};

export default AllBooks;
