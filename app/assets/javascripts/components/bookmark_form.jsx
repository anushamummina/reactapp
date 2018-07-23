var BookmarkForm = createReactClass({
	handleChange: function(e){
		var name=e.target.name;
		obj = {};
		obj[name]=e.target.value;
		this.props.onUserInput(obj);
	},
	handleSubmit: function(e){
		e.preventDefault();
		this.props.onFormSubmit();
	},

	render: function(){
		return(
			<div>
				<h2>Create New Bookmark</h2>
				<form onSubmit={this.handleSubmit}>
					<input name="title" placeholder="Bookmark Title" 
						value={this.props.input_title}
						className = "input_field"
						onChange={this.handleChange}/>&nbsp;&nbsp;
					<input name="host" 
						placeholder="Bookmark Host" 
						value={this.props.input_host}
						className = "input_field"
						onChange={this.handleChange}/>&nbsp;&nbsp;
					<input name="url"  
						placeholder="Bookmark URL"
						value={this.props.input_url}
						className = "input_field"
						onChange={this.handleChange}/>&nbsp;&nbsp;
					<select name="category_id" defaultValue={0} className="input_field" onChange={this.handleChange}>
						<option value={0}>Select Category</option>
					  {this.props.categories.map((category) =>
					  	<option value={category.id}>{category.name}</option>
					  )}
			        </select>&nbsp;&nbsp;
					<input type="submit" value="Create Bookmark" className="submit_button"/>
				</form>
			</div>
		)
	}
});