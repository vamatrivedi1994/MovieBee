import React from 'react';
import './review.css';
import firebase, { auth, provider } from '../header/firebase';
import StarRatingComponent from 'react-star-rating-component';

export class Review extends React.Component {

  constructor() {
  super();
  this.state = {
    rating: 5,
    currentItem: '',
    username: '',
    items: [],
    user: null
  }
  this.handleChange = this.handleChange.bind(this);
  this.handleSubmit = this.handleSubmit.bind(this);
  }

  onStarClick(nextValue, prevValue, name) {
    this.setState({rating: nextValue});
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const itemsRef = firebase.database().ref('items');
    const item = {
      title: this.state.currentItem,
      user: this.state.user.displayName || this.state.user.email
    }
    itemsRef.push(item);
    this.setState({
      currentItem: '',
      username: ''
    });
  }

  componentDidMount() {
      auth.onAuthStateChanged((user) => {
        if (user) {
          this.setState({ user });
        }
      });
      const itemsRef = firebase.database().ref('items');
      itemsRef.on('value', (snapshot) => {
        let items = snapshot.val();
        let newState = [];
        for (let item in items) {
          newState.push({
            id: item,
            title: items[item].title,
            user: items[item].user
          });
        }
        this.setState({
          items: newState
        });
      });
    }

  removeItem(itemId) {
     const itemRef = firebase.database().ref(`/items/${itemId}`);
     itemRef.remove();
  }

  render() {
    const link = 'https://image.tmdb.org/t/p/w300';
    const { rating } = this.state;

    return(
      <div>
       
        <div className="figureContainer">
          <section className='add-item'>
           <h3 class="review">Give a review</h3>
              <form onSubmit={this.handleSubmit}>
                <input type="text" name="username" placeholder="Username" onChange={this.handleChange} value={this.state.username} />
                <input type="text" name="currentItem" placeholder="Movie review" onChange={this.handleChange} value={this.state.currentItem} />
                
                <div style={{textAlign:"left", fontWeight: "bold"}} >
                <span>Rating:&nbsp;&nbsp;
                <StarRatingComponent
                name="rate1"
                starCount={10}
                value={rating}
                onStarClick={this.onStarClick.bind(this)}/></span>
                </div>
                <button id="button1">Add Review</button>
              </form>
          </section>


          <section className='display-item'>
          <h1 className="users">User reviews</h1>
            <div className="wrapper">
              <ul>
              {this.state.items.map((item) => {
              return (    
                <div>
              <li key={item.id}>
                 <h3>
                 <span>
                 <StarRatingComponent
                 name="rate1"
                 starCount={10}
                 value={rating}/></span><br />
                 <span>{item.title} </span>
                 <span id="span2">Reviewed By: {item.user}&nbsp;&nbsp;
                  {item.user === this.state.user.displayName || item.user === this.state.user.email ?
                   <button onClick={() => this.removeItem(item.id)}>Remove Review</button> : null}</span></h3>
                   </li>
                   </div>
                  )
              })}
              </ul>
            </div>
          </section>
        </div>
      </div>
    );
  }
}
