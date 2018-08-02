import React from 'react';
import './cast.css';

export class Cast extends React.Component {
  render() {
    const link = 'https://image.tmdb.org/t/p/w300';
    return(
      <div>
        <h3>Cast</h3>
        <div className="figureContainer">
          {this.props.cast.slice(0, 6).map((element, index) => {
            return(
              <figure key={index}>
                <img src={this.props.cast[index].profile_path === null ? 'http://via.placeholder.com/300x450' : link + this.props.cast[index].profile_path} key={index} alt={this.props.cast[index].name} className="imgResponsive" />
                <figcaption>{this.props.cast[index].name}</figcaption>
              </figure>
            )

          })}
        </div>
      </div>
    );
  }
}
