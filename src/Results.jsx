import React from "react";
import PropTypes from "prop-types";
import TableRow from "./TableRow";
import SearchBar from "./SearchBar";
import { Consumer } from "./context/SearchContext";
class Results extends React.PureComponent {
  static propTypes = {
    handleSearch: PropTypes.func,
    loading: PropTypes.bool,
    pets: PropTypes.array,
    errors: PropTypes.shape({
      message: PropTypes.string
    })
  };
  componentDidMount = () => {
    this.props.handleSearch();
  };
  renderTableRow(pet) {
    return <TableRow pet={pet} key={pet.id} />;
  }
  renderTable() {
    if (this.props.loading) return <p>loading</p>;
    if (!this.props.pets) {
      return (
        <p>
          No Animal found :(
          <button onClick={this.props.handleSearch}>clear filter</button>
        </p>
      );
    }
    return (
      <table>
        {this.props.errors.message}
        <tbody>{this.props.pets.map(this.renderTableRow)}</tbody>
      </table>
    );
  }
  render() {
    return (
      <div>
        <SearchBar />
        {this.renderTable()}
      </div>
    );
  }
}

export default function ResultsWithContext() {
  return (
    <Consumer>
      {context => (
        <Results
          pets={context.pets}
          handleSearch={context.handleSearch}
          errors={context.errors}
          loading={context.loading}
        />
      )}
    </Consumer>
  );
}
