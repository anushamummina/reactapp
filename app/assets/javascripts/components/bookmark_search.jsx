var BookmarkSearch = createReactClass({
	handleChange: function(e){
		var name=e.target.name;
		obj = {};
		obj[name]=e.target.value;
		this.props.onUserInput(obj);
	},
	handleSearchSubmit: function(e){
		e.preventDefault();
		this.props.onSearchFormSubmit();
	},

	render: function(){
		return(
			<div>
				<h2>Search Bookmark</h2>
				<form onSubmit={this.handleSearchSubmit}>
					<input name="search" placeholder="Search Title/Host/URL/Category" 
						value={this.props.input_search}
						className = "search_field"
						onChange={this.handleChange}/>&nbsp;&nbsp;
					<input type="submit" value="Search" className="search_button"/>
					<button onClick={() => this.props.handleClear()} className="clear_button">Clear</button>
				</form>
			</div>
		)
	}
});