import React from 'react';
import FaAngleDoubleRight from 'react-icons/lib/fa/angle-double-right';
import FaAngleDoubleLeft from 'react-icons/lib/fa/angle-double-left';

class Characters extends React.Component {

  constructor(props) {
    super();
    this.handleClickMore = this.handleClickMore.bind(this);
    this.handleClickDetail = this.handleClickDetail.bind(this);
    this.handleClickBack = this.handleClickBack.bind(this);

    this.state = { isLoading:false ,items: [], url: "https://swapi.co/api/people/", isDetail: false, details: []};
}

componentDidMount() {
  // LOAD first page of 10 characters
  fetch(this.state.url)
  .then(function(response) {
    return response;
  })
  .then(response => response.json())
  .then(data => {
    this.setState({
      url: data.next,
      items: data.results
    })
  })
    .catch(function(error) {
    console.log('Request failed', error)
  });

}

handleClickMore(event) {
// LOAD next page of characters
this.setState({isLoading:true});
    fetch(this.state.url)
    .then(function(response) {
      return response;
    })
    .then(response => response.json())
    .then(data => {
      let newItems = this.state.items;
      data.results.map((result)=> (
        newItems.push(result)
      ))
      this.setState({
        url: data.next,
        items: newItems,
        isLoading: false
      })
    })
      .catch(function(error) {
      console.log('Request failed', error)
    });
}

handleClickDetail(url) {
  // LOAD Details character
  this.setState({isDetail: true})
  this.setState({details: []})
  fetch(url)
  .then(function(response) {
    return response;
  })
  .then(response => response.json())
  .then(data => {
    this.setState({
      details: data,
    })
  })
    .catch(function(error) {
    console.log('Request failed', error)
  });
}

handleClickBack() {
  //GO BACK list characters
  this.setState({isDetail: false})
}

  render() {
    let more = "Voir plus";
    let back = "Précédent";
    const isDetail = this.state.isDetail;

    return (
      <div className="Content">
      {isDetail ? (
        <div className="Character">
          <div className="Details">
            <div className="Details-header">
              <p>{this.state.details.name}</p>
              <button className="Back" onClick={this.handleClickBack}>
              <FaAngleDoubleLeft className="icon" /> {back}
              </button>
            </div>
            <p> Height: {this.state.details.height} </p>
            <p> Mass: {this.state.details.mass} </p>
            <p> Hair Color: {this.state.details.hair_color} </p>
            <p> Skin Color: {this.state.details.skin_color} </p>
            <p> Birth Year: {this.state.details.birth_year} </p>
            <p> Gender: {this.state.details.gender} </p>
          </div>
        </div>
       ) : (
         <div className="Characters">
           <ul className="Characters-list">
              { this.state.items.map((item ,index) => (
                <li onClick={this.handleClickDetail.bind(this, item.url)} className="Characters-item" key={index}> {item.name} <FaAngleDoubleRight className="icon" /> </li>
              ))}
           </ul>
            { this.state.isLoading && <p>Loading...</p> }
            { this.state.url != null &&
               <button onClick={ this.handleClickMore } className="Load">
                 {more}
               </button>
            }
          </div>
       )}
      </div>
    );
  }
}

export default Characters;
