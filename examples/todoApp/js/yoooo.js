/** @jsx React.DOM */
var YooooList = React.createClass({
  render: function() {
    var createYoooo = function(item) {
      return <li><span className="yoooo">{item.name}: YOOOO</span></li>;
    };
    return <ul>{this.props.items.map(createYoooo)}</ul>;
  }
});

var YooooApp = React.createClass({
  getInitialState: function() {
    this.items = [];
    return {items: [], name: ""};
  },

  componentWillMount: function() {
    this.firebaseRef = new Firebase("https://yoooo.firebaseio.com/items/");
    this.firebaseRef.on("child_added", function(dataSnapshot) {
      this.items.push(dataSnapshot.val());
      this.setState({
        items: this.items
      });
      
      var elements = Array.prototype.slice.call(document.getElementsByTagName("li"));

      elements.forEach(function(element){
        element.style.backgroundColor =  "#" + Math.floor(Math.random()*16777215).toString(16);
      })
    }.bind(this));
  },

  componentWillUnmount: function() {
    this.firebaseRef.off();
  },

  onChange: function(e) {
    this.setState({name: e.target.value});
  },

  handleSubmit: function(e) {
    e.preventDefault();
    if (this.state.name) {
      this.firebaseRef.push({
        name: this.state.name.toUpperCase()
      });
    }
  },

  render: function() {
    return (
      <div>
        <YooooList items={this.state.items} />
        <form onSubmit={this.handleSubmit}>
          <label>your name: </label>
          <input onChange={this.onChange} value={this.state.name} />
          <button>click to YOOOO</button>
        </form>
      </div>
    );
  }
});

React.renderComponent(<YooooApp />, document.getElementById("YooooApp"));
