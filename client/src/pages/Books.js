import React, { Component } from "react";
//import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
//import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem, SavedItem } from "../components/List";
import { Input, FormBtn } from "../components/Form";

class Books extends Component {
  state = {
    books: [],
    searchRequest: "",
    title: "",
    author: "",
    synopsis: "",
    saved: [],
  };

  componentDidMount() {
    this.loadBooks();
  }

  loadBooks = () => {
    API.getBooks()
      .then(res =>
        this.setState({ saved: res.data })
      )
      .catch(err => console.log(err));
  };

  deleteBook = id => {
    API.deleteBook(id)
      .then(res => this.loadBooks())
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    API.findbook(this.state.searchRequest).then(results => {
      console.log(results.data.items);
      let newBooks = []
      let image= "https://upload.wikimedia.org/wikipedia/en/d/d1/Image_not_available.png"
      
      results.data.items.forEach(element => {
        
        let book = {
          id: element.id,
          authors: element.volumeInfo.authors,
          description: element.volumeInfo.description,
          image: image,
          link: element.volumeInfo.infoLink,
          title: element.volumeInfo.title
        };
        newBooks.push(book);
      });
      this.setState({ books: newBooks })
      
    })
  };

  handleBookSave = event => {
    event.preventDefault();
    console.log(this.state.books[event.target.id])
    API.saveBook(this.state.books[event.target.id])
    this.loadBooks();
  }

  handleDeleteBook = event => {
    event.preventDefault()
    console.log(event.target.id)
    this.deleteBook(event.target.id)
  }


  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-6">
            <Jumbotron>
              <h1>What Books Should I Read?</h1>
            </Jumbotron>
            <form>
              <Input
                value={this.state.searchRequest}
                onChange={this.handleInputChange}
                name="searchRequest"
                placeholder="Search A Book"
              />
              <FormBtn
                disabled={!this.state.searchRequest}
                onClick={this.handleFormSubmit}
              >
                Find Books!
              </FormBtn>
              {this.state.books.length ? (
                <List>
                  {this.state.books.map((book, index) => (
                    <ListItem
                      key={book.id}
                      id={book.id}
                      title={book.title}
                      author={book.authors[0]}
                      description={book.description}
                      link={book.link}
                      image={book.image}
                      save={this.handleBookSave}
                      idx={index}

                    >
                    </ListItem>
                  ))}
                </List>
              ) : (
                  <h3>No Results to Display</h3>
                )}
            </form>
          </Col>
          <Col size="md-6 sm-12">
            <Jumbotron>
              <h1>Books On My List</h1>
            </Jumbotron>
            {this.state.books.length ? (
              <List>
                {this.state.saved.map((book, index) => (
                  <SavedItem
                    key={book._id}
                    id={book._id}
                    title={book.title}
                    author={book.authors[0]}
                    description={book.description}
                    link={book.link}
                    image={book.image}
                    save={this.handleBookSave}
                    idx={index}
                    delete = {this.handleDeleteBook}
                    >
                  </SavedItem>
                ))}
              </List>
            ) : (
                <h3>No Results to Display</h3>
              )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Books;
